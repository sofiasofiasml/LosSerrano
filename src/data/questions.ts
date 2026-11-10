export type QuestionDifficulty = 'clasica' | 'experta';

export interface QuizQuestion {
  id: number;
  text: string;
  didHappen: boolean; // true = SÍ PASÓ, false = NO PASÓ
  difficulty: QuestionDifficulty;
  episode: string;
  character: string;
  characterRole: string;
  explanation: string;
  polaroidCaption: string;
  localImage: string;
  secondaryRealPhoto?: string;
  badgeIcon: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Santiago llega a pensar que es homosexual después de que un viejo amigo le confiese que lo es.',
    didHappen: true,
    difficulty: 'clasica',
    episode: 'Temporada 1, Cap. 6 · «Cien maneras de cocinar la trucha»',
    character: 'Santiago Serrano',
    characterRole: 'Co-propietario de la Taberna Hermanos Serrano',
    explanation:
      '¡SÍ PASÓ! Pepe, un viejo amigo de toda la vida de Santi, visita Santa Justa y le confiesa que es homosexual (y que de jóvenes estuvo enamorado de él). A Santi le entra tal crisis existencial que empieza a hacer tests en revistas femeninas para comprobar su masculinidad.',
    polaroidCaption: 'Santiago Serrano (Jesús Bonilla)',
    localImage: 'images/real/wiki-Jes_s_Bonilla.jpg',
    secondaryRealPhoto: 'images/real/crop-santi-barra.jpg',
    badgeIcon: '🍺',
  },
  {
    id: 2,
    text: 'Guille entrega por error un test de inteligencia que pertenecía a otro alumno y todos creen que es superdotado.',
    didHappen: true,
    difficulty: 'clasica',
    episode: 'Temporada 1, Cap. 9 · «Superdotado»',
    character: 'Guille Serrano',
    characterRole: 'Líder de Santa Justa Klan y terror del Garcilaso',
    explanation:
      '¡SÍ PASÓ! En el Colegio Garcilaso realizan un test de coeficiente intelectual. Por un cambiazo de exámenes con el empollón de la clase, Guille obtiene un CI de 142 y el psicólogo cita a Diego y Lucía para anunciarles que tienen un hijo superdotado.',
    polaroidCaption: 'Guille y Teté frente a la pizarra del Garcilaso',
    localImage: 'images/real/crop-guille-tete.jpg',
    secondaryRealPhoto: 'images/real/crop-marcos-guille-diego.jpg',
    badgeIcon: '🧠',
  },
  {
    id: 3,
    text: 'Teté se escapa de casa para ir a un concierto de Ricky Martin.',
    didHappen: false,
    difficulty: 'clasica',
    episode: 'Trama inventada · ¡Trampa cazafans!',
    character: 'Teté Capdevila',
    characterRole: 'Voz de SJK y reina del drama adolescente',
    explanation:
      '¡NO PASÓ! Nos lo hemos inventado. Teté sí protagonizó escapadas nocturnas a discotecas (como en «La noche del loro» con Richi) y dio conciertos con Santa Justa Klan («A toda mecha»), ¡pero jamás se fugó de casa para ver a Ricky Martin!',
    polaroidCaption: 'Teté junto a Eva y Curro en casa de los Serrano',
    localImage: 'images/real/crop-tete-eva.jpg',
    secondaryRealPhoto: 'images/real/crop-jovenes-garcilaso.jpg',
    badgeIcon: '🎤',
  },
  {
    id: 4,
    text: 'Fiti compra un perfume con feromonas de ñu para recuperar la pasión con Candela.',
    didHappen: true,
    difficulty: 'clasica',
    episode: 'Temporada 3, Cap. 39 · «Nunca subestimes el poder del ñu»',
    character: 'Fructuoso «Fiti» Martínez',
    characterRole: 'Jefe de Fiti Motor y filósofo de barra',
    explanation:
      '¡SÍ PASÓ! Es uno de los momentos más legendarios de toda la serie. Desesperado por la apatía en su matrimonio con Candela, Fiti compra un espray afrodisíaco elaborado con hormonas de ñu africano y la persigue olfateando por toda la casa.',
    polaroidCaption: 'Fructuoso «Fiti» Martínez (Antonio Molero)',
    localImage: 'images/real/tvmaze-8.jpg',
    secondaryRealPhoto: 'images/real/crop-fiti-diego-taberna.jpg',
    badgeIcon: '🐃',
  },
  {
    id: 5,
    text: 'Diego y Fiti participan en un concurso de baile para ganar un viaje a Cuba.',
    didHappen: false,
    difficulty: 'clasica',
    episode: 'Trama inventada · ¡Bulo de la Taberna!',
    character: 'Diego y Fiti',
    characterRole: 'Inseparables desde parvulario',
    explanation:
      '¡NO PASÓ! Aunque Diego y Fiti se metieron en mil líos absurdos (viajes a Marruecos, rallys, timos, partidas de mus y hasta grabaciones caseras), nunca concursaron juntos como pareja de baile para ganar un viaje a La Habana.',
    polaroidCaption: 'Fiti y Diego juntos en la Taberna Serrano',
    localImage: 'images/real/crop-fiti-diego-taberna.jpg',
    secondaryRealPhoto: 'images/real/tvmaze-9.jpg',
    badgeIcon: '💃',
  },
  {
    id: 6,
    text: 'Diego sufre un infarto cuando Marcos y Eva le confiesan que están enamorados.',
    didHappen: true,
    difficulty: 'clasica',
    episode: 'Temporada 3, Cap. 35 · «Corazón partío»',
    character: 'Diego Serrano',
    characterRole: 'Patriarca y guardián de la escobilla',
    explanation:
      '¡SÍ PASÓ! Cuando por fin descubre que Marcos y Eva mantienen un romance secreto bajo su mismo techo («¡incesto, mirada sucia!»), a Diego le da un ataque al corazón y termina ingresado en el hospital.',
    polaroidCaption: 'Diego Serrano (Antonio Resines) con la mirada sucia',
    localImage: 'images/real/tvmaze-9.jpg',
    secondaryRealPhoto: 'images/real/article-4.jpg',
    badgeIcon: '💔',
  },
  {
    id: 7,
    text: 'Marcos y Eva llegan a casarse en Las Vegas sin que sus familias lo sepan.',
    didHappen: false,
    difficulty: 'clasica',
    episode: 'Trama inventada · Ni Elvis ofició esa boda',
    character: 'Marcos y Eva',
    characterRole: 'La pareja del «1 más 1 son 7»',
    explanation:
      '¡NO PASÓ! Marcos y Eva tuvieron un intento de boda caótico en España (en el capítulo «De Santa Justa a Bilbao») y más tarde se fueron a vivir juntos a Toulouse con su hija Cloe, pero jamás se casaron en Las Vegas.',
    polaroidCaption: 'Eva Capdevila (Verónica Sánchez) y Marcos (Fran Perea)',
    localImage: 'images/real/tvmaze-10.jpg',
    secondaryRealPhoto: 'images/real/article-0.jpg',
    badgeIcon: '🎸',
  },
  {
    id: 8,
    text: 'Candela acude a una comida exclusiva en la que está David Beckham.',
    didHappen: true,
    difficulty: 'clasica',
    episode: 'Temporada 3, Cap. 35 · «Corazón partío»',
    character: 'Candela y Lucía',
    characterRole: 'Íntimas amigas y profesoras del Garcilaso',
    explanation:
      '¡SÍ PASÓ! En plena época de los Galácticos del Real Madrid, Candela es invitada a un almuerzo oficial junto a la Ministra de Cultura al que asiste el mismísimo David Beckham. Lucía se muere de envidia porque su mejor amiga se lo oculta para no llevarla.',
    polaroidCaption: 'Lucía Gómez (Belén Rueda) en el Colegio Garcilaso',
    localImage: 'images/real/tvmaze-6.jpg',
    secondaryRealPhoto: 'images/real/article-2.jpg',
    badgeIcon: '⚽',
  },
  {
    id: 9,
    text: 'Santiago busca novia a través de un catálogo de mujeres extranjeras.',
    didHappen: true,
    difficulty: 'clasica',
    episode: 'Temporada 3, Cap. 39 · «Nunca subestimes el poder del ñu»',
    character: 'Santiago Serrano',
    characterRole: 'Soltero de oro de La Alcarria',
    explanation:
      '¡SÍ PASÓ! Harto de estar solo antes de su noviazgo con Lourditas, Santi recurre a una agencia matrimonial con un catálogo de mujeres rusas, generando todo tipo de malentendidos en la taberna.',
    polaroidCaption: 'Santi junto a Doña Carmen y Boliche en la Taberna',
    localImage: 'images/real/crop-santi-barra.jpg',
    secondaryRealPhoto: 'images/real/wiki-Jes_s_Bonilla.jpg',
    badgeIcon: '💌',
  },
  {
    id: 10,
    text: 'Al final de la serie descubrimos que todo había sido un sueño de Diego.',
    didHappen: true,
    difficulty: 'clasica',
    episode: 'Temporada 8, Cap. 147 · «Desmontando a Diego»',
    character: 'Diego Serrano',
    characterRole: 'El hombre con la siesta más larga de España',
    explanation:
      '¡SÍ PASÓ! El final más comentado de la historia de la TV en España. Desesperado porque cree haber perdido a su familia, Diego salta desde un puente y despierta junto a Lucía la mañana después de su boda del Capítulo 1. ¡Ocho temporadas fueron un sueño!',
    polaroidCaption: 'Fotograma real de Diego despertando del sueño (Cap. 147)',
    localImage: 'images/real/article-3.jpg',
    secondaryRealPhoto: 'images/real/crop-boda-diego-lucia.jpg',
    badgeIcon: '🛌',
  },

  // --- PREGUNTAS EXTRA MÁS COMPLICADAS (NIVEL EXPERTO SANTA JUSTA) ---
  {
    id: 11,
    text: 'Diego descubre en el diario de su madre que su verdadero padre biológico podría ser un vendedor de aceitunas apodado «El Aceituno», al que Santi de niño le cambió el cerdo familiar por una bicicleta.',
    didHappen: true,
    difficulty: 'experta',
    episode: 'Temporada 2, Cap. 19 · «El quinto sentido»',
    character: 'Diego, Santi y «El Aceituno»',
    characterRole: 'Secretos inconfesables de La Alcarria',
    explanation:
      '¡SÍ PASÓ! Al leer el diario de su difunta madre doña Francisca, Diego descubre que tuvo un romance con Pablo Prieto «El Aceituno» y entra en pánico pensando que no es un auténtico Serrano. Además, Santi confiesa que de niños le cambió al Aceituno el cerdo «Fausto» por una bici.',
    polaroidCaption: 'Los hermanos Serrano y la familia al completo',
    localImage: 'images/real/article-4.jpg',
    secondaryRealPhoto: 'images/real/tvmaze-4.jpg',
    badgeIcon: '🫒',
  },
  {
    id: 12,
    text: 'Santiago pierde la Taberna Hermanos Serrano apostándose las escrituras en una partida clandestina de póker contra un usurero apodado «El Carnicero de Chamberí».',
    didHappen: false,
    difficulty: 'experta',
    episode: 'Trampa Nivel Experto · ¡Fue en la Bolsa, no al póker!',
    character: 'Santiago Serrano',
    characterRole: 'Tesorero financiero de dudosa reputación',
    explanation:
      '¡NO PASÓ ASÍ! Pregunta trampa de nota: Santiago SÍ arruinó a la familia y perdió la taberna (en el final de la Temporada 4 / inicio de la 5), pero fue por hipotecar el bar e invertir todo el dinero en la Bolsa dejándose engañar por un tiburón financiero, ¡no en una timba contra ningún Carnicero!',
    polaroidCaption: 'El reparto reunido en la Taberna Hermanos Serrano',
    localImage: 'images/real/tvmaze-2.jpg',
    secondaryRealPhoto: 'images/real/crop-santi-barra.jpg',
    badgeIcon: '🃏',
  },
  {
    id: 13,
    text: 'En la primera temporada, el actor José Coronado aparece interpretando a un inspector de policía, y el periodista deportivo José Ramón de la Morena hace un cameo en la taberna.',
    didHappen: true,
    difficulty: 'experta',
    episode: 'Temporada 1, Cap. 2 («Un padre perfecto») y Cap. 10 («El Rey y yo»)',
    character: 'Cameos en Santa Justa',
    characterRole: 'Visitas ilustres a la primera temporada',
    explanation:
      '¡SÍ PASÓ! En el segundo episodio aparece José Ramón de la Morena por la afición futbolera de Diego (presidente del Santa Justa F.C.), y en el episodio 10 José Coronado interpreta a Luis Sanz. También hicieron cameos Risto Meijide, Alaska y Alfredo Landa.',
    polaroidCaption: 'Los Serrano en su primera temporada (2003)',
    localImage: 'images/real/crop-boda-diego-lucia.jpg',
    secondaryRealPhoto: 'images/real/article-0.jpg',
    badgeIcon: '🌟',
  },
  {
    id: 14,
    text: 'En las últimas temporadas, Raúl descubre de imprevisto que es padre biológico de un niño pequeño llamado Adrián, fruto de un antiguo affaire.',
    didHappen: true,
    difficulty: 'experta',
    episode: 'Temporada 7 · Trama de Raúl y el pequeño Adrián',
    character: 'Raúl Martínez',
    characterRole: 'Hijo de Fiti y eterno amor de África',
    explanation:
      '¡SÍ PASÓ! Una antigua conquista de Raúl aparece por sorpresa en Santa Justa y le deja a su cargo al pequeño Adrián Martínez, convirtiendo a Raúl en padre de golpe y a Fiti en abuelo.',
    polaroidCaption: 'Raúl Martínez (Alejo Sauras) en Los Serrano',
    localImage: 'images/real/tvmaze-7.jpg',
    secondaryRealPhoto: 'images/real/crop-jovenes-garcilaso.jpg',
    badgeIcon: '👶',
  },
  {
    id: 15,
    text: 'Para salvar el taller de Fiti del embargo municipal, Diego, Santiago y Fiti posan desnudos en un calendario benéfico del barrio al estilo «Full Monty».',
    didHappen: false,
    difficulty: 'experta',
    episode: 'Trampa Nivel Experto · ¡Demasiado para la mirada sucia!',
    character: 'El Trío de Santa Justa',
    characterRole: 'Diego, Santi y Fiti al límite',
    explanation:
      '¡NO PASÓ! Aunque vimos a Diego, Santi y Fiti disfrazados de mil maneras ridículas y pasando vergüenza ajena en el barrio, jamás llegaron a publicar un calendario desnudos para salvar el taller mecánico de Fiti.',
    polaroidCaption: 'Los Serrano en el mítico salón familiar',
    localImage: 'images/real/article-2.jpg',
    secondaryRealPhoto: 'images/real/crop-fiti-diego-taberna.jpg',
    badgeIcon: '📸',
  },
  {
    id: 16,
    text: 'Choni (la hermana de José Luis y gran amor de Fiti) entra a trabajar en el Colegio Garcilaso como bedel y acaba dirigiendo los espectáculos musicales gracias a su pasado de vedette de revista.',
    didHappen: true,
    difficulty: 'experta',
    episode: 'Temporadas 5 a 8 · María Asunción «Choni» Martínez',
    character: 'Choni (Pepa Aniorte)',
    characterRole: 'Ex vedette, bedel del Garcilaso y huracán de Santa Justa',
    explanation:
      '¡SÍ PASÓ! Choni aterriza en Santa Justa como un torbellino, conquista a Fiti y consigue puesto de bedel en el Colegio Garcilaso, donde aprovecha su pasado artístico para montar números musicales inolvidables.',
    polaroidCaption: 'Lourditas, Choni y Fiti en la Taberna',
    localImage: 'images/real/crop-choni-fiti.jpg',
    secondaryRealPhoto: 'images/real/tvmaze-2.jpg',
    badgeIcon: '💃',
  },
];

