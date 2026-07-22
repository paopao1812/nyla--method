const PHASES = {
  menstrual: {
    phase: "Fase menstrual",
    icon: "🩸",
    range: [1, 5],
    feeling: "Puedes sentir menos energía, inflamación o más cansancio.",
    bodyChanges: "Los niveles de estrógeno y progesterona están en su punto más bajo. Es normal sentir el cuerpo más pesado.",
    training: "Prioriza movilidad, caminatas suaves, core ligero y descanso activo.",
    hydration: "Aumenta un poco tu ingesta de líquidos: ayuda a reducir la sensación de hinchazón.",
    sleep: "Es normal necesitar más horas de sueño estos días. Escucha a tu cuerpo.",
    dailyTip: "No luches contra tu cuerpo. Aprende a entrenar con él.",
    infusions: ["Jengibre", "Manzanilla", "Canela"],
    foods: ["Omega-3", "Hierro + vitamina C", "Magnesio"],
  },
  folicular: {
    phase: "Fase folicular",
    icon: "🌿",
    range: [6, 13],
    feeling: "Tu energía puede empezar a subir.",
    bodyChanges: "El estrógeno comienza a subir. Tu cuerpo suele responder mejor a la intensidad y a la recuperación.",
    training: "Buen momento para entrenar fuerza, glúteos, progresión de cargas y cardio moderado.",
    hydration: "Mantén tu hidratación habitual; tu cuerpo está en un buen punto de equilibrio.",
    sleep: "Sueño más estable. Aprovecha la energía extra sin descuidar el descanso.",
    dailyTip: "Esta semana tu cuerpo te lo pone fácil: progresa un poco más en tus pesos.",
    infusions: ["Menta", "Té verde", "Limón y jengibre"],
    foods: ["Proteína magra", "Frutos secos", "Verduras de hoja verde"],
  },
  ovulatoria: {
    phase: "Fase ovulatoria",
    icon: "🌹",
    range: [14, 16],
    feeling: "Puedes sentirte con más energía y potencia.",
    bodyChanges: "El estrógeno alcanza su pico. Es común sentir más fuerza y mejor ánimo, aunque las articulaciones pueden estar algo más laxas.",
    training: "Ideal para entrenamientos fuertes, cuidando técnica, control y articulaciones.",
    hydration: "Aumenta ligeramente los líquidos si notas más sudoración con la intensidad extra.",
    sleep: "Buen momento de descanso reparador; aprovecha para dormir bien y rendir al máximo.",
    dailyTip: "Tu cuerpo está en su punto más fuerte del mes. Cuida la técnica, no solo la carga.",
    infusions: ["Hibisco", "Agua con pepino y menta", "Té blanco"],
    foods: ["Proteína de calidad", "Grasas saludables", "Antioxidantes (frutos rojos)"],
  },
  lutea: {
    phase: "Fase lútea",
    icon: "🧸",
    range: [17, 28],
    feeling: "Puede aparecer más sensibilidad, hambre, cansancio o retención.",
    bodyChanges: "La progesterona sube y luego cae. Es común el síndrome premenstrual: antojos, cambios de ánimo, hinchazón.",
    training: "Baja un poco la intensidad, prioriza fuerza controlada, caminatas y recuperación.",
    hydration: "Cuida bien los líquidos: ayuda a reducir la retención y la hinchazón típica de esta fase.",
    sleep: "El sueño puede verse afectado. Prioriza una rutina de descanso constante.",
    dailyTip: "Los antojos no son falta de disciplina, son biología. Elige sustitutos, no restricción.",
    infusions: ["Manzanilla", "Valeriana", "Canela con jengibre"],
    foods: ["Chocolate negro ≥70%", "Carbohidratos complejos", "Magnesio (plátano, frutos secos)"],
  },
};

export function getCyclePhase(lastPeriodDate, cycleLength = 28) {
  if (!lastPeriodDate) return null;

  const today = new Date();
  const start = new Date(lastPeriodDate);
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
  if (diffDays < 1) return null;

  const cycleDay = ((diffDays - 1) % cycleLength) + 1;
  const scale = cycleLength / 28;
  const key =
    cycleDay <= Math.round(5 * scale) ? "menstrual" :
    cycleDay <= Math.round(13 * scale) ? "folicular" :
    cycleDay <= Math.round(16 * scale) ? "ovulatoria" :
    "lutea";

  return { day: cycleDay, key, ...PHASES[key] };
}

export function getTodayCheckin() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("nylaCheckinDate");
  if (savedDate !== today) return null;
  return localStorage.getItem("nylaCheckinValue") || null;
}

export function saveTodayCheckin(value) {
  const today = new Date().toDateString();
  localStorage.setItem("nylaCheckinDate", today);
  localStorage.setItem("nylaCheckinValue", value);
}

export const CHECKIN_OPTIONS = [
  { value: "energia", label: "Mucha energía", icon: "😊" },
  { value: "normal", label: "Normal", icon: "😐" },
  { value: "cansada", label: "Muy cansada", icon: "😴" },
  { value: "dolor", label: "Tengo dolor menstrual", icon: "😣" },
  { value: "hinchada", label: "Muy hinchada", icon: "😔" },
  { value: "estres", label: "Mucho estrés", icon: "😩" },
];

export function getAdaptedTraining(cycleInfo, checkin) {
  if (!checkin || checkin === "normal" || checkin === "energia") {
    return cycleInfo.training;
  }
  const adjustments = {
    cansada: "Hoy tu cuerpo pide menos. Reduce el volumen o la intensidad sin culpa — un día más suave también cuenta.",
    dolor: "Si el dolor es fuerte, prioriza movilidad y estiramientos suaves. Puedes posponer la fuerza para cuando te sientas mejor.",
    hinchada: "Prioriza movimiento suave, caminatas e hidratación. La fuerza puede esperar a que te sientas más ligera.",
    estres: "Un entrenamiento suave hoy puede ayudarte a bajar el estrés. No es necesario que sea intenso.",
  };
  return adjustments[checkin] || cycleInfo.training;
}
