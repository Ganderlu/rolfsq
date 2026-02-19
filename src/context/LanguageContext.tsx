"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Language = string;

export type CountryCode = string;

type LanguageContextValue = {
  language: Language;
  country: CountryCode;
  setCountry: (code: CountryCode) => void;
  t: (key: string) => string;
};

export const COUNTRY_OPTIONS: { code: CountryCode; label: string }[] = [
  { code: "", label: "Select Country" },
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "MX", label: "Mexico" },
  { code: "BR", label: "Brazil" },
  { code: "AR", label: "Argentina" },
  { code: "GB", label: "United Kingdom" },
  { code: "IE", label: "Ireland" },
  { code: "FR", label: "France" },
  { code: "DE", label: "Germany" },
  { code: "ES", label: "Spain" },
  { code: "PT", label: "Portugal" },
  { code: "IT", label: "Italy" },
  { code: "NL", label: "Netherlands" },
  { code: "BE", label: "Belgium" },
  { code: "CH", label: "Switzerland" },
  { code: "AT", label: "Austria" },
  { code: "SE", label: "Sweden" },
  { code: "NO", label: "Norway" },
  { code: "DK", label: "Denmark" },
  { code: "FI", label: "Finland" },
  { code: "PL", label: "Poland" },
  { code: "CZ", label: "Czech Republic" },
  { code: "HU", label: "Hungary" },
  { code: "RO", label: "Romania" },
  { code: "GR", label: "Greece" },
  { code: "TR", label: "Turkey" },
  { code: "RU", label: "Russia" },
  { code: "UA", label: "Ukraine" },
  { code: "CN", label: "China" },
  { code: "JP", label: "Japan" },
  { code: "KR", label: "South Korea" },
  { code: "IN", label: "India" },
  { code: "PK", label: "Pakistan" },
  { code: "BD", label: "Bangladesh" },
  { code: "ID", label: "Indonesia" },
  { code: "TH", label: "Thailand" },
  { code: "VN", label: "Vietnam" },
  { code: "MY", label: "Malaysia" },
  { code: "SG", label: "Singapore" },
  { code: "PH", label: "Philippines" },
  { code: "AU", label: "Australia" },
  { code: "NZ", label: "New Zealand" },
  { code: "NG", label: "Nigeria" },
  { code: "GH", label: "Ghana" },
  { code: "KE", label: "Kenya" },
  { code: "TZ", label: "Tanzania" },
  { code: "UG", label: "Uganda" },
  { code: "ZA", label: "South Africa" },
  { code: "EG", label: "Egypt" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "AE", label: "United Arab Emirates" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },
  { code: "IL", label: "Israel" },
];

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  country: "",
  setCountry: () => {},
  t: (key: string) => key,
});

const COUNTRY_STORAGE_KEY = "Noble Vest-country";

