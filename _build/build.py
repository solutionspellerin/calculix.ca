#!/usr/bin/env python3
"""
Génère une page par langue à partir des sources trilingues de _src/.

    FR -> racine (/page.html)   EN -> /en/page.html   ES -> /es/page.html

Pour modifier une page : éditer le fichier dans _src/, puis lancer
    python3 _build/build.py
et publier (commit + push) les fichiers générés.

Ce que fait le script, pour chaque page et chaque langue :
  1. retire le texte des deux autres langues (blocs .lang-only-xx et
     éléments [lang="xx"] dans le <body>) : plus de texte caché ;
  2. règle <html lang>, <title>, la meta description, l'URL canonique et
     les liens hreflang (titres dans _build/meta.json) ;
  3. pour /en/ et /es/, corrige les chemins vers assets/, images/, style.css ;
  4. (option --prerender, par défaut) ouvre la page EN/ES dans un navigateur
     sans tête et fige dans le HTML le texte traduit par le JavaScript, pour
     que les robots voient directement la bonne langue ;
  5. régénère sitemap.xml (avec hreflang) et robots.txt.

Les pages listées dans "fr_only" (articles) sont copiées telles quelles à la
racine, sans version EN/ES.

Dépendances : pip install beautifulsoup4 playwright
"""
import http.server
import json
import re
import socketserver
import sys
import threading
from datetime import date
from functools import partial
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_src"
META = json.loads((ROOT / "_build" / "meta.json").read_text(encoding="utf-8"))
DOMAIN = META["domain"].rstrip("/")
LANGS = ["fr", "en", "es"]
SKIP_PRERENDER_IDS = {"siteNav", "footerLinks", "bottomAds", "langToggle"}


def url_for(lang, page):
    f = "" if page == "index.html" else page
    return f"{DOMAIN}/{f}" if lang == "fr" else f"{DOMAIN}/{lang}/{f}"


def out_path(lang, page):
    return ROOT / page if lang == "fr" else ROOT / lang / page


def fix_paths(html):
    # assets/, images/ et style.css sont à la racine du site
    return re.sub(r'(["\'(])(assets/|images/|style\.css)', r"\1../\2", html)


def build_page(page, lang, titles):
    raw = (SRC / page).read_text(encoding="utf-8")
    soup = BeautifulSoup(raw, "html.parser")
    body = soup.body
    others = [l for l in LANGS if l != lang]
    # 1. retirer les autres langues
    for o in others:
        for el in body.select(f".lang-only-{o}"):
            el.decompose()
        for el in body.find_all(attrs={"lang": o}):
            el.decompose()
    # 2. en-tête
    soup.html["lang"] = lang
    title, desc = titles[lang]
    if soup.title is None:
        soup.head.append(soup.new_tag("title"))
    soup.title.string = title
    md = soup.head.find("meta", attrs={"name": "description"})
    if md is None:
        md = soup.new_tag("meta", attrs={"name": "description"})
        soup.head.append(md)
    md["content"] = desc
    for old in soup.head.find_all("link", rel=lambda v: v and ("canonical" in v or "alternate" in v)):
        if old.get("rel") == ["canonical"] or old.get("hreflang"):
            old.decompose()
    can = soup.new_tag("link", rel="canonical", href=url_for(lang, page))
    soup.head.append(can)
    for l in LANGS:
        soup.head.append(soup.new_tag("link", rel="alternate", hreflang=l, href=url_for(l, page)))
    soup.head.append(soup.new_tag("link", rel="alternate", hreflang="x-default", href=url_for("fr", page)))
    for prop, val in (("og:title", title), ("og:description", desc), ("og:url", url_for(lang, page))):
        tag = soup.head.find("meta", attrs={"property": prop})
        if tag:
            tag["content"] = val
    html = str(soup)
    if lang != "fr":
        html = fix_paths(html)
    p = out_path(lang, page)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(html, encoding="utf-8")
    return p


def prerender(pages):
    from playwright.sync_api import sync_playwright

    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass

    httpd = socketserver.TCPServer(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT)))
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    report = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        ctx = browser.new_context()
        # pas de réseau externe : seul le site local est servi
        ctx.route(re.compile(r"^https?://(?!127\.0\.0\.1).*"), lambda r: r.abort())
        for page in pages:
            for lang in ("en", "es"):
                pg = ctx.new_page()
                errors = []
                pg.on("pageerror", lambda e: errors.append(str(e)))
                pg.goto(f"http://127.0.0.1:{port}/{lang}/{page}", wait_until="load")
                pg.wait_for_timeout(800)
                rendered = pg.evaluate(
                    """(skip) => { const out = {};
                    document.querySelectorAll('body [id]').forEach(el => {
                      if (skip.includes(el.id)) return;
                      if (el.closest('script,style,svg,canvas,.ads-row')) return;
                      if (skip.some(s => el.closest('#' + s))) return;
                      out[el.id] = el.innerHTML; });
                    return out; }""",
                    sorted(SKIP_PRERENDER_IDS),
                )
                pg.close()
                p = out_path(lang, page)
                soup = BeautifulSoup(p.read_text(encoding="utf-8"), "html.parser")
                changed = 0
                for el in soup.body.find_all(id=True):
                    rid = el["id"]
                    if rid not in rendered or rid in SKIP_PRERENDER_IDS:
                        continue
                    if el.name in ("select", "textarea", "input", "script", "style", "svg", "canvas"):
                        continue
                    if el.find(id=True) is not None:  # seulement les éléments « feuilles »
                        continue
                    new = rendered[rid]
                    if len(new) > 20000 or "<canvas" in new:
                        continue
                    if el.decode_contents().strip() == new.strip():
                        continue
                    el.clear()
                    frag = BeautifulSoup(new, "html.parser")
                    for child in list(frag.contents):
                        el.append(child)
                    changed += 1
                p.write_text(str(soup), encoding="utf-8")
                report.append((f"{lang}/{page}", changed, errors))
        browser.close()
    httpd.shutdown()
    return report


def write_sitemap(pages, fr_only):
    today = date.today().isoformat()
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
             'xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for page in pages:
        for lang in LANGS:
            lines.append("  <url>")
            lines.append(f"    <loc>{url_for(lang, page)}</loc>")
            for l in LANGS:
                lines.append(f'    <xhtml:link rel="alternate" hreflang="{l}" href="{url_for(l, page)}"/>')
            lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{url_for("fr", page)}"/>')
            lines.append(f"    <lastmod>{today}</lastmod>")
            lines.append("  </url>")
    for page in fr_only:
        lines += ["  <url>", f"    <loc>{url_for('fr', page)}</loc>", f"    <lastmod>{today}</lastmod>", "  </url>"]
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n", encoding="utf-8")


def main():
    pages = list(META["pages"].keys())
    fr_only = META.get("fr_only", [])
    for page in pages:
        for lang in LANGS:
            build_page(page, lang, META["pages"][page])
    for page in fr_only:
        (ROOT / page).write_text((SRC / page).read_text(encoding="utf-8"), encoding="utf-8")
    write_sitemap(pages, fr_only)
    print(f"{len(pages)} pages x {len(LANGS)} langues + {len(fr_only)} articles générés.")
    if "--no-prerender" not in sys.argv:
        for name, changed, errors in prerender(pages):
            flag = "  ERREURS JS: " + " | ".join(errors[:3]) if errors else ""
            print(f"  prérendu {name:32} {changed:3} éléments traduits{flag}")


if __name__ == "__main__":
    main()
