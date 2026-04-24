/* ============================================================
   Calculix.ca — Configuration centrale
   Menu dynamique, i18n partagé (FR/EN/ES), pieds de page, pubs
   Un seul point à modifier quand vous ajoutez une page.
   ============================================================ */
(function (global) {
  'use strict';

  // ── Liste des pages du site ───────────────────────────────
  // Pour ajouter une page : ajouter une entrée ici + un fichier .html
  const PAGES = [
    { key: 'home',          href: 'index.html',          fr: 'Accueil',                 en: 'Home',                    es: 'Inicio' },
    { key: 'pourboires',    href: 'pourboires.html',     fr: 'Pourboires',              en: 'Tip Calculator',          es: 'Propinas' },
    { key: 'investissement',href: 'investissement.html', fr: 'Investissement',          en: 'Investment',              es: 'Inversión' },
    { key: 'about',         href: 'about.html',          fr: 'À propos',                en: 'About',                   es: 'Acerca de' },
    { key: 'privacy',       href: 'privacy-policy.html', fr: 'Politique de conf.',      en: 'Privacy Policy',          es: 'Privacidad' },
  ];

  // ── Textes partagés (header, pied de page, boutons pub) ──
  const SHARED = {
    fr: {
      headerSubtitle: 'Calculs financiers gratuits · Québec',
      footerText:     '© 2026 Calculix.ca — Outil informatif uniquement. Consultez un professionnel pour votre situation personnelle.',
      affiliateDisclosure: 'En tant que Partenaire Amazon, Calculix.ca réalise un bénéfice sur les achats remplissant les conditions requises. Ce site contient aussi des liens d\'affiliation (ex: Le CFO masqué) — nous pouvons recevoir une commission sans frais supplémentaires pour vous.',
      adLabel: 'Annonce',
      cfoHeadline: 'Devenez un pro d\'Excel et Power BI',
      cfoSubline: 'Formations francophones pour analystes, contrôleurs et gestionnaires.',
      cfoPromo: 'Utilisez le code promo',
      cfoCTA: 'Voir les formations →',
      alchHeadline: 'Alchimix — le jeu de cartes',
      alchSubline: 'Le jeu de cartes stratégique et magique. Gratuit à essayer!',
      alchCTA: 'Jouez maintenant! →',
      amazonHeadline: 'Nos coups de cœur sur Amazon',
      amazonSubline: 'Livres, outils et ressources pour gérer vos finances personnelles.',
      amazonCTA: 'Voir sur Amazon →',
      donateTitle: 'Un petit café pour Calculix.ca ? ☕',
      donateBody: "Ce site est <strong>100 % gratuit</strong> et sans abonnement. Pour couvrir les frais d'hébergement et continuer à développer de nouveaux outils, tout don — même petit — est grandement apprécié. Merci de votre soutien !",
      donateCta: "M'offrir un café ☕",
      donateDismiss: 'Plus tard',
    },
    en: {
      headerSubtitle: 'Free financial calculators · Québec',
      footerText:     '© 2026 Calculix.ca — For informational purposes only. Please consult a professional for your personal situation.',
      affiliateDisclosure: 'As an Amazon Associate, Calculix.ca earns from qualifying purchases. This site also contains other affiliate links (e.g., Le CFO masqué) — we may earn a commission at no extra cost to you.',
      adLabel: 'Ad',
      cfoHeadline: 'Become an Excel & Power BI pro',
      cfoSubline: 'French-language training for analysts, controllers and managers.',
      cfoPromo: 'Use promo code',
      cfoCTA: 'See the training →',
      alchHeadline: 'Alchimix — the card game',
      alchSubline: 'The strategic and magical card game. Free to try!',
      alchCTA: 'Play now! →',
      amazonHeadline: 'Our Amazon picks',
      amazonSubline: 'Books, tools and resources to manage your personal finances.',
      amazonCTA: 'Shop on Amazon →',
      donateTitle: 'Buy Calculix.ca a coffee? ☕',
      donateBody: "This site is <strong>100 % free</strong> with no subscription. To cover hosting costs and keep developing new tools, every donation — even a small one — is truly appreciated. Thank you for your support!",
      donateCta: 'Buy me a coffee ☕',
      donateDismiss: 'Maybe later',
    },
    es: {
      headerSubtitle: 'Calculadoras financieras gratuitas · Québec',
      footerText:     '© 2026 Calculix.ca — Solo con fines informativos. Consulte a un profesional para su situación personal.',
      affiliateDisclosure: 'Como Afiliado de Amazon, Calculix.ca obtiene ingresos por compras que cumplan los requisitos. Este sitio también contiene otros enlaces de afiliados (ej. Le CFO masqué) — podemos recibir una comisión sin costo adicional para usted.',
      adLabel: 'Anuncio',
      cfoHeadline: 'Conviértase en experto de Excel y Power BI',
      cfoSubline: 'Formaciones en francés para analistas, contables y gerentes.',
      cfoPromo: 'Use el código promo',
      cfoCTA: 'Ver las formaciones →',
      alchHeadline: 'Alchimix — el juego de cartas',
      alchSubline: 'El juego de cartas estratégico y mágico. ¡Gratis para probar!',
      alchCTA: '¡Juega ahora! →',
      amazonHeadline: 'Nuestras recomendaciones Amazon',
      amazonSubline: 'Libros, herramientas y recursos para gestionar sus finanzas personales.',
      amazonCTA: 'Ver en Amazon →',
      donateTitle: '¿Un cafecito para Calculix.ca? ☕',
      donateBody: "Este sitio es <strong>100 % gratuito</strong>, sin suscripción. Para cubrir los gastos de alojamiento y seguir desarrollando nuevas herramientas, toda donación — por pequeña que sea — es muy apreciada. ¡Gracias por su apoyo!",
      donateCta: 'Invitarme un café ☕',
      donateDismiss: 'Más tarde',
    },
  };

  // ── Détection langue (persistance via localStorage) ──────
  function getStoredLang() {
    try { return localStorage.getItem('calculix_lang') || null; } catch (e) { return null; }
  }
  function setStoredLang(l) {
    try { localStorage.setItem('calculix_lang', l); } catch (e) {}
  }

  // ── Rendu du menu ─────────────────────────────────────────
  function renderNav(lang, activeKey, containerId) {
    const c = document.getElementById(containerId || 'siteNav');
    if (!c) return;
    c.innerHTML = PAGES.map(function (p) {
      const label = p[lang] || p.fr;
      const isActive = p.key === activeKey ? ' active' : '';
      return '<a href="' + p.href + '" class="nav-link' + isActive + '">' + label + '</a>';
    }).join('');
  }

  // ── Rendu des liens du pied de page ───────────────────────
  function renderFooterLinks(lang, containerId) {
    const c = document.getElementById(containerId || 'footerLinks');
    if (!c) return;
    c.innerHTML = PAGES.map(function (p) {
      const label = p[lang] || p.fr;
      return '<a href="' + p.href + '">' + label + '</a>';
    }).join('');
  }

  // ── Toggle 3-langues ──────────────────────────────────────
  // Cycle: fr → en → es → fr
  function cycleLang(current) {
    return current === 'fr' ? 'en' : current === 'en' ? 'es' : 'fr';
  }

  // ── Génération du bloc pub CFO masqué ─────────────────────
  function cfoMasqueAd(lang) {
    const t = SHARED[lang] || SHARED.fr;
    return [
      '<a href="https://lecfomasque.com/ref/107/" target="_blank" rel="sponsored noopener" class="partner-cfo">',
      '  <div class="partner-cfo-inner">',
      '    <img src="images/cfo-masque.svg?v=20260424f" alt="Le CFO masqué" class="partner-cfo-logo" loading="lazy" />',
      '    <div class="partner-cfo-text">',
      '      <div class="partner-cfo-headline">' + t.cfoHeadline + '</div>',
      '      <div class="partner-cfo-subline">' + t.cfoSubline + '</div>',
      '      <div class="partner-cfo-promo">' + t.cfoPromo + ' <span class="partner-cfo-code">MPP5%Rabais</span></div>',
      '      <div class="partner-cfo-cta">' + t.cfoCTA + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="partner-label">' + t.adLabel + '</div>',
      '</a>'
    ].join('\n');
  }

  // ── Génération du bloc pub Alchimix ───────────────────────
  function alchimixAd(lang) {
    const t = SHARED[lang] || SHARED.fr;
    return [
      '<a href="https://alchimix-app.com/" target="_blank" rel="sponsored noopener" class="partner-alch">',
      '  <div class="partner-alch-inner">',
      '    <img src="images/alchimix.png?v=20260424f" alt="Alchimix" class="partner-alch-banner" loading="lazy" />',
      '    <div class="partner-alch-text">',
      '      <div class="partner-alch-headline">' + t.alchHeadline + '</div>',
      '      <div class="partner-alch-subline">' + t.alchSubline + '</div>',
      '      <div class="partner-alch-cta">' + t.alchCTA + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="partner-label">' + t.adLabel + '</div>',
      '</a>'
    ].join('\n');
  }

  // ── Pub Amazon (lien affilié simple) ──────────────────────
  // Le tag est : amazingam068f-20
  function amazonAd(lang) {
    const t = SHARED[lang] || SHARED.fr;
    const url = 'https://www.amazon.ca/?tag=amazingam068f-20';
    return [
      '<a href="' + url + '" target="_blank" rel="sponsored noopener" class="partner-amz">',
      '  <div class="partner-amz-inner">',
      '    <img src="images/amazon.svg?v=20260424f" alt="Amazon" class="partner-amz-logo" loading="lazy" />',
      '    <div class="partner-amz-text">',
      '      <div class="partner-amz-headline">' + t.amazonHeadline + '</div>',
      '      <div class="partner-amz-subline">' + t.amazonSubline + '</div>',
      '      <div class="partner-amz-cta">' + t.amazonCTA + ' <span aria-hidden="true">›</span></div>',
      '    </div>',
      '  </div>',
      '  <div class="partner-label">' + t.adLabel + '</div>',
      '</a>'
    ].join('\n');
  }

  // ── Popup « Buy Me a Coffee » ─────────────────────────────
  // URL : https://buymeacoffee.com/solutionspellerin
  const DONATE_URL = 'https://buymeacoffee.com/solutionspellerin';
  const DONATE_SESSION_KEY = 'calculix_donate_shown';

  function buildDonatePopup(lang) {
    const t = SHARED[lang] || SHARED.fr;
    let overlay = document.getElementById('donateOverlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'donateOverlay';
    overlay.className = 'donate-overlay';
    overlay.innerHTML = [
      '<div class="donate-modal" role="dialog" aria-modal="true" aria-labelledby="donateTitle">',
      '  <button class="donate-close" aria-label="Fermer" onclick="CXSite.hideDonatePopup()">×</button>',
      '  <div class="donate-emoji">☕</div>',
      '  <h3 id="donateTitle" class="donate-title">' + t.donateTitle + '</h3>',
      '  <p class="donate-body">' + t.donateBody + '</p>',
      '  <div class="donate-actions">',
      '    <a href="' + DONATE_URL + '" target="_blank" rel="noopener" class="donate-cta" onclick="CXSite.hideDonatePopup()">' + t.donateCta + '</a>',
      '    <button class="donate-dismiss" onclick="CXSite.hideDonatePopup()">' + t.donateDismiss + '</button>',
      '  </div>',
      '</div>'
    ].join('\n');
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hideDonatePopup();
    });
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('is-visible'); });
  }

  function showDonatePopup(lang, opts) {
    opts = opts || {};
    lang = lang || getStoredLang() || 'fr';
    if (!opts.force) {
      try {
        if (sessionStorage.getItem(DONATE_SESSION_KEY) === '1') return false;
      } catch (e) {}
    }
    buildDonatePopup(lang);
    try { sessionStorage.setItem(DONATE_SESSION_KEY, '1'); } catch (e) {}
    return true;
  }

  function hideDonatePopup() {
    const overlay = document.getElementById('donateOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-visible');
    setTimeout(function () { if (overlay && overlay.parentNode) overlay.remove(); }, 200);
  }

  function attachDonateToButton(btnId, lang, delay) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', function () {
      setTimeout(function () {
        showDonatePopup(lang || getStoredLang() || 'fr');
      }, delay || 500);
    });
  }

  // ── Format monétaire ──────────────────────────────────────
  function formatMoney(value, lang) {
    lang = lang || 'fr';
    var locale = lang === 'en' ? 'en-CA' : (lang === 'es' ? 'es-CA' : 'fr-CA');
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency', currency: 'CAD',
        minimumFractionDigits: 2, maximumFractionDigits: 2
      }).format(value);
    } catch (e) {
      return '$' + (Math.round(value * 100) / 100).toFixed(2);
    }
  }

  function formatNumber(value, lang, decimals) {
    lang = lang || 'fr';
    decimals = (decimals === undefined) ? 2 : decimals;
    var locale = lang === 'en' ? 'en-CA' : (lang === 'es' ? 'es-CA' : 'fr-CA');
    try {
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }).format(value);
    } catch (e) {
      return (Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
    }
  }

  // ── Exposition globale ────────────────────────────────────
  global.CXSite = {
    PAGES: PAGES,
    SHARED: SHARED,
    renderNav: renderNav,
    renderFooterLinks: renderFooterLinks,
    cycleLang: cycleLang,
    getStoredLang: getStoredLang,
    setStoredLang: setStoredLang,
    cfoMasqueAd: cfoMasqueAd,
    alchimixAd: alchimixAd,
    amazonAd: amazonAd,
    showDonatePopup: showDonatePopup,
    hideDonatePopup: hideDonatePopup,
    attachDonateToButton: attachDonateToButton,
    formatMoney: formatMoney,
    formatNumber: formatNumber,
    DONATE_URL: DONATE_URL,
  };
})(window);