const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  US: "en",
  CA: "en",
  GB: "en",
  IE: "en",
  AU: "en",
  NZ: "en",
  SG: "en",
  PH: "en",
  NG: "en",
  GH: "en",
  KE: "en",
  TZ: "en",
  UG: "en",
  ZA: "en",
  FR: "fr",
  BE: "fr",
  CH: "fr",
  DE: "de",
  AT: "de",
  ES: "es",
  MX: "es",
  AR: "es",
  BR: "pt",
  PT: "pt",
  IT: "it",
  NL: "nl",
  SE: "sv",
  NO: "no",
  DK: "da",
  FI: "fi",
  PL: "pl",
  CZ: "cs",
  HU: "hu",
  RO: "ro",
  GR: "el",
  TR: "tr",
  RU: "ru",
  UA: "uk",
  CN: "zh-CN",
  JP: "ja",
  KR: "ko",
  IN: "hi",
  PK: "ur",
  BD: "bn",
  ID: "id",
  TH: "th",
  VN: "vi",
  MY: "ms",
  EG: "ar",
  SA: "ar",
  AE: "ar",
  QA: "ar",
  KW: "ar",
  IL: "he",
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.faqs": "FAQs",
    "nav.license": "Our Licence",
    "nav.contact": "Contact Us",
    "nav.login": "Login",
    "nav.getStarted": "Get Started",
    "hero.badge": "SECURE & REGULATED PLATFORM",
    "hero.title": "Invest Smarter in Digital Assets",
    "hero.subtitle":
      "Noble Vest provides a secure, transparent, and efficient way to grow your portfolio. Join thousands of investors earning passive income through our advanced trading algorithms.",
    "hero.primaryCta": "Start Investing",
    "hero.secondaryCta": "View Markets",
    "hero.stat.assets": "Assets Managed",
    "hero.stat.investors": "Active Investors",
    "hero.stat.countries": "Countries",
    "about.title": "About Noble Vest Invest",
    "about.subtitle":
      "Empowering traders worldwide with advanced technology, security, and transparent financial solutions.",
    "faqs.title": "Frequently Asked Questions",
    "faqs.subtitle":
      "Find answers to common questions about our platform, trading, and account management.",
    "license.title": "Licensing & Regulation",
    "license.subtitle":
      "We operate under strict regulatory standards to ensure the safety and security of your investments.",
    "contact.title": "Contact Us!",
    "contact.subtitle":
      "Have questions? Our support team is available 24/7 to assist you.",
    "services.heading": "Our Services",
    "feature.secureTitle": "Secure Platform",
    "feature.secureText":
      "Firebase-backed authentication and top-tier data security standards.",
    "feature.smartTitle": "Smart Investments",
    "feature.smartText":
      "Advanced algorithms to track and manage your digital asset portfolio.",
    "feature.realtimeTitle": "Real-Time Tracking",
    "feature.realtimeText":
      "Monitor your balances, trades, and investment status instantly.",
    "why.heading":
      "Join 15,000+ Traders from across the globe. Noble Vest is your trusted partner in forex, gold, cannabis, and real estate markets.",
    "why.investmentTitle": "Investment Opportunities",
    "why.investmentText":
      "Noble Vest leads in diverse investment opportunities, offering investors the chance to explore forex, gold, cannabis, and real estate with tailored funding solutions.",
    "why.investmentAccordion1": "Funding evaluations",
    "why.investmentAccordion2": "Competitions",
    "why.investmentAccordion3": "Profit share & Scaling plan",
    "why.brokerageTitle": "Brokerage",
    "why.brokerageText":
      "We offer a comprehensive suite of brokerage services with access to a wide range of financial instruments, competitive spreads, and fast execution.",
    "why.brokerageAccordion1": "Forex",
    "why.brokerageAccordion2": "Commodities & Indices",
    "why.brokerageAccordion3": "Trading Platforms",
    "community.badge": "Trade with the best",
    "community.heading": "Join Our Community",
    "community.text":
      "Become part of our community of traders and educators pushing for the best results in the markets.",
    "community.cta": "Join Us Today",
    "advisor.badge": "One of our advisors",
    "advisor.cta": "Join Us Today",
    "mission.heading": "We Offer Financial Strategies & Superior Services",
    "mission.text":
      "Our mission is to provide quality guidance, build relationships of trust, and develop innovative solutions.",
    "mission.cta": "Open Account",
    "principles.heading": "OUR PRINCIPLES",
    "principles.chips":
      "TRANSPARENCY · INTEGRITY · PERFORMANCE · COLLABORATION · SUPPORT",
    "principles.missionTitle": "Our Mission",
    "principles.missionText":
      "To be the best partner for skilled investors worldwide with diverse investment options.",
    "principles.visionTitle": "Our Vision",
    "principles.visionText":
      "To be a leading force in investment innovation and build a global community of investors.",
    "plans.heading": "The Right Plan for every Business",
    "plans.subheading":
      "Discover flexible and transparent pricing options for every type of business.",
    "plans.apply": "Apply for this plan",
    "plans.note": "*No Credit Card required",
    "plans.benefits": "Benefits Included:",
    "trade.heading": "TRADE THE WAY YOU WANT",
    "trade.text":
      "Choose between forex, gold, cannabis, and real estate — with strategies to suit any investment style.",
    "trade.cta": "FIND OUT MORE",
    "trade.disclaimer":
      "Pricing is indicative. Past performance is not a reliable indicator of future results.",
    "faq.heading": "Frequently Asked Questions",
    "faq.helpTitle": "Need any help!",
    "faq.helpText":
      "Find answers to frequently asked questions about Noble Vest.",
    "faq.contactCta": "Contact Us",
    "tradingHero.heading": "START TRADING WITH US TODAY",
    "tradingHero.text":
      "Ready to take your trading to the next level? Sign up and unlock your potential with our brokerage and prop trading services.",
    "tradingHero.cta": "JOIN US TODAY",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.faqs": "FAQ",
    "nav.license": "Notre licence",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.getStarted": "Commencer",
    "hero.badge": "PLATEFORME SÉCURISÉE ET RÉGLEMENTÉE",
    "hero.title": "Investissez plus intelligemment dans les actifs numériques",
    "hero.subtitle":
      "Noble Vest offre un moyen sûr, transparent et efficace de développer votre portefeuille. Rejoignez des milliers d’investisseurs qui gagnent un revenu passif grâce à nos algorithmes de trading avancés.",
    "hero.primaryCta": "Commencer à investir",
    "hero.secondaryCta": "Voir les marchés",
    "hero.stat.assets": "Actifs gérés",
    "hero.stat.investors": "Investisseurs actifs",
    "hero.stat.countries": "Pays",
    "about.title": "À propos de Noble Vest Invest",
    "about.subtitle":
      "Nous donnons aux traders du monde entier les moyens d’agir grâce à une technologie avancée, une sécurité renforcée et des solutions financières transparentes.",
    "faqs.title": "Questions fréquentes",
    "faqs.subtitle":
      "Trouvez des réponses aux questions les plus courantes sur notre plateforme, le trading et la gestion de compte.",
    "license.title": "Licence et réglementation",
    "license.subtitle":
      "Nous opérons selon des normes réglementaires strictes afin de garantir la sécurité de vos investissements.",
    "contact.title": "Contactez-nous",
    "contact.subtitle":
      "Des questions ? Notre équipe d’assistance est disponible 24h/24 et 7j/7 pour vous aider.",
    "services.heading": "Nos services",
    "feature.secureTitle": "Plateforme sécurisée",
    "feature.secureText":
      "Authentification avec Firebase et normes de sécurité des données de haut niveau.",
    "feature.smartTitle": "Investissements intelligents",
    "feature.smartText":
      "Algorithmes avancés pour suivre et gérer votre portefeuille d’actifs numériques.",
    "feature.realtimeTitle": "Suivi en temps réel",
    "feature.realtimeText":
      "Surveillez vos soldes, vos trades et vos investissements instantanément.",
    "why.heading":
      "Rejoignez plus de 15 000 traders dans le monde. Noble Vest est votre partenaire de confiance pour le forex, l’or, le cannabis et l’immobilier.",
    "why.investmentTitle": "Opportunités d’investissement",
    "why.investmentText":
      "Noble Vest propose des opportunités diversifiées avec des solutions de financement adaptées et des modèles de partage de profit compétitifs.",
    "why.investmentAccordion1": "Évaluations de financement",
    "why.investmentAccordion2": "Concours",
    "why.investmentAccordion3": "Partage des profits et plan de croissance",
    "why.brokerageTitle": "Courtier",
    "why.brokerageText":
      "Nous offrons une gamme complète de services de courtage avec accès à de nombreux instruments financiers.",
    "why.brokerageAccordion1": "Forex",
    "why.brokerageAccordion2": "Matières premières et indices",
    "why.brokerageAccordion3": "Plateformes de trading",
    "community.badge": "Tradez avec les meilleurs",
    "community.heading": "Rejoignez notre communauté",
    "community.text":
      "Devenez membre de notre communauté de traders et de formateurs qui recherchent les meilleures performances.",
    "community.cta": "Rejoignez-nous dès aujourd’hui",
    "advisor.badge": "L’un de nos conseillers",
    "advisor.cta": "Rejoignez-nous dès aujourd’hui",
    "mission.heading":
      "Nous offrons des stratégies financières et des services de qualité supérieure",
    "mission.text":
      "Notre mission est de fournir des conseils de qualité, de bâtir des relations de confiance et de développer des solutions innovantes.",
    "mission.cta": "Ouvrir un compte",
    "principles.heading": "NOS PRINCIPES",
    "principles.chips":
      "TRANSPARENCE · INTÉGRITÉ · PERFORMANCE · COLLABORATION · SUPPORT",
    "principles.missionTitle": "Notre mission",
    "principles.missionText":
      "Être le meilleur partenaire pour les investisseurs qualifiés, avec des options d’investissement variées.",
    "principles.visionTitle": "Notre vision",
    "principles.visionText":
      "Devenir un acteur majeur de l’innovation en investissement et bâtir une communauté mondiale d’investisseurs.",
    "plans.heading": "Le bon plan pour chaque entreprise",
    "plans.subheading":
      "Découvrez des options flexibles et transparentes adaptées à votre activité.",
    "plans.apply": "Souscrire à ce plan",
    "plans.note": "*Aucune carte bancaire requise",
    "plans.benefits": "Avantages inclus :",
    "trade.heading": "TRADEZ COMME VOUS LE SOUHAITEZ",
    "trade.text":
      "Choisissez entre le forex, l’or, le cannabis et l’immobilier avec des stratégies adaptées à votre style.",
    "trade.cta": "EN SAVOIR PLUS",
    "trade.disclaimer":
      "Les prix sont indicatifs. Les performances passées ne préjugent pas des résultats futurs.",
    "faq.heading": "Questions fréquentes",
    "faq.helpTitle": "Besoin d’aide ?",
    "faq.helpText":
      "Trouvez des réponses aux questions fréquentes sur Noble Vest.",
    "faq.contactCta": "Contactez-nous",
    "tradingHero.heading": "COMMENCEZ À TRADER AVEC NOUS DÈS AUJOURD’HUI",
    "tradingHero.text":
      "Prêt à passer au niveau supérieur ? Inscrivez-vous et exploitez votre potentiel grâce à nos services de courtage et de prop trading.",
    "tradingHero.cta": "Rejoignez-nous dès aujourd’hui",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre nosotros",
    "nav.services": "Servicios",
    "nav.faqs": "Preguntas frecuentes",
    "nav.license": "Nuestra licencia",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar sesión",
    "nav.getStarted": "Comenzar",
    "hero.badge": "PLATAFORMA SEGURA Y REGULADA",
    "hero.title": "Invierte de forma más inteligente en activos digitales",
    "hero.subtitle":
      "Noble Vest ofrece una forma segura, transparente y eficiente de hacer crecer tu portafolio. Únete a miles de inversores que ganan ingresos pasivos con nuestros algoritmos avanzados de trading.",
    "hero.primaryCta": "Comenzar a invertir",
    "hero.secondaryCta": "Ver mercados",
    "hero.stat.assets": "Activos gestionados",
    "hero.stat.investors": "Inversores activos",
    "hero.stat.countries": "Países",
    "about.title": "Acerca de Noble Vest Invest",
    "about.subtitle":
      "Impulsamos a los traders de todo el mundo con tecnología avanzada, seguridad y soluciones financieras transparentes.",
    "faqs.title": "Preguntas frecuentes",
    "faqs.subtitle":
      "Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma, el trading y la gestión de cuentas.",
    "license.title": "Licencias y regulación",
    "license.subtitle":
      "Operamos bajo estrictas normas regulatorias para garantizar la seguridad de tus inversiones.",
    "contact.title": "Contáctanos",
    "contact.subtitle":
      "¿Tienes preguntas? Nuestro equipo de soporte está disponible 24/7 para ayudarte.",
    "services.heading": "Nuestros servicios",
    "feature.secureTitle": "Plataforma segura",
    "feature.secureText":
      "Autenticación respaldada por Firebase y estándares de seguridad de datos.",
    "feature.smartTitle": "Inversiones inteligentes",
    "feature.smartText":
      "Algoritmos avanzados para seguir y gestionar tu portafolio de activos digitales.",
    "feature.realtimeTitle": "Seguimiento en tiempo real",
    "feature.realtimeText":
      "Supervisa tus saldos, operaciones e inversiones al instante.",
    "why.heading":
      "Únete a más de 15 000 traders en todo el mundo. Noble Vest es tu socio de confianza en forex, oro, cannabis e inmobiliario.",
    "why.investmentTitle": "Oportunidades de inversión",
    "why.investmentText":
      "Noble Vest lidera en oportunidades diversas con soluciones de financiación a medida y modelos competitivos de reparto de beneficios.",
    "why.investmentAccordion1": "Evaluaciones de financiación",
    "why.investmentAccordion2": "Competiciones",
    "why.investmentAccordion3": "Reparto de beneficios y plan de escalado",
    "why.brokerageTitle": "Corretaje",
    "why.brokerageText":
      "Ofrecemos una gama completa de servicios de corretaje con acceso a múltiples instrumentos financieros.",
    "why.brokerageAccordion1": "Forex",
    "why.brokerageAccordion2": "Materias primas e índices",
    "why.brokerageAccordion3": "Plataformas de trading",
    "community.badge": "Opera con los mejores",
    "community.heading": "Únete a nuestra comunidad",
    "community.text":
      "Forma parte de nuestra comunidad de traders y educadores que buscan los mejores resultados.",
    "community.cta": "Únete hoy mismo",
    "advisor.badge": "Uno de nuestros asesores",
    "advisor.cta": "Únete hoy mismo",
    "mission.heading":
      "Ofrecemos estrategias financieras y servicios superiores",
    "mission.text":
      "Nuestra misión es ofrecer asesoría de calidad, construir relaciones de confianza y desarrollar soluciones innovadoras.",
    "mission.cta": "Abrir cuenta",
    "principles.heading": "NUESTROS PRINCIPIOS",
    "principles.chips":
      "TRANSPARENCIA · INTEGRIDAD · RENDIMIENTO · COLABORACIÓN · SOPORTE",
    "principles.missionTitle": "Nuestra misión",
    "principles.missionText":
      "Ser el mejor socio para inversores cualificados con opciones de inversión diversas.",
    "principles.visionTitle": "Nuestra visión",
    "principles.visionText":
      "Ser una fuerza líder en innovación financiera y construir una comunidad global de inversores.",
    "plans.heading": "El plan adecuado para cada negocio",
    "plans.subheading":
      "Descubre opciones flexibles y transparentes adaptadas a tu empresa.",
    "plans.apply": "Solicitar este plan",
    "plans.note": "*No se requiere tarjeta de crédito",
    "plans.benefits": "Beneficios incluidos:",
    "trade.heading": "OPERA COMO TÚ QUIERAS",
    "trade.text":
      "Elige entre forex, oro, cannabis e inmobiliario, con estrategias para cada estilo de inversión.",
    "trade.cta": "MÁS INFORMACIÓN",
    "trade.disclaimer":
      "Los precios son indicativos. El rendimiento pasado no garantiza resultados futuros.",
    "faq.heading": "Preguntas frecuentes",
    "faq.helpTitle": "¿Necesitas ayuda?",
    "faq.helpText":
      "Encuentra respuestas a preguntas frecuentes sobre Noble Vest.",
    "faq.contactCta": "Contáctanos",
    "tradingHero.heading": "COMIENZA A OPERAR CON NOSOTROS HOY MISMO",
    "tradingHero.text":
      "¿Listo para llevar tu trading al siguiente nivel? Regístrate y desbloquea tu potencial con nuestros servicios de corretaje y prop trading.",
    "tradingHero.cta": "Únete hoy mismo",
  },
  pt: {
    "nav.home": "Início",
    "nav.about": "Sobre nós",
    "nav.services": "Serviços",
    "nav.faqs": "Perguntas frequentes",
    "nav.license": "Nossa licença",
    "nav.contact": "Contato",
    "nav.login": "Entrar",
    "nav.getStarted": "Começar",
    "hero.badge": "PLATAFORMA SEGURA E REGULAMENTADA",
    "hero.title": "Invista de forma mais inteligente em ativos digitais",
    "hero.subtitle":
      "A Noble Vest oferece uma forma segura, transparente e eficiente de aumentar o seu portfólio. Junte-se a milhares de investidores que recebem renda passiva com nossos algoritmos avançados de negociação.",
    "hero.primaryCta": "Começar a investir",
    "hero.secondaryCta": "Ver mercados",
    "hero.stat.assets": "Ativos sob gestão",
    "hero.stat.investors": "Investidores ativos",
    "hero.stat.countries": "Países",
    "about.title": "Sobre a Noble Vest Invest",
    "about.subtitle":
      "Empoderamos traders no mundo inteiro com tecnologia avançada, segurança e soluções financeiras transparentes.",
    "faqs.title": "Perguntas frequentes",
    "faqs.subtitle":
      "Encontre respostas para as dúvidas mais comuns sobre nossa plataforma, negociações e gestão de conta.",
    "license.title": "Licenciamento e regulamentação",
    "license.subtitle":
      "Atuamos sob rígidos padrões regulatórios para garantir a segurança dos seus investimentos.",
    "contact.title": "Fale conosco",
    "contact.subtitle":
      "Tem dúvidas? Nossa equipe de suporte está disponível 24/7 para ajudar.",
    "services.heading": "Nossos serviços",
    "feature.secureTitle": "Plataforma segura",
    "feature.secureText":
      "Autenticação com Firebase e altos padrões de segurança de dados.",
    "feature.smartTitle": "Investimentos inteligentes",
    "feature.smartText":
      "Algoritmos avançados para acompanhar e gerir o seu portfólio de ativos digitais.",
    "feature.realtimeTitle": "Acompanhamento em tempo real",
    "feature.realtimeText":
      "Monitore seus saldos, operações e investimentos instantaneamente.",
    "why.heading":
      "Junte-se a mais de 15.000 traders em todo o mundo. A Noble Vest é o seu parceiro de confiança em forex, ouro, cannabis e imobiliário.",
    "why.investmentTitle": "Oportunidades de investimento",
    "why.investmentText":
      "A Noble Vest lidera em oportunidades diversificadas com soluções de financiamento personalizadas e modelos competitivos de partilha de lucros.",
    "why.investmentAccordion1": "Avaliações de financiamento",
    "why.investmentAccordion2": "Competições",
    "why.investmentAccordion3": "Partilha de lucros e plano de escala",
    "why.brokerageTitle": "Corretora",
    "why.brokerageText":
      "Oferecemos um conjunto completo de serviços de corretagem com acesso a vários instrumentos financeiros.",
    "why.brokerageAccordion1": "Forex",
    "why.brokerageAccordion2": "Commodities e índices",
    "why.brokerageAccordion3": "Plataformas de negociação",
    "community.badge": "Negocie com os melhores",
    "community.heading": "Junte-se à nossa comunidade",
    "community.text":
      "Faça parte da nossa comunidade de traders e educadores que buscam os melhores resultados nos mercados.",
    "community.cta": "Junte-se hoje",
    "advisor.badge": "Um dos nossos consultores",
    "advisor.cta": "Junte-se hoje",
    "mission.heading":
      "Oferecemos estratégias financeiras e serviços superiores",
    "mission.text":
      "Nossa missão é fornecer orientação de qualidade, construir relações de confiança e desenvolver soluções inovadoras.",
    "mission.cta": "Abrir conta",
    "principles.heading": "NOSSOS PRINCÍPIOS",
    "principles.chips":
      "TRANSPARÊNCIA · INTEGRIDADE · PERFORMANCE · COLABORAÇÃO · SUPORTE",
    "principles.missionTitle": "Nossa missão",
    "principles.missionText":
      "Ser o melhor parceiro para investidores qualificados, com opções amplas de investimento.",
    "principles.visionTitle": "Nossa visão",
    "principles.visionText":
      "Ser uma força líder em inovação de investimentos e construir uma comunidade global de investidores.",
    "plans.heading": "O plano certo para cada negócio",
    "plans.subheading":
      "Descubra opções flexíveis e transparentes adaptadas ao seu negócio.",
    "plans.apply": "Solicitar este plano",
    "plans.note": "*Nenhum cartão de crédito é necessário",
    "plans.benefits": "Benefícios incluídos:",
    "trade.heading": "NEGOCIE DO SEU JEITO",
    "trade.text":
      "Escolha entre forex, ouro, cannabis e imobiliário, com estratégias para cada estilo.",
    "trade.cta": "SAIBA MAIS",
    "trade.disclaimer":
      "Os preços são indicativos. O desempenho passado não garante resultados futuros.",
    "faq.heading": "Perguntas frequentes",
    "faq.helpTitle": "Precisa de ajuda?",
    "faq.helpText":
      "Encontre respostas para perguntas frequentes sobre a Noble Vest.",
    "faq.contactCta": "Fale conosco",
    "tradingHero.heading": "COMECE A NEGOCIAR CONOSCO HOJE MESMO",
    "tradingHero.text":
      "Pronto para levar o seu trading a outro nível? Cadastre-se e desbloqueie seu potencial com nossos serviços de corretagem e prop trading.",
    "tradingHero.cta": "Junte-se hoje",
  },
  de: {
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.services": "Dienstleistungen",
    "nav.faqs": "FAQ",
    "nav.license": "Unsere Lizenz",
    "nav.contact": "Kontakt",
    "nav.login": "Anmelden",
    "nav.getStarted": "Loslegen",
    "hero.badge": "SICHERE UND REGULIERTE PLATTFORM",
    "hero.title": "Investieren Sie smarter in digitale Vermögenswerte",
    "hero.subtitle":
      "Noble Vest bietet eine sichere, transparente und effiziente Möglichkeit, Ihr Portfolio zu vergrößern. Schließen Sie sich tausenden Anlegern an, die mit unseren fortschrittlichen Handelsalgorithmen passives Einkommen erzielen.",
    "hero.primaryCta": "Jetzt investieren",
    "hero.secondaryCta": "Märkte ansehen",
    "hero.stat.assets": "Verwaltete Vermögenswerte",
    "hero.stat.investors": "Aktive Anleger",
    "hero.stat.countries": "Länder",
    "about.title": "Über Noble Vest Invest",
    "about.subtitle":
      "Wir stärken Trader weltweit mit moderner Technologie, Sicherheit und transparenten Finanzlösungen.",
    "faqs.title": "Häufig gestellte Fragen",
    "faqs.subtitle":
      "Finden Sie Antworten auf häufige Fragen zu unserer Plattform, dem Handel und der Kontoverwaltung.",
    "license.title": "Lizenzierung und Regulierung",
    "license.subtitle":
      "Wir arbeiten nach strengen Regulierungsstandards, um die Sicherheit Ihrer Investitionen zu gewährleisten.",
    "contact.title": "Kontakt",
    "contact.subtitle":
      "Sie haben Fragen? Unser Support-Team ist rund um die Uhr für Sie da.",
    "services.heading": "Unsere Dienstleistungen",
    "feature.secureTitle": "Sichere Plattform",
    "feature.secureText":
      "Authentifizierung mit Firebase und hohe Standards für Datensicherheit.",
    "feature.smartTitle": "Intelligente Investitionen",
    "feature.smartText":
      "Fortgeschrittene Algorithmen zur Verfolgung und Verwaltung Ihres Krypto-Portfolios.",
    "feature.realtimeTitle": "Echtzeit-Tracking",
    "feature.realtimeText":
      "Überwachen Sie Ihre Guthaben, Trades und Investitionen in Echtzeit.",
    "why.heading":
      "Schließen Sie sich über 15.000 Tradern weltweit an. Noble Vest ist Ihr vertrauenswürdiger Partner für Forex, Gold, Cannabis und Immobilien.",
    "why.investmentTitle": "Investitionsmöglichkeiten",
    "why.investmentText":
      "Noble Vest bietet vielfältige Investitionsmöglichkeiten in Forex, Gold, Cannabis und Immobilien mit maßgeschneiderten Finanzierungslösungen.",
    "why.investmentAccordion1": "Finanzierungsbewertungen",
    "why.investmentAccordion2": "Wettbewerbe",
    "why.investmentAccordion3": "Gewinnbeteiligung & Skalierungsplan",
    "why.brokerageTitle": "Brokerage",
    "why.brokerageText":
      "Unser Brokerage bietet Zugang zu einer breiten Palette von Finanzinstrumenten mit engen Spreads und schnellen Ausführungen.",
    "why.brokerageAccordion1": "Forex",
    "why.brokerageAccordion2": "Rohstoffe & Indizes",
    "why.brokerageAccordion3": "Handelsplattformen",
    "community.badge": "Mit den Besten handeln",
    "community.heading": "Treten Sie unserer Community bei",
    "community.text":
      "Werden Sie Teil unserer Community aus Tradern und Ausbildern, die ständig nach den besten Ergebnissen an den Märkten streben.",
    "community.cta": "Noch heute beitreten",
    "advisor.badge": "Einer unserer Berater",
    "advisor.cta": "Noch heute beitreten",
    "mission.heading":
      "Wir bieten Finanzstrategien und erstklassige Dienstleistungen",
    "mission.text":
      "Unsere Mission ist es, hochwertige Beratung zu bieten, vertrauensvolle Beziehungen aufzubauen und innovative Lösungen zu entwickeln.",
    "mission.cta": "Konto eröffnen",
    "principles.heading": "UNSERE PRINZIPIEN",
    "principles.chips":
      "TRANSPARENZ · INTEGRITÄT · PERFORMANCE · ZUSAMMENARBEIT · SUPPORT",
    "principles.missionTitle": "Unsere Mission",
    "principles.missionText":
      "Der beste Partner für qualifizierte Investoren weltweit zu sein und vielfältige Investitionsoptionen anzubieten.",
    "principles.visionTitle": "Unsere Vision",
    "principles.visionText":
      "Eine globale Community von Investoren aufzubauen und die Grenzen des Möglichen an den Finanzmärkten zu verschieben.",
    "plans.heading": "Der richtige Plan für jedes Unternehmen",
    "plans.subheading":
      "Entdecken Sie flexible und transparente Optionen, die zu Ihrem Unternehmen passen.",
    "plans.apply": "Für diesen Plan bewerben",
    "plans.note": "*Keine Kreditkarte erforderlich",
    "plans.benefits": "Enthaltene Vorteile:",
    "trade.heading": "HANDELN SIE, WIE SIE WOLLEN",
    "trade.text":
      "Wählen Sie zwischen Forex, Gold, Cannabis und Immobilien – mit Kontotypen und Strategien für jeden Anlagestil.",
    "trade.cta": "Mehr erfahren",
    "trade.disclaimer":
      "Preise sind indikativ. Frühere Wertentwicklungen sind kein zuverlässiger Indikator für zukünftige Ergebnisse.",
    "faq.heading": "Häufig gestellte Fragen",
    "faq.helpTitle": "Brauchen Sie Hilfe?",
    "faq.helpText": "Finden Sie Antworten auf häufige Fragen zu Noble Vest.",
    "faq.contactCta": "Kontakt",
    "tradingHero.heading": "STARTEN SIE NOCH HEUTE MIT UNSEREM TRADING",
    "tradingHero.text":
      "Bringen Sie Ihr Trading auf das nächste Level – mit unserem Brokerage und Prop-Trading-Angebot.",
    "tradingHero.cta": "Noch heute beitreten",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>("");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCountry = window.localStorage.getItem(
      COUNTRY_STORAGE_KEY,
    ) as CountryCode | null;
    if (storedCountry) {
      setCountryState(storedCountry);
      const nextLanguage = COUNTRY_TO_LANGUAGE[storedCountry] || "en";
      setLanguage(nextLanguage);
    }
  }, []);

  function setCountry(code: CountryCode) {
    setCountryState(code);
    const nextLanguage = COUNTRY_TO_LANGUAGE[code] || "en";
    setLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(COUNTRY_STORAGE_KEY, code);
    }
  }

  function t(key: string) {
    const table = translations[language] || translations.en;
    return table[key] || translations.en[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, country, setCountry, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
