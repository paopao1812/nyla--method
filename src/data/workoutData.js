export const WEEKS = Array.from({ length: 8 }, (_, i) => i + 1)

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

export const AFFIRMATIONS = [
  'Mi cuerpo no es mi enemigo. Es mi aliado más fiel.',
  'Cada repetición es una promesa que me cumplo.',
  'No busco la perfección. Busco la presencia.',
  'Soy más fuerte de lo que creo y más valiente de lo que siento.',
  'El progreso, no la perfección, es mi meta.',
  'Me elijo a mí misma cada vez que entreno.',
  'Mi constancia es mi superpoder.',
  'Cada día que aparezco es una victoria.',
]

export const WORKOUT_PLAN = {
  Lunes: {
    label: 'Tren Superior',
    activation: [
      { name: 'Rotación de hombros', sets: 2, reps: '15 reps' },
      { name: 'Círculos de brazos', sets: 2, reps: '30 seg' },
      { name: 'Cat-Cow', sets: 2, reps: '10 reps' },
    ],
    main: [
      { name: 'Press de hombro', sets: 4, reps: '12 reps', weight: 0 },
      { name: 'Remo con mancuerna', sets: 4, reps: '10 reps', weight: 0 },
      { name: 'Curl de bíceps', sets: 3, reps: '12 reps', weight: 0 },
      { name: 'Extensión de tríceps', sets: 3, reps: '15 reps', weight: 0 },
      { name: 'Elevaciones laterales', sets: 3, reps: '15 reps', weight: 0 },
    ],
    core: [
      { name: 'Plancha', sets: 3, reps: '30 seg' },
      { name: 'Crunches', sets: 3, reps: '15 reps' },
      { name: 'Tijeras', sets: 3, reps: '20 reps' },
    ],
    cardio: '15 min caminata rápida o bicicleta estática',
  },
  Martes: {
    label: 'Tren Inferior',
    activation: [
      { name: 'Sentadilla sin peso', sets: 2, reps: '10 reps' },
      { name: 'Hip circles', sets: 2, reps: '10 cada lado' },
      { name: 'Glute bridge sin peso', sets: 2, reps: '15 reps' },
    ],
    main: [
      { name: 'Sentadilla con mancuernas', sets: 4, reps: '12 reps', weight: 0 },
      { name: 'Peso muerto rumano', sets: 4, reps: '10 reps', weight: 0 },
      { name: 'Glute bridge con peso', sets: 4, reps: '15 reps', weight: 0 },
      { name: 'Zancadas', sets: 3, reps: '12 cada pierna', weight: 0 },
      { name: 'Abducción de cadera', sets: 3, reps: '20 reps', weight: 0 },
    ],
    core: [
      { name: 'Dead bug', sets: 3, reps: '10 cada lado' },
      { name: 'Plancha lateral', sets: 3, reps: '20 seg cada lado' },
      { name: 'Elevación de piernas', sets: 3, reps: '12 reps' },
    ],
    cardio: '15 min elíptica o salto de cuerda suave',
  },
  Miércoles: {
    label: 'Cuerpo Completo',
    activation: [
      { name: 'Jumping jacks suaves', sets: 1, reps: '30 seg' },
      { name: 'Rotación de torso', sets: 2, reps: '10 cada lado' },
      { name: 'Estiramiento de cadena posterior', sets: 2, reps: '30 seg' },
    ],
    main: [
      { name: 'Sentadilla + press', sets: 4, reps: '10 reps', weight: 0 },
      { name: 'Remo + zancada', sets: 3, reps: '10 cada lado', weight: 0 },
      { name: 'Push-up modificado', sets: 3, reps: '12 reps', weight: 0 },
      { name: 'Peso muerto + encogimiento', sets: 3, reps: '12 reps', weight: 0 },
    ],
    core: [
      { name: 'Plancha con toque de hombro', sets: 3, reps: '10 cada lado' },
      { name: 'Russian twist', sets: 3, reps: '20 reps' },
      { name: 'Hollow hold', sets: 3, reps: '20 seg' },
    ],
    cardio: '20 min caminata inclinada',
  },
  Jueves: {
    label: 'Glúteos y Piernas',
    activation: [
      { name: 'Clamshell', sets: 2, reps: '15 cada lado' },
      { name: 'Donkey kicks sin peso', sets: 2, reps: '15 cada lado' },
      { name: 'Estiramiento de flexores', sets: 2, reps: '30 seg cada lado' },
    ],
    main: [
      { name: 'Hip thrust', sets: 4, reps: '15 reps', weight: 0 },
      { name: 'Sentadilla sumo', sets: 4, reps: '12 reps', weight: 0 },
      { name: 'Patada de glúteo en polea', sets: 3, reps: '15 cada lado', weight: 0 },
      { name: 'Step up con mancuerna', sets: 3, reps: '12 cada pierna', weight: 0 },
      { name: 'Curl de isquio', sets: 3, reps: '12 reps', weight: 0 },
    ],
    core: [
      { name: 'Plancha', sets: 3, reps: '40 seg' },
      { name: 'Bird dog', sets: 3, reps: '10 cada lado' },
      { name: 'Crunch inverso', sets: 3, reps: '15 reps' },
    ],
    cardio: '10 min HIIT suave (20 seg trabajo / 40 seg descanso)',
  },
  Viernes: {
    label: 'Full Body + Movilidad',
    activation: [
      { name: 'World greatest stretch', sets: 2, reps: '5 cada lado' },
      { name: 'Inchworm', sets: 2, reps: '6 reps' },
      { name: 'Rotación de cadera en cuadrupedia', sets: 2, reps: '10 cada lado' },
    ],
    main: [
      { name: 'Sentadilla goblet', sets: 3, reps: '12 reps', weight: 0 },
      { name: 'Press de pecho con mancuernas', sets: 3, reps: '12 reps', weight: 0 },
      { name: 'Peso muerto con mancuernas', sets: 3, reps: '10 reps', weight: 0 },
      { name: 'Arnold press', sets: 3, reps: '10 reps', weight: 0 },
    ],
    core: [
      { name: 'Plancha lateral con rotación', sets: 3, reps: '8 cada lado' },
      { name: 'Pallof press', sets: 3, reps: '12 cada lado' },
      { name: 'Dead bug', sets: 3, reps: '8 cada lado' },
    ],
    cardio: '20 min yoga o estiramientos guiados',
  },
}

