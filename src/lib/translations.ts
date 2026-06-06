export type Lang = "fr" | "en" | "es";

export const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.work": "Projets",
    "nav.about": "À propos",
    "nav.cta": "Me contacter",

    // Hero
    "hero.bio": "<bold>Dario</bold>, photographe français\nbasé dans le Sud, <bold>disponible pour vos projets</bold>.",
    "hero.sub": "Tout part d'un clic. Discutons ensemble.",

    // About
    "about.title": "Salut, moi c'est Dario.",
    "about.intro": "Un <bold>photographe français</bold> dédié à capturer les émotions brutes et les esthétiques digitales minimalistes.",
    "about.p1": "À travers mon objectif, j'explore la beauté discrète des moments quotidiens, les transformant en récits visuels puissants. Mon travail se situe à l'intersection de la photographie documentaire et de l'art.",
    "about.p2": "Chaque projet est une opportunité de repousser les limites et de créer quelque chose qui résonne avec les gens. Je crois au pouvoir du storytelling visuel.",
    "about.email": "Me laisser un mail",
    "about.call": "M'appeler",
    "about.role.label": "Rôle",
    "about.role.value": "Photographe",
    "about.location.label": "Localisation",
    "about.location.value": "France",
    "about.specialties.label": "Spécialités",
    "about.specialties.value": "Portrait, Éditorial, Art",
    "about.meta.location.label": "[LOCALISATION]",
    "about.meta.location.value": "Bordeaux, FR",
    "about.meta.discipline.label": "[DISCIPLINE]",
    "about.meta.discipline.value": "Photographie",
    "about.meta.contact.label": "[CONTACT]",
    "about.meta.contact.value": "Email",
    "about.bio.primary": "Salut, c'est Dario. Photographe français qui transforme les moments en souvenirs durables.",
    "about.bio.secondary": "Sport, éditorial, documentaire — des histoires visuelles qui résonnent.",
    "about.tag": "Disponible pour vos projets",
    "about.cityFR": "Bordeaux — FR",
    "about.pill.aboutMe": "À propos",
    "about.pill.experience": "Expérience",
    "about.heading": "Salut, je suis Dario, photographe français basé dans le Sud de la France, disponible partout dans le monde pour transformer vos projets en souvenirs durables.",
    "about.heading.sub": "Tout part d'un clic. Discutons ensemble.",
    "about.stats.years.value": "4+",
    "about.stats.years.label": "Années d'expérience",
    "about.stats.projects.value": "20+",
    "about.stats.projects.label": "Projets réalisés",
    "about.stats.clients.value": "10+",
    "about.stats.clients.label": "Clients satisfaits",
    "about.location.line": "Basé dans le Sud de la France",
    "about.cta": "Me contacter",
    "about.exp1.company": "Photographie Freelance",
    "about.exp1.role": "Fondateur",
    "about.exp1.years": "2021 — Présent",
    "about.exp1.desc": "Je développe une pratique créative autour de la photographie sportive, éditoriale et documentaire pour des athlètes, marques et publications.",
    "about.exp2.company": "Éditorial Sportif",
    "about.exp2.role": "Contributeur",
    "about.exp2.years": "2022 — Présent",
    "about.exp2.desc": "Couverture du rugby, du football, de la course et du Tour de France pour des médias sportifs partout en France.",

    // Avatar tooltip
    "avatar.name": "Dario Tonini",
    "avatar.role": "Photographe",

    // Other Projects
    "recentWork.title": "AUTRES PROJETS",
    "recentWork.viewAll": "Voir tous les projets",

    // Work
    "work.title": "WORK",
    "work.copyright": "Tous droits réservés. Toutes les photographies de ce site sont la propriété exclusive de Dario Tonini et ne peuvent être reproduites, distribuées ou utilisées sous quelque forme que ce soit sans consentement écrit préalable.",
    "work.privacy": "Politique de confidentialité",

    // Project detail
    "project.category": "[CATÉGORIE]",
    "project.client": "[CLIENT]",
    "project.year": "[ANNÉE]",
    "project.next": "Projet suivant",

    // Cursor pill
    "cursor.seeProject": "Voir le projet",

    // Footer
    "footer.bio": "Salut, je suis <bold>Dario</bold>, un <bold>photographe français</bold> dédié à capturer les émotions brutes et les esthétiques digitales minimalistes.",
    "footer.sub": "Je crée des histoires visuelles qui marquent et résonnent.",
    "footer.role": "photographe français",
    "footer.name": "DARIO TONINI",

    // Aria / Alt
    "aria.language": "Changer de langue",
    "aria.instagram": "Instagram",
    "aria.linkedin": "LinkedIn",

    // Project titles
    "project.football.title": "Football",
    "project.travel.title": "Voyage",
    "project.rugby.title": "Rugby",
    "project.tourdefrance.title": "Tour de France",
    "project.running.title": "Course",
    "project.otherssports.title": "Autres Sports",
    "project.artisanat.title": "Artisanat",

    // Project descriptions
    "project.football.desc": "Photographie sportive capturant l'intensité et la passion du football.",
    "project.travel.desc": "Reportage de voyage à travers le monde, des paysages aux rencontres.",
    "project.rugby.desc": "L'énergie brute du rugby saisie sur le terrain.",
    "project.tourdefrance.desc": "Le Tour de France immortalisé à travers l'effort et l'asphalte.",
    "project.running.desc": "L'athlétisme en mouvement — sprint, fond et courses de rue.",
    "project.otherssports.desc": "Une sélection éclectique de sports variés, du basket au surf.",
    "project.artisanat.desc": "L'artisanat sous un regard photographique — matières, gestes et savoir-faire.",

    // Privacy Policy
    "privacy.title": "Politique de confidentialité",
    "privacy.lastUpdated": "Dernière mise à jour",
    "privacy.s1.title": "1. Introduction",
    "privacy.s1.body": "Le présent site internet dariotonini.com (ci-après « le Site ») est édité par Dario Tonini, photographe indépendant basé en France. Cette politique de confidentialité a pour objet de vous informer sur la manière dont vos données personnelles sont collectées, traitées et protégées conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.",
    "privacy.s2.title": "2. Responsable du traitement",
    "privacy.s2.body": "Le responsable du traitement des données personnelles est :\nDario Tonini — Photographe indépendant\nLocalisation : Bordeaux, France",
    "privacy.s3.title": "3. Données collectées",
    "privacy.s3.body": "Le Site ne collecte aucune donnée personnelle de manière active (pas de formulaire d'inscription, pas de compte utilisateur, pas de cookies de tracking publicitaire).\n\nLes données susceptibles d'être collectées de manière passive incluent :\n— Données de navigation : adresse IP, type de navigateur, système d'exploitation, pages consultées, durée de visite (via l'hébergeur ou des outils d'analyse anonymisés).\n— Cookies techniques : strictement nécessaires au fonctionnement du Site (préférence de langue, session).\n\nAucune donnée sensible n'est collectée.",
    "privacy.s4.title": "4. Finalités du traitement",
    "privacy.s4.body": "Les données collectées sont utilisées aux fins suivantes :\n— Assurer le bon fonctionnement technique du Site.\n— Analyser la fréquentation du Site de manière anonyme afin d'en améliorer l'expérience utilisateur.\n— Mémoriser vos préférences linguistiques.\n— Répondre à vos demandes de contact envoyées par email.",
    "privacy.s5.title": "5. Propriété intellectuelle et droit à l'image",
    "privacy.s5.body": "L'ensemble des photographies, textes, éléments graphiques et contenus présents sur le Site sont la propriété exclusive de Dario Tonini, sauf mention contraire. Ils sont protégés par le Code de la propriété intellectuelle (articles L.111-1 et suivants) et par les conventions internationales sur le droit d'auteur.\n\nToute reproduction, représentation, modification, publication, adaptation, totale ou partielle, des éléments du Site, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite préalable de Dario Tonini.\n\nLes photographies présentées peuvent contenir des images de personnes ayant donné leur consentement pour la prise de vue et la diffusion. Toute demande relative au droit à l'image peut être adressée via le bouton de contact disponible sur le site.",
    "privacy.s6.title": "6. Cookies",
    "privacy.s6.body": "Le Site utilise uniquement des cookies techniques essentiels à son fonctionnement (ex. : mémorisation de la langue choisie). Aucun cookie publicitaire ou de tracking tiers n'est déposé.\n\nConformément à la réglementation, les cookies strictement nécessaires ne requièrent pas de consentement préalable. Vous pouvez toutefois configurer votre navigateur pour refuser les cookies.",
    "privacy.s7.title": "7. Partage et transfert de données",
    "privacy.s7.body": "Vos données personnelles ne sont ni vendues, ni louées, ni partagées avec des tiers à des fins commerciales.\n\nElles peuvent être transmises uniquement :\n— À l'hébergeur du Site, dans le cadre de l'exécution technique du service.\n— Aux autorités compétentes, en cas d'obligation légale.",
    "privacy.s8.title": "8. Durée de conservation",
    "privacy.s8.body": "Les données de navigation sont conservées pour une durée maximale de 13 mois conformément aux recommandations de la CNIL. Les cookies techniques expirent à la fermeture du navigateur ou après une durée maximale de 12 mois.",
    "privacy.s9.title": "9. Vos droits",
    "privacy.s9.body": "Conformément au RGPD, vous disposez des droits suivants :\n— Droit d'accès : obtenir la confirmation du traitement de vos données et en recevoir une copie.\n— Droit de rectification : corriger des données inexactes ou incomplètes.\n— Droit à l'effacement : demander la suppression de vos données.\n— Droit à la limitation du traitement : restreindre l'utilisation de vos données.\n— Droit à la portabilité : recevoir vos données dans un format structuré.\n— Droit d'opposition : vous opposer au traitement de vos données.\n\nPour exercer ces droits, veuillez nous contacter via le bouton de contact disponible sur le site.\n\nVous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr.",
    "privacy.s10.title": "10. Sécurité",
    "privacy.s10.body": "Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Le Site utilise le protocole HTTPS pour sécuriser les échanges de données.",
    "privacy.footer": "Pour toute question relative à cette politique de confidentialité, vous pouvez contacter Dario Tonini via le bouton de contact disponible sur le site.",
  },

  en: {
    // Nav
    "nav.home": "Home",
    "nav.work": "Work",
    "nav.about": "About",
    "nav.cta": "Get in touch",

    // Hero
    "hero.bio": "Hi, I'm <bold>Dario</bold>, a <bold>French photographer</bold> turning\nmoments into lasting memories.",
    "hero.sub": "It all starts with a click. Let's talk.",

    // About
    "about.title": "Hey, I'm Dario.",
    "about.intro": "A <bold>french photographer</bold> dedicated to capturing raw emotions and minimalist digital aesthetics.",
    "about.p1": "Through my lens, I explore the quiet beauty of everyday moments, transforming them into powerful visual narratives. My work sits at the intersection of documentary photography and fine art.",
    "about.p2": "Every project is an opportunity to push boundaries and create something that resonates with people. I believe in the power of visual storytelling.",
    "about.email": "Send me an email",
    "about.call": "Call me",
    "about.role.label": "Role",
    "about.role.value": "Photographer",
    "about.location.label": "Location",
    "about.location.value": "France",
    "about.specialties.label": "Specialties",
    "about.specialties.value": "Portrait, Editorial, Fine Art",
    "about.meta.location.label": "[LOCATION]",
    "about.meta.location.value": "Bordeaux, FR",
    "about.meta.discipline.label": "[DISCIPLINE]",
    "about.meta.discipline.value": "Photography",
    "about.meta.contact.label": "[CONTACT]",
    "about.meta.contact.value": "Email",
    "about.bio.primary": "Hi, I'm Dario. A French photographer turning everyday moments into lasting memories.",
    "about.bio.secondary": "Sports, editorial, documentary — visual stories that resonate.",
    "about.tag": "Available for projects",
    "about.cityFR": "Bordeaux — FR",
    "about.pill.aboutMe": "About Me",
    "about.pill.experience": "Experience",
    "about.heading": "Hi, I'm Dario, a French photographer based in South France, available worldwide turning moments into lasting memories.",
    "about.heading.sub": "It all starts with a click. Let's talk.",
    "about.stats.years.value": "4+",
    "about.stats.years.label": "Years of Experience",
    "about.stats.projects.value": "20+",
    "about.stats.projects.label": "Projects Completed",
    "about.stats.clients.value": "10+",
    "about.stats.clients.label": "Satisfied Clients",
    "about.location.line": "Based in South France",
    "about.cta": "Get in touch",
    "about.exp1.company": "Freelance Photography",
    "about.exp1.role": "Founder",
    "about.exp1.years": "2021 — Present",
    "about.exp1.desc": "Building a creative practice around sports, editorial and documentary photography for athletes, brands and publications.",
    "about.exp2.company": "Sports Editorial",
    "about.exp2.role": "Contributor",
    "about.exp2.years": "2022 — Present",
    "about.exp2.desc": "Capturing rugby, football, running and Tour de France stories for sports media outlets across France.",

    // Avatar tooltip
    "avatar.name": "Dario Tonini",
    "avatar.role": "Photographer",

    // Other Projects
    "recentWork.title": "OTHER PROJECTS",
    "recentWork.viewAll": "View all projects",

    // Work
    "work.title": "WORK",
    "work.copyright": "All rights reserved. All photographs on this site are the exclusive property of Dario Tonini and may not be reproduced, distributed, or used in any form without prior written consent.",
    "work.privacy": "Privacy Policy",

    // Project detail
    "project.category": "[CATEGORY]",
    "project.client": "[CLIENT]",
    "project.year": "[YEAR]",
    "project.next": "Next project",

    // Cursor pill
    "cursor.seeProject": "See Project",

    // Footer
    "footer.bio": "Hi, I'm <bold>Dario</bold>, a <bold>french photographer</bold> dedicated to capturing raw emotions and minimalist digital aesthetics.",
    "footer.sub": "I craft visual stories that stand out and resonate.",
    "footer.role": "french photographer",
    "footer.name": "DARIO TONINI",

    // Aria / Alt
    "aria.language": "Change language",
    "aria.instagram": "Instagram",
    "aria.linkedin": "LinkedIn",

    // Project titles
    "project.football.title": "Football",
    "project.travel.title": "Travel",
    "project.rugby.title": "Rugby",
    "project.tourdefrance.title": "Tour de France",
    "project.running.title": "Running",
    "project.otherssports.title": "Other Sports",
    "project.artisanat.title": "Craftsmanship",

    // Project descriptions
    "project.football.desc": "Sports photography capturing the intensity and passion of football.",
    "project.travel.desc": "Travel reportage across the world — landscapes and encounters.",
    "project.rugby.desc": "The raw energy of rugby captured on the field.",
    "project.tourdefrance.desc": "The Tour de France immortalized through effort and tarmac.",
    "project.running.desc": "Athletics in motion — sprints, distance, and street races.",
    "project.otherssports.desc": "An eclectic selection of various sports, from basketball to surfing.",
    "project.artisanat.desc": "Craftsmanship through a photographic lens — materials, gestures and know-how.",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.lastUpdated": "Last updated",
    "privacy.s1.title": "1. Introduction",
    "privacy.s1.body": "This website dariotonini.com (hereinafter \"the Site\") is published by Dario Tonini, an independent photographer based in France. This privacy policy informs you about how your personal data is collected, processed, and protected in accordance with the General Data Protection Regulation (GDPR — EU 2016/679) and applicable French data protection legislation.",
    "privacy.s2.title": "2. Data Controller",
    "privacy.s2.body": "The data controller for personal data is:\nDario Tonini — Independent Photographer\nLocation: Bordeaux, France",
    "privacy.s3.title": "3. Data Collected",
    "privacy.s3.body": "The Site does not actively collect any personal data (no registration forms, no user accounts, no advertising tracking cookies).\n\nData that may be passively collected includes:\n— Browsing data: IP address, browser type, operating system, pages viewed, visit duration (via the hosting provider or anonymized analytics tools).\n— Technical cookies: strictly necessary for the operation of the Site (language preference, session).\n\nNo sensitive data is collected.",
    "privacy.s4.title": "4. Purpose of Processing",
    "privacy.s4.body": "The data collected is used for the following purposes:\n— Ensuring the proper technical operation of the Site.\n— Analyzing Site traffic anonymously to improve user experience.\n— Remembering your language preferences.\n— Responding to contact requests sent via email.",
    "privacy.s5.title": "5. Intellectual Property and Image Rights",
    "privacy.s5.body": "All photographs, texts, graphic elements, and content on the Site are the exclusive property of Dario Tonini, unless otherwise stated. They are protected by the French Intellectual Property Code (articles L.111-1 et seq.) and by international copyright conventions.\n\nAny reproduction, representation, modification, publication, or adaptation, whether total or partial, of any element of the Site, by any means or process, is strictly prohibited without the prior written consent of Dario Tonini.\n\nPhotographs displayed may contain images of individuals who have given their consent for the capture and distribution of their likeness. Any request relating to image rights may be sent using the contact button available on the site.",
    "privacy.s6.title": "6. Cookies",
    "privacy.s6.body": "The Site only uses essential technical cookies required for its operation (e.g., language preference storage). No advertising or third-party tracking cookies are used.\n\nIn accordance with regulations, strictly necessary cookies do not require prior consent. You may, however, configure your browser to refuse cookies.",
    "privacy.s7.title": "7. Data Sharing and Transfers",
    "privacy.s7.body": "Your personal data is not sold, rented, or shared with third parties for commercial purposes.\n\nIt may only be transmitted to:\n— The Site's hosting provider, for the technical execution of the service.\n— Competent authorities, in case of legal obligation.",
    "privacy.s8.title": "8. Data Retention",
    "privacy.s8.body": "Browsing data is retained for a maximum period of 13 months in accordance with CNIL recommendations. Technical cookies expire when the browser is closed or after a maximum period of 12 months.",
    "privacy.s9.title": "9. Your Rights",
    "privacy.s9.body": "Under the GDPR, you have the following rights:\n— Right of access: obtain confirmation of the processing of your data and receive a copy.\n— Right to rectification: correct inaccurate or incomplete data.\n— Right to erasure: request the deletion of your data.\n— Right to restriction of processing: restrict the use of your data.\n— Right to data portability: receive your data in a structured format.\n— Right to object: object to the processing of your data.\n\nTo exercise these rights, please contact us using the contact button available on the site.\n\nYou also have the right to lodge a complaint with the Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr.",
    "privacy.s10.title": "10. Security",
    "privacy.s10.body": "Appropriate technical and organizational measures are implemented to protect your data against unauthorized access, modification, disclosure, or destruction. The Site uses the HTTPS protocol to secure data exchanges.",
    "privacy.footer": "For any questions regarding this privacy policy, you may contact Dario Tonini using the contact button available on the site.",
  },

  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.work": "Trabajos",
    "nav.about": "Sobre mí",
    "nav.cta": "Contacto",

    // Hero
    "hero.bio": "Hola, soy <bold>Dario</bold>, <bold>fotógrafo francés</bold> que transforma momentos\nen recuerdos duraderos. <bold>Disponible en toda España.</bold>",
    "hero.sub": "Todo comienza con un clic. Hablemos.",

    // About
    "about.title": "Hola, soy Dario.",
    "about.intro": "Un <bold>fotógrafo francés</bold> dedicado a capturar emociones puras y estéticas digitales minimalistas.",
    "about.p1": "A través de mi objetivo, exploro la belleza discreta de los momentos cotidianos, transformándolos en narrativas visuales poderosas. Mi trabajo se sitúa en la intersección de la fotografía documental y el arte.",
    "about.p2": "Cada proyecto es una oportunidad para superar límites y crear algo que resuene con la gente. Creo en el poder de la narrativa visual.",
    "about.email": "Envíame un email",
    "about.call": "Llámame",
    "about.role.label": "Rol",
    "about.role.value": "Fotógrafo",
    "about.location.label": "Ubicación",
    "about.location.value": "Francia",
    "about.specialties.label": "Especialidades",
    "about.specialties.value": "Retrato, Editorial, Arte",
    "about.meta.location.label": "[UBICACIÓN]",
    "about.meta.location.value": "Bordeaux, FR",
    "about.meta.discipline.label": "[DISCIPLINA]",
    "about.meta.discipline.value": "Fotografía",
    "about.meta.contact.label": "[CONTACTO]",
    "about.meta.contact.value": "Email",
    "about.bio.primary": "Hola, soy Dario. Fotógrafo francés que convierte momentos en recuerdos duraderos.",
    "about.bio.secondary": "Deporte, editorial, documental — historias visuales que resuenan.",
    "about.tag": "Disponible para proyectos",
    "about.cityFR": "Bordeaux — FR",
    "about.pill.aboutMe": "Sobre mí",
    "about.pill.experience": "Experiencia",
    "about.heading": "Hola, soy Dario, fotógrafo francés con base en el sur de Francia, disponible en todo el mundo para transformar proyectos en recuerdos duraderos.",
    "about.heading.sub": "Todo comienza con un clic. Hablemos.",
    "about.stats.years.value": "4+",
    "about.stats.years.label": "Años de experiencia",
    "about.stats.projects.value": "20+",
    "about.stats.projects.label": "Proyectos completados",
    "about.stats.clients.value": "10+",
    "about.stats.clients.label": "Clientes satisfechos",
    "about.location.line": "Con base en el sur de Francia",
    "about.cta": "Contáctame",
    "about.exp1.company": "Fotografía Freelance",
    "about.exp1.role": "Fundador",
    "about.exp1.years": "2021 — Presente",
    "about.exp1.desc": "Desarrollo una práctica creativa alrededor de la fotografía deportiva, editorial y documental para atletas, marcas y publicaciones.",
    "about.exp2.company": "Editorial Deportivo",
    "about.exp2.role": "Colaborador",
    "about.exp2.years": "2022 — Presente",
    "about.exp2.desc": "Cobertura de rugby, fútbol, atletismo y Tour de Francia para medios deportivos en toda Francia.",

    // Avatar tooltip
    "avatar.name": "Dario Tonini",
    "avatar.role": "Fotógrafo",

    // Other Projects
    "recentWork.title": "OTROS PROYECTOS",
    "recentWork.viewAll": "Ver todos los proyectos",

    // Work
    "work.title": "TRABAJO",
    "work.copyright": "Todos los derechos reservados. Todas las fotografías de este sitio son propiedad exclusiva de Dario Tonini y no pueden ser reproducidas, distribuidas ni utilizadas de ninguna forma sin el consentimiento previo por escrito.",
    "work.privacy": "Política de privacidad",

    // Project detail
    "project.category": "[CATEGORÍA]",
    "project.client": "[CLIENTE]",
    "project.year": "[AÑO]",
    "project.next": "Siguiente proyecto",

    // Cursor pill
    "cursor.seeProject": "Ver proyecto",

    // Footer
    "footer.bio": "Hola, soy <bold>Dario</bold>, un <bold>fotógrafo francés</bold> dedicado a capturar emociones puras y estéticas digitales minimalistas.",
    "footer.sub": "Creo historias visuales que destacan y resuenan.",
    "footer.role": "fotógrafo francés",
    "footer.name": "DARIO TONINI",

    // Aria / Alt
    "aria.language": "Cambiar idioma",
    "aria.instagram": "Instagram",
    "aria.linkedin": "LinkedIn",

    // Project titles
    "project.football.title": "Fútbol",
    "project.travel.title": "Viaje",
    "project.rugby.title": "Rugby",
    "project.tourdefrance.title": "Tour de Francia",
    "project.running.title": "Running",
    "project.otherssports.title": "Otros Deportes",
    "project.artisanat.title": "Artesanía",

    // Project descriptions
    "project.football.desc": "Fotografía deportiva capturando la intensidad y pasión del fútbol.",
    "project.travel.desc": "Reportaje de viajes por el mundo — paisajes y encuentros.",
    "project.rugby.desc": "La energía bruta del rugby capturada en el campo.",
    "project.tourdefrance.desc": "El Tour de Francia inmortalizado a través del esfuerzo y el asfalto.",
    "project.running.desc": "Atletismo en movimiento — sprints, fondo y carreras callejeras.",
    "project.otherssports.desc": "Una selección ecléctica de deportes variados, del baloncesto al surf.",
    "project.artisanat.desc": "La artesanía bajo una mirada fotográfica — materiales, gestos y saber hacer.",

    // Privacy Policy
    "privacy.title": "Política de privacidad",
    "privacy.lastUpdated": "Última actualización",
    "privacy.s1.title": "1. Introducción",
    "privacy.s1.body": "Este sitio web dariotonini.com (en adelante \"el Sitio\") es publicado por Dario Tonini, fotógrafo independiente con sede en Francia. Esta política de privacidad tiene como objetivo informarle sobre cómo se recopilan, procesan y protegen sus datos personales de conformidad con el Reglamento General de Protección de Datos (RGPD — UE 2016/679) y la legislación francesa aplicable en materia de protección de datos.",
    "privacy.s2.title": "2. Responsable del tratamiento",
    "privacy.s2.body": "El responsable del tratamiento de datos personales es:\nDario Tonini — Fotógrafo independiente\nUbicación: Bordeaux, Francia",
    "privacy.s3.title": "3. Datos recopilados",
    "privacy.s3.body": "El Sitio no recopila activamente datos personales (sin formularios de registro, sin cuentas de usuario, sin cookies de seguimiento publicitario).\n\nLos datos que pueden recopilarse de forma pasiva incluyen:\n— Datos de navegación: dirección IP, tipo de navegador, sistema operativo, páginas visitadas, duración de la visita (a través del proveedor de alojamiento o herramientas de análisis anonimizadas).\n— Cookies técnicas: estrictamente necesarias para el funcionamiento del Sitio (preferencia de idioma, sesión).\n\nNo se recopilan datos sensibles.",
    "privacy.s4.title": "4. Finalidades del tratamiento",
    "privacy.s4.body": "Los datos recopilados se utilizan para los siguientes fines:\n— Garantizar el correcto funcionamiento técnico del Sitio.\n— Analizar el tráfico del Sitio de forma anónima para mejorar la experiencia del usuario.\n— Recordar sus preferencias de idioma.\n— Responder a solicitudes de contacto enviadas por correo electrónico.",
    "privacy.s5.title": "5. Propiedad intelectual y derechos de imagen",
    "privacy.s5.body": "Todas las fotografías, textos, elementos gráficos y contenidos del Sitio son propiedad exclusiva de Dario Tonini, salvo indicación contraria. Están protegidos por el Código de Propiedad Intelectual francés (artículos L.111-1 y siguientes) y por las convenciones internacionales sobre derechos de autor.\n\nQueda estrictamente prohibida cualquier reproducción, representación, modificación, publicación o adaptación, total o parcial, de cualquier elemento del Sitio, por cualquier medio o procedimiento, sin la autorización escrita previa de Dario Tonini.\n\nLas fotografías mostradas pueden contener imágenes de personas que han dado su consentimiento para la captura y difusión de su imagen. Cualquier solicitud relativa a los derechos de imagen puede realizarse mediante el botón de contacto disponible en el sitio.",
    "privacy.s6.title": "6. Cookies",
    "privacy.s6.body": "El Sitio utiliza únicamente cookies técnicas esenciales para su funcionamiento (ej.: almacenamiento de la preferencia de idioma). No se utilizan cookies publicitarias ni de seguimiento de terceros.\n\nDe conformidad con la normativa, las cookies estrictamente necesarias no requieren consentimiento previo. No obstante, puede configurar su navegador para rechazar las cookies.",
    "privacy.s7.title": "7. Intercambio y transferencia de datos",
    "privacy.s7.body": "Sus datos personales no se venden, alquilan ni comparten con terceros con fines comerciales.\n\nSolo pueden transmitirse a:\n— El proveedor de alojamiento del Sitio, para la ejecución técnica del servicio.\n— Las autoridades competentes, en caso de obligación legal.",
    "privacy.s8.title": "8. Conservación de datos",
    "privacy.s8.body": "Los datos de navegación se conservan durante un período máximo de 13 meses conforme a las recomendaciones de la CNIL. Las cookies técnicas expiran al cerrar el navegador o tras un período máximo de 12 meses.",
    "privacy.s9.title": "9. Sus derechos",
    "privacy.s9.body": "En virtud del RGPD, usted dispone de los siguientes derechos:\n— Derecho de acceso: obtener la confirmación del tratamiento de sus datos y recibir una copia.\n— Derecho de rectificación: corregir datos inexactos o incompletos.\n— Derecho de supresión: solicitar la eliminación de sus datos.\n— Derecho a la limitación del tratamiento: restringir el uso de sus datos.\n— Derecho a la portabilidad: recibir sus datos en un formato estructurado.\n— Derecho de oposición: oponerse al tratamiento de sus datos.\n\nPara ejercer estos derechos, contáctenos mediante el botón de contacto disponible en el sitio.\n\nTambién tiene derecho a presentar una reclamación ante la Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr.",
    "privacy.s10.title": "10. Seguridad",
    "privacy.s10.body": "Se implementan medidas técnicas y organizativas apropiadas para proteger sus datos contra el acceso no autorizado, modificación, divulgación o destrucción. El Sitio utiliza el protocolo HTTPS para asegurar los intercambios de datos.",
    "privacy.footer": "Para cualquier consulta relativa a esta política de privacidad, puede contactar a Dario Tonini mediante el botón de contacto disponible en el sitio.",
  },
};
