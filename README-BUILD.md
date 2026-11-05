# Comment modifier le site

Depuis novembre 2026, chaque langue a sa propre adresse :

- français : à la racine (`/garde.html`)
- anglais : `/en/garde.html`
- espagnol : `/es/garde.html`

**Les fichiers à modifier sont dans `_src/`** (une page trilingue par fichier).
Les fichiers HTML à la racine et dans `en/` et `es/` sont **générés** : ne pas les modifier à la main.

Après une modification dans `_src/` :

```bash
pip install beautifulsoup4 playwright   # une seule fois
python3 _build/build.py
git add -A && git commit -m "..." && git push
```

- Titres et descriptions par langue : `_build/meta.json`
- Nouvelle page : l'ajouter dans `_src/`, dans `meta.json` (« pages ») et dans la liste PAGES de `assets/site-config.js`
- Article en français seulement : l'ajouter dans `_src/` et dans `meta.json` (« fr_only »)

Le dossier `_src/` n'est pas publié (GitHub Pages ignore les dossiers qui commencent par `_`).
