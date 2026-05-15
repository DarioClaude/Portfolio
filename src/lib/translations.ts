export type Lang = "fr" | "en" | "es";

export const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.work": "Projets",
    "nav.about": "À propos",
    "nav.cta": "Me contacter",

    // Hero
    "hero.bio": "Salut, je suis <bold>Dario</bold>, photographe français\nbasé dans le Sud, <bold>disponible pour tous vos projets</bold>.",
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
    "about.heading": "Salut, je suis Dario, photographe français basé dans le Sud de la France, disponible partout dans le monde pour transformer vos moments en souvenirs durables.",
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

    // Work
    "work.title": "WORK",
    "work.copyright": "©21 — 26",

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

    // Project descriptions
    "project.football.desc": "Photographie sportive capturant l'intensité et la passion du football.",
    "project.travel.desc": "Reportage de voyage à travers le monde, des paysages aux rencontres.",
    "project.rugby.desc": "L'énergie brute du rugby saisie sur le terrain.",
    "project.tourdefrance.desc": "Le Tour de France immortalisé à travers l'effort et l'asphalte.",
    "project.running.desc": "L'athlétisme en mouvement — sprint, fond et courses de rue.",
    "project.otherssports.desc": "Une sélection éclectique de sports variés, du basket au surf.",
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

    // Work
    "work.title": "WORK",
    "work.copyright": "©21 — 26",

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

    // Project descriptions
    "project.football.desc": "Sports photography capturing the intensity and passion of football.",
    "project.travel.desc": "Travel reportage across the world — landscapes and encounters.",
    "project.rugby.desc": "The raw energy of rugby captured on the field.",
    "project.tourdefrance.desc": "The Tour de France immortalized through effort and tarmac.",
    "project.running.desc": "Athletics in motion — sprints, distance, and street races.",
    "project.otherssports.desc": "An eclectic selection of various sports, from basketball to surfing.",
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
    "about.heading": "Hola, soy Dario, fotógrafo francés con base en el sur de Francia, disponible en todo el mundo para transformar momentos en recuerdos duraderos.",
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

    // Work
    "work.title": "TRABAJO",
    "work.copyright": "©21 — 26",

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

    // Project descriptions
    "project.football.desc": "Fotografía deportiva capturando la intensidad y pasión del fútbol.",
    "project.travel.desc": "Reportaje de viajes por el mundo — paisajes y encuentros.",
    "project.rugby.desc": "La energía bruta del rugby capturada en el campo.",
    "project.tourdefrance.desc": "El Tour de Francia inmortalizado a través del esfuerzo y el asfalto.",
    "project.running.desc": "Atletismo en movimiento — sprints, fondo y carreras callejeras.",
    "project.otherssports.desc": "Una selección ecléctica de deportes variados, del baloncesto al surf.",
  },
};
