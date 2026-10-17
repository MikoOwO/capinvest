// Contenu de la version française (langue source du site).
// Toute clé ajoutée ici doit exister dans en.mjs : test/content.test.mjs le vérifie.

export default {
  meta: {
    lang: 'fr',
    locale: 'fr_FR',
    path: '/',
    title: 'Capinvest Partners — Conseil en finance d’entreprise',
    description:
      'Capinvest Partners conseille dirigeants et investisseurs sur leurs opérations en capital : levées de fonds, cessions, acquisitions, introductions en bourse et structuration de fonds, en Europe, en Afrique et au Moyen-Orient.',
  },

  language: {
    otherLang: 'en',
    otherPath: '/en',
    switchLabel: 'Afficher le site en anglais',
  },

  a11y: {
    home: 'Capinvest Partners, retour en haut de page',
    mainNav: 'Navigation principale',
    mobileNav: 'Menu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    compare: 'Négociant de titres et conseil comparés',
    situation: 'Votre situation',
    filterDeals: 'Filtrer les opérations',
    footerNav: 'Pied de page',
    linkedin: 'LinkedIn de Capinvest Partners',
  },

  nav: {
    business: 'Notre métier',
    expertise: 'Expertise',
    references: 'Références',
    founder: 'Le fondateur',
    codev: 'Co-développement',
    contact: 'Contact',
    cta: 'Prendre rendez-vous',
  },

  hero: {
    eyebrow: 'Conseil en finance d’entreprise en Europe, en Afrique et au Moyen-Orient',
    title: 'Optimisez les termes de vos opérations en capital.',
    lead: 'Levées de fonds, cessions, acquisitions, introductions en bourse et structuration de fonds : nous structurons, valorisons et négocions les termes de votre opération en capital, à la vente comme à l’achat, pour un deal qui réussit et un partenariat qui dure.',
    ctaTalk: 'Échangez avec nous',
    ctaReferences: 'Nos références',
    discover: 'Découvrir',
  },

  business: {
    title: 'Un conseil, pas un marchand de titres.',
    lead: 'Notre rôle est d’obtenir pour vous les meilleurs termes (prix, structure, garanties, gouvernance, calendrier) sans fragiliser ce qui fera réussir le projet après la signature.',
    stats: [
      { value: '25+', label: 'ans d’expérience en marchés de capitaux et placements privés' },
      { value: '+1 Md€', label: 'de mandats conseillés depuis 2009' },
      { value: '3', label: 'places de marché : Euronext, NYSE et Bourse de Tunis' },
      { value: 'CIIA', label: 'Chartered International Investment Analyst' },
    ],
    compareThem: 'Un négociant de titres',
    compareUs: 'Capinvest Partners, votre conseil',
    compare: [
      { them: 'Cherche avant tout à conclure', us: 'Optimise les termes de l’opération pour son client' },
      { them: 'Se rémunère pour la mise en relation', us: 'Concilie l’intérêt du client et celui du projet' },
      { them: 'Reste neutre sur l’avenir du projet', us: 'Œuvre à la réussite du deal et du partenariat' },
      { them: 'Disparaît une fois l’opération signée', us: 'Reste à vos côtés bien après le closing' },
    ],
    pillars: [
      {
        title: 'L’intérêt de notre client',
        text: 'Votre valeur, vos conditions, votre position dans la négociation. C’est notre mandat, et il passe en premier.',
      },
      {
        title: 'L’intérêt du projet',
        text: 'Un prix arraché au détriment de la structure fragilise l’entreprise. Nous cherchons des termes qu’elle peut porter dans la durée.',
      },
      {
        title: 'La réussite du deal',
        text: 'Un accord construit avec les deux parties, pour qu’il se signe, se déroule et donne naissance à un vrai partenariat.',
      },
    ],
  },

  panel: {
    title: 'Ce que nous faisons pour vous',
    tabSell: 'Vous cédez ou levez',
    tabBuy: 'Vous achetez',
    sellSteps: [
      'Préparation de l’entreprise, business plan et equity story',
      'Valorisation défendue et argumentée',
      'Mise en concurrence des acquéreurs et investisseurs',
      'Négociation du prix, des garanties et de la gouvernance',
    ],
    buySteps: [
      'Audit de l’information et due diligence',
      'Modélisation du business plan et valorisation',
      'Négociation du prix et de la documentation',
      'Structuration du financement de l’acquisition',
    ],
  },

  expertise: {
    label: 'Notre expertise',
    title: 'Toute la chaîne du conseil, de la stratégie au closing.',
    lead: 'Modélisation, valorisation, mémorandum d’information, data room, due diligence, documentation et négociation.',
    reference: 'Référence',
    services: [
      {
        title: 'Conseil stratégique',
        desc: 'Aux côtés de grands cabinets internationaux, jusqu’à la définition de stratégies sectorielles nationales.',
        ref: 'Restructuration du secteur du tourisme tunisien',
      },
      {
        title: 'Conseil à la vente',
        desc: 'Structuration, valorisation, mémorandum, lettre d’intention, data room, due diligence, documentation et closing.',
        ref: 'Sortie d’un fonds de private equity',
      },
      {
        title: 'Conseil à l’achat',
        desc: 'Audit de l’information, modélisation du business plan, valorisation, négociation du prix et de la documentation.',
        ref: 'Acquisition d’un réseau bancaire en Afrique',
      },
      {
        title: 'Fonds propres, quasi-fonds propres et dette',
        desc: 'Accords de financement conclus avec des investisseurs et institutions financières de premier plan.',
        ref: 'Financement de projet en Namibie',
      },
      {
        title: 'Introduction en bourse',
        desc: 'Documentation d’offre, business plan, equity story, valorisation et présentations de roadshow.',
        ref: 'Évaluateur de l’IPO de Cellcom Tunisie',
      },
      {
        title: 'Structuration de fonds d’investissement',
        desc: 'Stratégie du fonds, pipeline d’investissement, business plan et levée de capitaux.',
        ref: 'Fonds d’urgence Covid',
      },
    ],
  },

  references: {
    title: 'Sélection d’opérations réalisées.',
    lead: 'Plus de 25 ans de mandats en finance d’entreprise.',
    categories: [
      { id: 'fonds', label: 'Fonds et institutions' },
      { id: 'ma', label: 'Cessions et acquisitions' },
      { id: 'marches', label: 'Marchés et projets' },
      { id: 'startups', label: 'Startups' },
      { id: 'avant', label: 'Avant Capinvest' },
    ],
    deals: [
      { cat: 'fonds', year: '2023', op: 'Fonds mezzanine pour la restructuration de PME', detail: 'Fonds Tunisien d’Investissement (FTI)', amount: 'EUR 100 M' },
      { cat: 'fonds', year: '2022', op: 'Structuration d’un founder studio', detail: 'Betacube, Tunisie', amount: 'USD 15 M' },
      { cat: 'fonds', year: '2020', op: 'Structuration d’un fonds d’urgence Covid', detail: 'Caisse des Dépôts et Consignations, Tunisie', amount: 'EUR 200 M' },
      { cat: 'fonds', year: '2014', op: 'Création d’une société de gestion (GP)', detail: 'Keystone Finance, Côte d’Ivoire : fonds de restructuration hôtelière', amount: 'Fonds' },
      { cat: 'fonds', year: '2010', op: 'Restructuration de la dette hôtelière', detail: 'Banque, Tunisie', amount: 'EUR 500 M' },
      { cat: 'ma', year: '2016', op: 'Cession minoritaire d’une clinique privée', detail: 'Conseil exclusif de l’actionnaire de référence, Tunisie', amount: 'Santé' },
      { cat: 'ma', year: '2013', op: 'Acquisition en Tunisie par un groupe japonais de matériel médical', detail: 'Restructuration et management de transition', amount: 'Santé' },
      { cat: 'ma', year: '2010', op: 'Acquisition d’un réseau bancaire en Afrique', detail: 'Conseil à l’achat de BPCE (France)', amount: 'Banque' },
      { cat: 'ma', year: '2010', op: 'Cession d’un opérateur de téléphonie mobile', detail: 'Processus compétitif, Côte d’Ivoire', amount: 'Télécoms' },
      { cat: 'ma', year: '2009', op: 'Restructuration du secteur du tourisme', detail: 'État tunisien, aux côtés de Roland Berger', amount: 'Tourisme' },
      { cat: 'marches', year: '2014', op: 'Introduction en bourse de Cellcom Tunisie', detail: 'Évaluateur : business plan, equity story et prix d’introduction', amount: 'IPO' },
      { cat: 'marches', year: '2011', op: 'Financement d’une usine de dessalement', detail: 'United Africa Group, Namibie', amount: 'USD 20 M' },
      { cat: 'marches', year: '2011', op: 'Formation au financement d’infrastructures', detail: 'Pour une banque, Côte d’Ivoire', amount: 'Banque' },
      { cat: 'startups', year: '2024', op: 'Clik2read', detail: 'Marketplace de livres', amount: 'USD 0,5 M' },
      { cat: 'startups', year: '2023', op: 'Groupado', detail: 'Coaching et formation en ligne', amount: 'USD 0,8 M' },
      { cat: 'startups', year: '2022', op: 'Bumpli', detail: 'Solution no-code', amount: 'TND 1,2 M' },
      { cat: 'startups', year: '2021', op: 'Garanty', detail: 'Assurance affinitaire', amount: 'TND 0,8 M' },
      { cat: 'startups', year: '2020', op: 'Split', detail: 'Covoiturage', amount: 'TND 1 M' },
      { cat: 'startups', year: '2019', op: 'Satoripop', detail: 'Développement IT', amount: 'TND 1 M' },
      { cat: 'startups', year: '2018', op: 'MS Solutions', detail: 'Paiement digital (fintech)', amount: 'TND 5 M' },
      { cat: 'avant', year: '2008', op: 'Introduction en bourse d’Iberdrola', detail: 'Espagne', amount: 'EUR 5 Md' },
      { cat: 'avant', year: '2007', op: 'Augmentation de capital de Schneider Electric', detail: 'Pour l’acquisition d’APC', amount: 'EUR 979 M' },
      { cat: 'avant', year: '2007', op: 'Augmentation de capital d’Altamir Amboise (Apax Partners)', detail: 'Euronext', amount: 'EUR 120 M' },
      { cat: 'avant', year: '2006', op: 'Financement de l’acquisition d’Amena', detail: 'Opérateur mobile espagnol, devenu Orange', amount: 'EUR 6,4 Md' },
      { cat: 'avant', year: '2006', op: 'Augmentation de capital de SCOR', detail: 'Pour l’acquisition de Revios', amount: 'EUR 377 M' },
      { cat: 'avant', year: '2006', op: 'Financement syndiqué de Mondadori', detail: 'Pour l’acquisition d’Emap France', amount: 'EUR 545 M' },
      { cat: 'avant', year: '2004', op: 'Restructuration d’une facilité bancaire syndiquée', detail: 'Télécoms, France', amount: 'EUR 15 Md' },
      { cat: 'avant', year: '2002–03', op: 'Financements d’Atos Origin', detail: 'Acquisitions de la division conseil de KPMG et de Sema', amount: 'EUR 1,85 Md' },
    ],
    note: 'Au-delà des opérations conclues, de nombreux mandats de préparation et de structuration (business plans, valorisations, mémorandums, plans de restructuration) dans l’industrie, le tourisme, la santé, les services maritimes et le digital.',
  },

  founder: {
    name: 'Maher Zaanouni',
    role: 'Fondateur et associé gérant, CIIA',
    photoAlt: 'Maher Zaanouni, fondateur et associé gérant de Capinvest Partners',
    label: 'Le mot du fondateur',
    quote: '« L’intelligence artificielle aide la réflexion, elle accélère. Elle ne sait pas mener un deal à son terme. »',
    paragraphs: [
      'Une IA résume un secteur ou esquisse une valorisation en quelques secondes, et nous l’utilisons pour aller plus vite. Mais une opération se joue là où aucune base de données ne va : un dirigeant qui cède l’entreprise d’une vie, la clause qui fait basculer une négociation, la confiance entre deux parties qui ne se connaissent pas encore.',
      'Un bon deal n’est pas celui où une partie gagne contre l’autre. C’est celui qui crée les conditions de la réussite du projet.',
    ],
    careerTitle: 'Parcours',
    career: [
      { year: '2000', volume: '+50 Md€', firm: 'ABN AMRO', what: 'Financements structurés, de projets et d’acquisition' },
      { year: '2006', volume: '+2 Md€', firm: 'ABN AMRO Rothschild', what: 'IPO, augmentations de capital, convertibles' },
      { year: '2008', volume: '+300 M€', firm: 'MediCapital Finance', what: 'Directeur à Paris (BMCE Bank), opérations Afrique' },
      { year: 'Depuis 2009', volume: '+1 Md€', firm: 'Capinvest Partners', what: 'M&A, equity, quasi-equity et dette, région MENA' },
    ],
  },

  ai: {
    title: 'Ce que l’IA ne remplace pas',
    items: [
      {
        title: 'Le contexte, pas la moyenne',
        text: 'Actionnaires, contraintes réglementaires et culturelles : nous connaissons les marchés où nous intervenons.',
      },
      {
        title: 'Le jugement en négociation',
        text: 'Quand tenir, quand concéder, quelle clause compte vraiment : cela s’apprend à la table, pas dans un modèle.',
      },
      {
        title: 'La confiance et le réseau',
        text: '25 ans de relations avec investisseurs, banques, cabinets d’avocats et d’audit, institutions multilatérales.',
      },
    ],
  },

  codev: {
    title: 'Au-delà de la réussite d’une opération, nous vous accompagnons pour réussir votre feuille de route à long terme.',
    steps: [
      { n: '1', title: 'Avant', text: 'Nous comprenons votre stratégie, bien avant l’opération.' },
      { n: '2', title: 'Pendant', text: 'Nous la défendons à la table de négociation.' },
      { n: '3', title: 'Après', text: 'Nous restons à vos côtés pour les étapes suivantes.' },
    ],
    closing: 'Notre réussite se mesure à la qualité et à la durée de notre relation avec nos clients et partenaires.',
  },

  contact: {
    title: 'Parlons de votre prochaine opération.',
    lead: 'Un premier échange confidentiel et sans engagement, directement avec le fondateur.',
    trustConfidential: 'Confidentialité totale',
    trustRegions: 'Europe, Afrique et région MENA',
    fieldName: 'Nom et société',
    fieldEmail: 'E-mail professionnel',
    fieldType: 'Type d’opération',
    fieldProject: 'Votre projet en quelques lignes',
    operations: ['Cession', 'Acquisition', 'Levée de fonds', 'Introduction en bourse', 'Structuration de fonds', 'Conseil stratégique'],
    submit: 'Cliquez ici pour envoyer',
    sending: 'Envoi en cours…',
    errorInvalid: 'Merci d’indiquer votre nom et un e-mail valide.',
    errorSend: 'L’envoi a échoué. Veuillez réessayer dans quelques instants.',
    sentTitle: 'Demande envoyée.',
    sentText: 'Merci. Maher Zaanouni vous recontacte personnellement pour convenir d’un premier échange.',
    sentAgain: 'Envoyer une autre demande',
  },

  footer: {
    tagline: 'Conseil en finance d’entreprise en Europe, en Afrique et dans la région MENA, depuis 2009.',
    copyright: '© 2026 Capinvest Partners. Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    madeBy: 'Réalisé par',
  },
};
