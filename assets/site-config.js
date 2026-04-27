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
    { key: 'home',          href: 'index.html',                   fr: 'Accueil',                 en: 'Home',                    es: 'Inicio' },
    { key: 'pourboires',    href: 'pourboires.html',              fr: 'Pourboires',              en: 'Tip Calculator',          es: 'Propinas' },
    { key: 'investissement',href: 'investissement.html',          fr: 'Investissement',          en: 'Investment',              es: 'Inversión' },
    { key: 'van',           href: 'van.html',                     fr: 'VAN / TRI',               en: 'NPV / IRR',               es: 'VAN / TIR' },
    { key: 'amortissement', href: 'amortissement.html',           fr: 'Amortissement',           en: 'Amortization',            es: 'Amortización' },
    { key: 'budget',        href: 'budget-couple.html',           fr: 'Budget couple',           en: 'Couple Budget',           es: 'Presupuesto pareja' },
    { key: 'budget-solo',   href: 'budget-personne-seule.html',   fr: 'Budget perso',            en: 'Personal Budget',         es: 'Presupuesto personal' },
    { key: 'equite',        href: 'equite-salariale.html',        fr: 'Équité salariale',        en: 'Pay Equity',              es: 'Equidad salarial' },
    { key: 'factures',      href: 'factures-recus.html',          fr: 'Factures & reçus',        en: 'Invoices & Receipts',     es: 'Facturas y recibos' },
    { key: 'about',         href: 'about.html',                   fr: 'À propos',                en: 'About',                   es: 'Acerca de' },
    { key: 'privacy',       href: 'privacy-policy.html',          fr: 'Politique de conf.',      en: 'Privacy Policy',          es: 'Privacidad' },
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
      adblockTitle: 'Un bloqueur de publicités est actif 🛡️',
      adblockIntro: "Calculix.ca est <strong>100 % gratuit</strong> et sans abonnement. Les quelques liens partenaires affichés en bas de page (Amazon, CFO masqué, Alchimix) nous aident à payer l'hébergement et à développer de nouveaux calculateurs.",
      adblockAsk:   'Si vous aimez le site, pourriez-vous <strong>désactiver votre bloqueur</strong> ou <strong>ajouter calculix.ca à votre liste blanche</strong> ? Merci beaucoup !',
      adblockHow:   'Comment faire :',
      adblockSteps: [
        'Cliquez sur l\'icône de votre bloqueur (uBlock, AdBlock, Brave Shield, etc.) dans la barre du navigateur.',
        'Choisissez « Désactiver sur ce site » ou « Ne pas bloquer sur calculix.ca ».',
        'Rechargez la page (F5 ou Ctrl+R).',
      ],
      adblockNoteButtons: 'Les boutons <strong>Exporter en Excel</strong> fonctionnent peu importe votre réglage — ils ne chargent rien depuis le web.',
      adblockDismiss:  'Continuer sans désactiver',
      adblockOk:       "J'ai compris",
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
      adblockTitle: 'An ad blocker is active 🛡️',
      adblockIntro: "Calculix.ca is <strong>100 % free</strong> with no subscription. The few partner links at the bottom of each page (Amazon, CFO masqué, Alchimix) help us cover hosting and keep building new calculators.",
      adblockAsk:   'If you like the site, could you <strong>disable your blocker</strong> or <strong>whitelist calculix.ca</strong>? Thank you so much!',
      adblockHow:   'How to do it:',
      adblockSteps: [
        'Click your blocker\'s icon (uBlock, AdBlock, Brave Shield, etc.) in the browser toolbar.',
        'Select "Disable on this site" or "Don\'t block on calculix.ca".',
        'Reload the page (F5 or Ctrl+R).',
      ],
      adblockNoteButtons: 'The <strong>Export to Excel</strong> buttons work regardless of your setting — they don\'t load anything from the web.',
      adblockDismiss:  'Continue without disabling',
      adblockOk:       'Got it',
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
      adblockTitle: 'Un bloqueador de anuncios está activo 🛡️',
      adblockIntro: "Calculix.ca es <strong>100 % gratuito</strong> y sin suscripción. Los pocos enlaces de socios al pie de página (Amazon, CFO masqué, Alchimix) nos ayudan a pagar el alojamiento y seguir creando nuevas calculadoras.",
      adblockAsk:   '¿Podría <strong>desactivar su bloqueador</strong> o <strong>agregar calculix.ca a la lista blanca</strong>? ¡Muchas gracias!',
      adblockHow:   'Cómo hacerlo:',
      adblockSteps: [
        'Haga clic en el icono de su bloqueador (uBlock, AdBlock, Brave Shield, etc.) en la barra del navegador.',
        'Seleccione "Desactivar en este sitio" o "No bloquear en calculix.ca".',
        'Recargue la página (F5 o Ctrl+R).',
      ],
      adblockNoteButtons: 'Los botones de <strong>Exportar a Excel</strong> funcionan independientemente de su configuración — no cargan nada desde la web.',
      adblockDismiss:  'Continuar sin desactivar',
      adblockOk:       'Entendido',
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

  // ── Détection d'un bloqueur de pub ────────────────────────
  // Crée un élément "appât" avec un nom classique que les listes de filtres
  // ciblent (ads-banner, googleAds). Si l'élément est caché/supprimé après
  // un court délai, on considère qu'un adblocker est actif.
  // On teste aussi si le script Google AdSense a été bloqué au réseau.
  function detectAdBlock(callback) {
    var bait = document.createElement('div');
    bait.className = 'ad-banner ads ad-box adsbox google-ad googleAds sponsored';
    bait.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;';
    bait.innerHTML = '&nbsp;';
    (document.body || document.documentElement).appendChild(bait);

    setTimeout(function () {
      var blocked = false;
      try {
        var cs = window.getComputedStyle(bait);
        if (!bait.offsetParent && bait.offsetHeight === 0) blocked = true;
        if (cs && (cs.display === 'none' || cs.visibility === 'hidden')) blocked = true;
        if (bait.clientHeight === 0) blocked = true;
      } catch (e) { /* noop */ }

      // Vérifie aussi si le script adsbygoogle a été bloqué au niveau réseau
      try {
        if (typeof window.adsbygoogle === 'undefined') {
          // Sur HTTPS en production, cela indique un adblocker
          if (location.protocol === 'https:' || location.protocol === 'http:') blocked = true;
        }
      } catch (e) { /* noop */ }

      try { bait.parentNode && bait.parentNode.removeChild(bait); } catch (e) {}
      if (typeof callback === 'function') callback(blocked);
    }, 200);
  }

  // ── Popup adblock ─────────────────────────────────────────
  var ADBLOCK_DISMISS_KEY = 'calculix_adblock_dismissed_v1';

  function getAdblockDismissed() {
    try {
      var v = localStorage.getItem(ADBLOCK_DISMISS_KEY);
      if (!v) return false;
      var until = parseInt(v, 10);
      return (!isNaN(until) && Date.now() < until);
    } catch (e) { return false; }
  }

  function setAdblockDismissed(days) {
    try {
      var until = Date.now() + (days || 7) * 24 * 60 * 60 * 1000;
      localStorage.setItem(ADBLOCK_DISMISS_KEY, String(until));
    } catch (e) {}
  }

  function hideAdblockNotice() {
    var ov = document.getElementById('cxAdblockOverlay');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
  }

  function showAdblockNotice(lang, opts) {
    if (document.getElementById('cxAdblockOverlay')) return;
    var t = SHARED[lang] || SHARED.fr;
    opts = opts || {};

    var overlay = document.createElement('div');
    overlay.id = 'cxAdblockOverlay';
    // Noms de classe neutres pour ne PAS être ciblés par les filtres
    overlay.className = 'notice-overlay partner-notice-overlay';
    overlay.style.cssText = [
      'position:fixed','inset:0','background:rgba(26,58,92,0.55)',
      'z-index:99999','display:flex','align-items:center','justify-content:center',
      'padding:16px','font-family:"DM Sans",sans-serif','animation:cxFadeIn 0.2s ease'
    ].join(';');

    var steps = (t.adblockSteps || []).map(function(s, i){
      return '<li style="margin:6px 0;line-height:1.55;color:#333;">' + s + '</li>';
    }).join('');

    var card = document.createElement('div');
    card.style.cssText = [
      'background:#fff','border-radius:16px','max-width:520px','width:100%',
      'box-shadow:0 20px 60px rgba(26,58,92,0.35)','overflow:hidden',
      'position:relative','animation:cxPopIn 0.25s ease'
    ].join(';');

    card.innerHTML =
      '<div style="background:linear-gradient(135deg,#1a3a5c 0%,#2d6a9f 100%);padding:22px 26px;color:#fff;">' +
        '<h2 style="font-family:\'Playfair Display\',serif;font-size:1.25rem;margin:0 0 4px 0;font-weight:700;">' + t.adblockTitle + '</h2>' +
      '</div>' +
      '<div style="padding:22px 26px 6px 26px;color:#333;font-size:0.92rem;line-height:1.6;">' +
        '<p style="margin-bottom:12px;">' + t.adblockIntro + '</p>' +
        '<p style="margin-bottom:14px;">' + t.adblockAsk + '</p>' +
        '<div style="background:#f4f1eb;border-left:3px solid #e8c547;border-radius:6px;padding:12px 14px;margin-bottom:14px;">' +
          '<div style="font-weight:600;color:#1a3a5c;margin-bottom:6px;">' + t.adblockHow + '</div>' +
          '<ol style="margin:0;padding-left:22px;">' + steps + '</ol>' +
        '</div>' +
        '<p style="font-size:0.82rem;color:#666;margin-bottom:4px;">ℹ️ ' + t.adblockNoteButtons + '</p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;padding:16px 26px 22px 26px;justify-content:flex-end;flex-wrap:wrap;">' +
        '<button id="cxAdblockDismissBtn" style="background:transparent;border:1.5px solid #e8e4dc;color:#666;padding:10px 16px;border-radius:10px;font-family:inherit;font-size:0.88rem;cursor:pointer;font-weight:500;">' + t.adblockDismiss + '</button>' +
        '<button id="cxAdblockOkBtn" style="background:linear-gradient(135deg,#1d6f42 0%,#2f8f5f 100%);border:none;color:#fff;padding:10px 20px;border-radius:10px;font-family:inherit;font-size:0.88rem;cursor:pointer;font-weight:600;box-shadow:0 4px 14px rgba(29,111,66,0.3);">' + t.adblockOk + '</button>' +
      '</div>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Injecter les animations CSS une seule fois
    if (!document.getElementById('cxAdblockCss')) {
      var styleEl = document.createElement('style');
      styleEl.id = 'cxAdblockCss';
      styleEl.textContent = '@keyframes cxFadeIn{from{opacity:0}to{opacity:1}}@keyframes cxPopIn{from{opacity:0;transform:translateY(12px) scale(0.97)}to{opacity:1;transform:none}}';
      document.head.appendChild(styleEl);
    }

    document.getElementById('cxAdblockOkBtn').onclick = function () {
      setAdblockDismissed(7); // "J'ai compris" : on ne redemande pas pendant 7 jours
      hideAdblockNotice();
    };
    document.getElementById('cxAdblockDismissBtn').onclick = function () {
      setAdblockDismissed(30); // "Continuer sans désactiver" : pas avant 30 jours
      hideAdblockNotice();
    };
    overlay.onclick = function (e) {
      if (e.target === overlay) {
        setAdblockDismissed(1); // fermeture en cliquant dehors : 1 jour
        hideAdblockNotice();
      }
    };
  }

  function checkAdBlockAndNotify(lang, opts) {
    opts = opts || {};
    if (!opts.force && getAdblockDismissed()) return;
    // Laisser à la page le temps de se charger avant de déranger l'utilisateur
    setTimeout(function () {
      detectAdBlock(function (blocked) {
        if (blocked) showAdblockNotice(lang, opts);
      });
    }, opts.delay || 1200);
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
    detectAdBlock: detectAdBlock,
    showAdblockNotice: showAdblockNotice,
    hideAdblockNotice: hideAdblockNotice,
    checkAdBlockAndNotify: checkAdBlockAndNotify,
  };
})(window);