export interface ScoreRank {
  minRatio: number;
  title: string;
  subtitle: string;
  badge: string;
  resinesQuote: string;
}

export const SCORE_RANKS: ScoreRank[] = [
  {
    minRatio: 0.9,
    title: '¡1 más 1 son 7! Patriarca de Honor de Santa Justa',
    subtitle: 'Irina se sabe Los Serrano mejor que el propio Antonio Resines.',
    badge: '👑 Jamón de Oro Ibérico',
    resinesQuote: '«¡Córcholis, Irina! ¡Ni con la escobilla en la mano te pillo en un renuncio! Te mereces caña y tapa gratis de por vida en la Taberna Hermanos Serrano.»',
  },
  {
    minRatio: 0.7,
    title: 'Socia VIP de la Taberna Hermanos Serrano',
    subtitle: 'Dominas las tramas del barrio, aunque algún sueño de Resines te ha despistado.',
    badge: '🍺 Caña Maestra y Pincho de Tortilla',
    resinesQuote: '«¡Muy bien jugado! Se nota que has desayunado zumo y churros viendo la serie, aunque alguna preguntita experta te ha hecho dudar con la mirada sucia.»',
  },
  {
    minRatio: 0.45,
    title: 'Aprendiz en el Taller de Fiti Motor',
    subtitle: 'Te suenan los grandes éxitos, pero Fiti te ha colado un par de trolas con feromonas de ñu.',
    badge: '🔧 Llave Inglesa de Fiti',
    resinesQuote: '«A ver, Irina... aprobar apruebas por los pelos, como Guille cuando dio el cambiazo en el test de inteligencia. ¡Menos mal que todo puede ser un sueño!»',
  },
  {
    minRatio: 0,
    title: '¡Con la Mirada Sucia! Víctima del Sueño de Resines',
    subtitle: 'Parece que te quedaste dormida en el Capítulo 1 igual que Diego Serrano.',
    badge: '🪥 Escobillazo de Diego',
    resinesQuote: '«¡Pero esto qué es! ¡Me va a dar un parraque como con lo de Marcos y Eva! Rápido, pulsa el botón de "Marcarse un Resines" y di que estos fallos han sido un sueño...»',
  },
];