export const CYCLE_PHASES = [
  {
    name: 'Menstrual',
    days: 'Días 1–5',
    icon: '🌿',
    description: 'Activación suave, cardio ligero y autocuidado. Tu cuerpo merece gentileza.',
    training: 'Movilidad + caminata',
    color: '#7ece9e',
  },
  {
    name: 'Folicular',
    days: 'Días 6–13',
    icon: '🌱',
    description: 'Tu energía sube. Momento ideal para aumentar cargas y probar ejercicios nuevos.',
    training: 'Fuerza + intensidad alta',
    color: '#f4afc8',
  },
  {
    name: 'Ovulación',
    days: 'Días 14–16',
    icon: '🌺',
    description: 'Pico máximo de energía. Ideal para marcas personales y cardio elevado.',
    training: 'HIIT + fuerza máxima',
    color: '#c9607a',
  },
  {
    name: 'Lútea',
    days: 'Días 17–28',
    icon: '🍂',
    description: 'La energía baja gradualmente. Nyla reduce la intensidad. No es rendirse.',
    training: 'Yoga + movilidad + core',
    color: '#c9a96e',
  },
]

export const MEAL_IDEAS = [
  {
    moment: 'Desayuno',
    icon: '🌅',
    ideas: [
      'Avena con frutos rojos y nueces',
      'Tostada integral con aguacate y huevo',
      'Yogur griego con granola y miel',
      'Smoothie de banana, espinaca y proteína',
    ],
  },
  {
    moment: 'Almuerzo',
    icon: '☀️',
    ideas: [
      'Bowl de quinoa con pollo y aguacate',
      'Ensalada de atún con aceite de oliva',
      'Arroz integral con salmón y verduras',
      'Wrap de pavo con vegetales frescos',
    ],
  },
  {
    moment: 'Cena',
    icon: '🌙',
    ideas: [
      'Salmón al horno con batata y brócoli',
      'Pollo a la plancha con ensalada verde',
      'Tortilla de claras con espinaca',
      'Lentejas con verduras salteadas',
    ],
  },
  {
    moment: 'Snacks',
    icon: '✨',
    ideas: [
      'Manzana con mantequilla de almendra',
      'Hummus con vegetales crudos',
      'Puñado de nueces mixtas',
      'Queso cottage con pepino',
    ],
  },
]