
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Meals.css";

const meals = {
  Desayunos: [
    { title:"Tortilla de claras con tostadas", items:["4 claras","1 huevo entero","2 tostadas integrales","½ aguacate"], steps:["Bate claras con huevo, sazona.","Cocina en sartén 3 min.","Tuesta el pan y aplasta el aguacate.","Sirve junto."], time:"10 min", protein:30, carbs:26, fat:14, calories:490 },
    { title:"Yogur griego con avena y fruta", items:["250 g yogur griego 0%","40 g avena","1 banana","10 g crema de cacahuete"], steps:["Pon la avena en un bol.","Añade el yogur encima.","Corta la banana y añádela.","Añade crema de cacahuete y canela."], time:"5 min", protein:28, carbs:48, fat:8, calories:420 },
    { title:"Tostadas de atún con tomate", items:["1 lata atún en agua","2 tostadas integrales","1 tomate","30 g queso fresco batido"], steps:["Escurre el atún y mezcla con queso.","Corta el tomate.","Monta las tostadas con tomate y atún.","Chorrito de aceite encima."], time:"5 min", protein:30, carbs:30, fat:7, calories:390 },
    { title:"Avena con huevo y plátano", items:["50 g avena","1 huevo","1 plátano","200 ml leche semidesnatada"], steps:["Cuece la avena en leche 3–4 min.","Fríe el huevo.","Sirve avena con plátano troceado y huevo."], time:"10 min", protein:22, carbs:52, fat:8, calories:410 },
  ],
  Almuerzos: [
    { title:"Pollo con arroz y brócoli", items:["150 g pechuga de pollo","120 g arroz cocido","150 g brócoli","10 g aceite de oliva"], steps:["Cuece el arroz.","Cuece el brócoli al vapor 5 min.","Cocina el pollo en sartén con ajo 8 min.","Sirve todo junto."], time:"25 min", protein:36, carbs:46, fat:11, calories:540 },
    { title:"Salmón con patata y espinacas", items:["150 g salmón","200 g patata","100 g espinacas","10 g aceite de oliva"], steps:["Cuece la patata 15 min.","Cocina el salmón 4 min por lado.","Saltea espinacas 2 min.","Sirve junto con limón."], time:"25 min", protein:32, carbs:30, fat:18, calories:520 },
    { title:"Ternera con boniato", items:["150 g ternera magra picada","200 g boniato","Pimientos","10 g aceite de oliva"], steps:["Cuece el boniato 15 min o microondas 8 min.","Saltea ternera con pimientos 8 min.","Sirve ternera sobre el boniato."], time:"25 min", protein:33, carbs:40, fat:12, calories:550 },
    { title:"Pasta integral con atún", items:["90 g pasta integral","2 latas atún en agua","200 g tomate triturado","Ajo"], steps:["Cuece la pasta.","Sofríe ajo 1 min.","Añade tomate y cocina 5 min.","Mezcla con atún y pasta."], time:"20 min", protein:38, carbs:52, fat:8, calories:510 },
    { title:"Bowl de garbanzos con huevo", items:["200 g garbanzos cocidos","2 huevos","Espinacas","Tomate cherry","10 g aceite"], steps:["Cuece los huevos 7 min.","Saltea garbanzos con espinacas 3 min.","Añade tomate cherry.","Sirve con huevos partidos."], time:"15 min", protein:28, carbs:38, fat:14, calories:510 },
  ],
  Meriendas: [
    { title:"Yogur con frutos secos", items:["200 g yogur griego 0%","15 g nueces","1 manzana"], steps:["Pon el yogur en un bol.","Añade nueces troceadas.","Acompaña con manzana cortada."], time:"2 min", protein:18, carbs:28, fat:10, calories:310 },
    { title:"Tostadas de pavo y queso", items:["2 tostadas integrales","80 g pavo","30 g queso fresco batido","Tomate"], steps:["Unta el queso en las tostadas.","Añade pavo y tomate.","Listo."], time:"3 min", protein:22, carbs:26, fat:5, calories:320 },
    { title:"Requesón con fruta y avena", items:["200 g requesón","30 g avena","1 naranja"], steps:["Mezcla requesón con avena.","Añade naranja troceada.","Espolvorea canela."], time:"3 min", protein:20, carbs:32, fat:4, calories:300 },
  ],
  Cenas: [
    { title:"Merluza al horno con verduras", items:["200 g merluza","Calabacín","Tomate","Pimientos","10 g aceite"], steps:["Precalienta horno 180°C.","Coloca merluza y verduras en bandeja.","Riega con aceite y limón.","Hornea 18–20 min."], time:"25 min", protein:34, carbs:10, fat:8, calories:320 },
    { title:"Tortilla de verduras", items:["3 huevos","2 claras","Champiñones","Espinacas","Pimientos"], steps:["Saltea verduras 5 min.","Bate huevos y añade verduras.","Cuaja a fuego bajo 4–5 min.","Da la vuelta y cocina 2 min."], time:"15 min", protein:28, carbs:8, fat:14, calories:380 },
    { title:"Pollo con verduras salteadas", items:["150 g pechuga de pollo","Brócoli","Zanahoria","Champiñones","Salsa de soja"], steps:["Corta el pollo en tiras.","Saltea el pollo 5 min.","Saltea verduras 5 min.","Mezcla con salsa de soja."], time:"15 min", protein:35, carbs:12, fat:8, calories:380 },
    { title:"Ensalada completa con atún", items:["2 latas atún en agua","2 huevos cocidos","Lechuga","Tomate","Pepino"], steps:["Cuece los huevos 10 min.","Prepara la base de lechuga.","Añade atún y huevos.","Aliña con aceite y limón."], time:"15 min", protein:38, carbs:8, fat:14, calories:390 },
  ],
};

const supplementGroups = [
  {
    group: "Suplementación básica",
    desc: "Respaldados por amplia evidencia científica para mujeres que entrenan fuerza.",
    items: [
      {
        title: "Proteína Whey Isolate",
        icon: "🥛",
        what: "Proteína de suero de leche en su forma más purificada. Contiene mayor porcentaje de proteína y muy poca lactosa.",
        why: "Ayuda a llegar a tu objetivo diario de proteína cuando la alimentación sola no es suficiente. Favorece la recuperación muscular y la saciedad.",
        when: "Después del entrenamiento o en cualquier momento del día donde necesites un aporte proteico rápido.",
        dose: "1 scoop aporta entre 20 y 30 g de proteína. Ajusta según lo que te falte para llegar a tu objetivo diario.",
        note: "La proteína en polvo no es obligatoria. Es un complemento práctico, no un requisito.",
        caution: "Si tienes intolerancia a la lactosa severa, consulta con tu médico o elige una proteína vegetal.",
        who: "Cualquier mujer que entrene fuerza y le cueste llegar a su proteína diaria solo con alimentos.",
      },
      {
        title: "Creatina Monohidrato",
        icon: "⚡",
        what: "Uno de los suplementos más estudiados en la historia del deporte. Ayuda a tu músculo a producir energía durante esfuerzos intensos.",
        why: "Mejora la fuerza, el rendimiento en el entrenamiento y puede acelerar la recuperación. Los efectos son acumulativos.",
        when: "En cualquier momento del día. La hora no importa tanto como la consistencia. Tómala todos los días, entrenes o no.",
        dose: "3–5 g diarios. No es necesaria la fase de carga.",
        note: "Es normal retener algo de agua muscular los primeros días. No es grasa, es hidratación del músculo.",
        caution: "Si tienes problemas renales, consulta con tu médico antes de tomarla.",
        who: "Mujeres que llevan al menos 2–3 meses entrenando con regularidad y quieren mejorar su rendimiento.",
      },
    ]
  },
  {
    group: "Salud y bienestar",
    desc: "Suplementos que pueden apoyar tu salud general. Siempre con criterio y sin excesos.",
    items: [
      {
        title: "Omega 3",
        icon: "🐟",
        what: "Ácidos grasos esenciales que el cuerpo no puede producir por sí solo. Se obtienen principalmente del pescado azul.",
        why: "Puede apoyar la salud cardiovascular, la función cerebral y reducir la inflamación derivada del entrenamiento.",
        when: "Con las comidas para mejorar su absorción.",
        dose: "La dosis depende del producto. Busca uno que aporte al menos 1 g de EPA+DHA por día.",
        note: "Si comes pescado azul 2–3 veces por semana, puede que no lo necesites.",
        caution: "Si tomas anticoagulantes, consulta con tu médico.",
        who: "Especialmente útil si consumes poco pescado azul en tu dieta habitual.",
      },
      {
        title: "Magnesio",
        icon: "🌙",
        what: "Mineral esencial implicado en más de 300 funciones del organismo, incluyendo la función muscular, el sistema nervioso y el descanso.",
        why: "Muchas personas no llegan a los niveles óptimos a través de la alimentación. Puede mejorar la calidad del sueño y la recuperación.",
        when: "Por la noche, antes de dormir.",
        dose: "No hay una dosis universal. Depende del tipo y de tus necesidades. Consulta el prospecto del producto.",
        note: "Existen distintas formas de magnesio con diferentes usos.",
        caution: "El citrato puede tener efecto laxante en dosis altas.",
        who: "Mujeres con dificultades para dormir, calambres musculares frecuentes o alto nivel de estrés.",
        subtypes: [
          { name: "Bisglicinato", best: "Descanso · estrés · recuperación" },
          { name: "Citrato", best: "Función muscular · estreñimiento ocasional" },
          { name: "Treonato", best: "Función cognitiva · cerebro" },
          { name: "Malato", best: "Energía · personas con sensación de fatiga" },
        ]
      },
      {
        title: "Vitamina D",
        icon: "☀️",
        what: "Vitamina liposoluble que el cuerpo sintetiza principalmente a través de la exposición solar.",
        why: "Esencial para la salud ósea, la función muscular y el sistema inmune. El déficit es muy común en personas con poca exposición al sol.",
        when: "Con una comida que contenga grasas, para mejorar su absorción.",
        dose: "No recomendamos una dosis estándar. Hazte una analítica y ajusta según tus niveles reales.",
        note: "No suplementes sistemáticamente sin saber tus niveles. Más no siempre es mejor.",
        caution: "En dosis muy altas puede ser tóxica. Siempre bajo supervisión si tomas dosis altas.",
        who: "Personas con poca exposición solar, que viven en latitudes nórdicas o con niveles bajos confirmados en analítica.",
      },
    ]
  },
];


function SupplementCard({ supp }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{
      background:"rgba(0,0,0,0.25)", borderRadius:"16px",
      border:"1px solid rgba(244,175,200,0.1)",
      overflow:"hidden"
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width:"100%", padding:"16px", display:"flex",
        justifyContent:"space-between", alignItems:"center",
        background:"none", border:"none", cursor:"pointer", textAlign:"left"
      }}>
        <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
          <span style={{fontSize:"24px"}}>{supp.icon}</span>
          <span style={{fontFamily:"Cormorant Garamond, serif", fontSize:"17px", color:"#f5ede6"}}>{supp.title}</span>
        </div>
        <span style={{color:"#c9607a", fontSize:"18px"}}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{padding:"0 16px 16px", display:"flex", flexDirection:"column", gap:"12px"}}>
          {[
            {label:"¿Qué es?", value:supp.what},
            {label:"¿Para qué sirve?", value:supp.why},
            {label:"¿Cuándo tomarlo?", value:supp.when},
            {label:"Dosis orientativa", value:supp.dose},
          ].map((item, i) => (
            <div key={i}>
              <p style={{fontSize:"10px", letterSpacing:"0.2em", color:"#c9607a", textTransform:"uppercase", marginBottom:"4px"}}>{item.label}</p>
              <p style={{fontSize:"13px", color:"rgba(244,175,200,0.8)", lineHeight:"1.6"}}>{item.value}</p>
            </div>
          ))}
          {supp.subtypes && (
            <div>
              <p style={{fontSize:"10px", letterSpacing:"0.2em", color:"#c9607a", textTransform:"uppercase", marginBottom:"8px"}}>Tipos de magnesio</p>
              {supp.subtypes.map((st, i) => (
                <div key={i} style={{
                  background:"rgba(0,0,0,0.2)", borderRadius:"10px",
                  padding:"10px 12px", marginBottom:"6px",
                  display:"flex", justifyContent:"space-between", alignItems:"center"
                }}>
                  <span style={{fontSize:"13px", color:"#f5ede6", fontWeight:"500"}}>{st.name}</span>
                  <span style={{fontSize:"11px", color:"rgba(244,175,200,0.6)"}}>{st.best}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{
            background:"rgba(201,96,122,0.08)", borderRadius:"10px",
            padding:"10px 12px", border:"1px solid rgba(201,96,122,0.15)"
          }}>
            <p style={{fontSize:"11px", color:"rgba(244,175,200,0.6)", lineHeight:"1.6"}}>
              ⚠️ {supp.caution}
            </p>
          </div>
          <div style={{
            background:"rgba(0,0,0,0.15)", borderRadius:"10px", padding:"10px 12px"
          }}>
            <p style={{fontSize:"11px", color:"rgba(244,175,200,0.5)", lineHeight:"1.6", fontStyle:"italic"}}>
              💡 {supp.note}
            </p>
          </div>
          <div>
            <p style={{fontSize:"10px", letterSpacing:"0.2em", color:"rgba(244,175,200,0.5)", textTransform:"uppercase", marginBottom:"4px"}}>¿A quién puede beneficiar?</p>
            <p style={{fontSize:"12px", color:"rgba(244,175,200,0.7)", lineHeight:"1.6"}}>{supp.who}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Calculadora basada en evidencia científica ────────────────────────────
// Fuentes: ISSN 2017, ACSM, Academy of Nutrition and Dietetics, ESPEN
const ACTIVITY_FACTORS = {
  "Sedentaria":           1.2,
  "Moderadamente activa": 1.55,
  "Muy activa":           1.725,
};

const MACRO_TARGETS = {
  "Perder grasa":       { proteinPerKg: 2.0, fatPerKg: 0.9,  label: "Déficit calórico moderado" },
  "Mantener peso":      { proteinPerKg: 1.8, fatPerKg: 1.1,  label: "Mantenimiento" },
  "Ganar masa muscular":{ proteinPerKg: 2.0, fatPerKg: 1.1,  label: "Superávit calórico moderado" },
};

function CalorieCalculator() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [edad, setEdad] = useState("");
  const [objetivo, setObjetivo] = useState("Perder grasa");
  const [actividad, setActividad] = useState("Moderadamente activa");
  const [result, setResult] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const calcular = () => {
    const kg = parseFloat(peso);
    const cm = parseFloat(altura);
    const yr = parseFloat(edad);
    if (!kg || kg <= 0) return;

    // TMB Mifflin-St Jeor para mujeres (más precisa que método de libras)
    // Si no tiene altura/edad, usa estimación por peso
    let tmb;
    if (cm && yr) {
      tmb = (10 * kg) + (6.25 * cm) - (5 * yr) - 161;
    } else {
      tmb = kg * 22; // estimación simplificada
    }

    const tdee = Math.round(tmb * ACTIVITY_FACTORS[actividad]);

    // Ajuste calórico según objetivo
    let kcal;
    if (objetivo === "Perder grasa")        kcal = tdee - 300; // déficit moderado
    else if (objetivo === "Ganar masa muscular") kcal = tdee + 200; // superávit moderado
    else                                    kcal = tdee;

    const targets = MACRO_TARGETS[objetivo];

    // Proteína: por kg peso corporal (ISSN, ACSM)
    const protein = Math.round(kg * targets.proteinPerKg);

    // Grasas: por kg peso corporal (mínimo hormonal femenino)
    const fat = Math.round(kg * targets.fatPerKg);

    // Carbos: calorías restantes
    const remainingKcal = kcal - (protein * 4) - (fat * 9);
    const carbs = Math.max(0, Math.round(remainingKcal / 4));

    setResult({ kcal, tdee, protein, fat, carbs, objetivo, kg,
      proteinPerKg: targets.proteinPerKg, fatPerKg: targets.fatPerKg });
    setShowMenu(false);
  };

  const macroExplanations = result ? {
    protein: {
      icon: "🥩",
      title: "Proteína",
      value: result.protein,
      range: `${Math.round(result.kg * 1.6)}–${Math.round(result.kg * 2.4)} g`,
      why: objetivo === "Perder grasa"
        ? "En déficit calórico necesitas más proteína para no perder músculo mientras pierdes grasa."
        : objetivo === "Ganar masa muscular"
        ? "La proteína es el material con el que tu cuerpo construye músculo. Sin suficiente, el entrenamiento no se traduce en resultados."
        : "Mantener un buen aporte proteico protege tu músculo y te mantiene saciada.",
      color: "#c9607a",
    },
    fat: {
      icon: "🥑",
      title: "Grasas",
      value: result.fat,
      range: `${Math.round(result.kg * 0.8)}–${Math.round(result.kg * 1.2)} g`,
      why: "Las grasas son esenciales para tus hormonas femeninas. Por debajo de 0.8 g/kg pueden aparecer alteraciones del ciclo menstrual.",
      color: "#c4a060",
    },
    carbs: {
      icon: "🍚",
      title: "Carbohidratos",
      value: result.carbs,
      range: `${Math.round(result.carbs * 0.85)}–${Math.round(result.carbs * 1.15)} g`,
      why: "Los carbos son tu combustible principal para entrenar. Se calculan con las calorías que quedan después de asignar proteína y grasas.",
      color: "#a0c4a0",
    },
  } : null;

  return (
    <div className="ml-calc-card">
      <p className="ml-calc-eyebrow">CALCULADORA</p>
      <h2 className="ml-calc-title">Tus macros diarios</h2>
      <p className="ml-calc-sub">Basada en evidencia científica (ISSN · ACSM · Academy of Nutrition and Dietetics)</p>

      <div className="ml-calc-field">
        <label className="ml-calc-label">Peso (kg)</label>
        <input className="ml-calc-input" type="number" placeholder="Ej: 65" value={peso}
          onChange={e => setPeso(e.target.value)} />
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
        <div className="ml-calc-field">
          <label className="ml-calc-label">Altura (cm) <span style={{fontSize:"9px",opacity:0.5}}>opcional</span></label>
          <input className="ml-calc-input" type="number" placeholder="Ej: 165" value={altura}
            onChange={e => setAltura(e.target.value)} />
        </div>
        <div className="ml-calc-field">
          <label className="ml-calc-label">Edad <span style={{fontSize:"9px",opacity:0.5}}>opcional</span></label>
          <input className="ml-calc-input" type="number" placeholder="Ej: 28" value={edad}
            onChange={e => setEdad(e.target.value)} />
        </div>
      </div>

      <div className="ml-calc-field">
        <label className="ml-calc-label">Objetivo</label>
        <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
          {["Perder grasa","Mantener peso","Ganar masa muscular"].map(o => (
            <button key={o} onClick={() => setObjetivo(o)} style={{
              padding:"12px 16px", borderRadius:"12px", textAlign:"left",
              background: objetivo === o ? "rgba(201,96,122,0.2)" : "rgba(0,0,0,0.2)",
              border: objetivo === o ? "1px solid #c9607a" : "1px solid rgba(244,175,200,0.15)",
              color: objetivo === o ? "#f4afc8" : "rgba(244,175,200,0.7)",
              fontSize:"13px", cursor:"pointer", minHeight:"44px"
            }}>{o}</button>
          ))}
        </div>
      </div>

      <div className="ml-calc-field">
        <label className="ml-calc-label">Nivel de actividad</label>
        <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
          {[
            {k:"Sedentaria", desc:"Sin ejercicio o muy poco"},
            {k:"Moderadamente activa", desc:"Entrenas 3–5 días/semana"},
            {k:"Muy activa", desc:"Entrenas 6–7 días/semana"},
          ].map(({k, desc}) => (
            <button key={k} onClick={() => setActividad(k)} style={{
              padding:"12px 16px", borderRadius:"12px", textAlign:"left",
              background: actividad === k ? "rgba(201,96,122,0.2)" : "rgba(0,0,0,0.2)",
              border: actividad === k ? "1px solid #c9607a" : "1px solid rgba(244,175,200,0.15)",
              color: actividad === k ? "#f4afc8" : "rgba(244,175,200,0.7)",
              fontSize:"13px", cursor:"pointer", minHeight:"44px"
            }}>
              <span style={{display:"block"}}>{k}</span>
              <span style={{fontSize:"11px", opacity:0.6}}>{desc}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={calcular} className="ml-calc-btn">
        Calcular mis macros →
      </button>

      {result && macroExplanations && (
        <div style={{marginTop:"20px", display:"flex", flexDirection:"column", gap:"12px"}}>
          <div style={{textAlign:"center", marginBottom:"4px"}}>
            <p style={{fontSize:"20px", fontFamily:"Cormorant Garamond, serif", color:"#f5ede6"}}>{result.kcal.toLocaleString()} kcal/día</p>
            <p style={{fontSize:"11px", color:"rgba(244,175,200,0.6)"}}>Gasto estimado: {result.tdee.toLocaleString()} kcal · {MACRO_TARGETS[objetivo].label}</p>
          </div>

          {Object.values(macroExplanations).map((m, i) => (
            <div key={i} style={{
              background:"rgba(0,0,0,0.25)", borderRadius:"16px", padding:"16px",
              border:`1px solid ${m.color}30`
            }}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px"}}>
                <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                  <span style={{fontSize:"20px"}}>{m.icon}</span>
                  <span style={{fontSize:"14px", fontFamily:"Cormorant Garamond, serif", color:"#f5ede6"}}>{m.title}</span>
                </div>
                <div style={{textAlign:"right"}}>
                  <span style={{fontSize:"22px", fontFamily:"Cormorant Garamond, serif", color:m.color}}>{m.value}g</span>
                  <p style={{fontSize:"10px", color:"rgba(244,175,200,0.5)"}}>{m.range}/día</p>
                </div>
              </div>
              <p style={{fontSize:"12px", color:"rgba(244,175,200,0.7)", lineHeight:"1.6"}}>{m.why}</p>
            </div>
          ))}

          <div style={{
            background:"rgba(0,0,0,0.15)", borderRadius:"12px", padding:"14px",
            border:"1px solid rgba(244,175,200,0.08)"
          }}>
            <p style={{fontSize:"11px", color:"rgba(244,175,200,0.6)", lineHeight:"1.7", fontStyle:"italic"}}>
              💡 Estos valores son una guía orientativa. Ajústalos según cómo responde tu cuerpo. Si no ves resultados en 3–4 semanas, revisa tu adherencia antes de cambiar los números.
            </p>
          </div>

          <button onClick={() => {
            localStorage.setItem("nylaMacros", JSON.stringify({
              kcal: result.kcal, protein: result.protein,
              carbs: result.carbs, fat: result.fat, objetivo
            }));
            setShowMenu(!showMenu);
          }} style={{
            width:"100%", padding:"16px", borderRadius:"50px",
            background:"linear-gradient(135deg, #8b2840, #c9607a)",
            color:"#fff", border:"none", fontSize:"11px",
            letterSpacing:"0.2em", textTransform:"uppercase",
            minHeight:"52px", cursor:"pointer",
            boxShadow:"0 6px 20px rgba(201,96,122,0.3)"
          }}>
            ¿Cómo llegar a estos gramos? ✦
          </button>

          {showMenu && (
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
              {[
                {icon:"📋", title:"Ver menú del día", desc:"NYLA te genera un menú completo con recetas del recetario"},
                {icon:"🍽️", title:"Construir mi día", desc:"Elige tus propias recetas y ve sumando macros"},
                {icon:"➕", title:"Completar lo que me falta", desc:"Descubre qué recetas te ayudan a llegar a tus macros"},
              ].map((opt, i) => (
                <button key={i} style={{
                  padding:"16px", borderRadius:"14px", textAlign:"left",
                  background:"rgba(0,0,0,0.2)",
                  border:"1px solid rgba(244,175,200,0.12)",
                  cursor:"pointer", display:"flex", gap:"12px", alignItems:"center"
                }}>
                  <span style={{fontSize:"24px"}}>{opt.icon}</span>
                  <div>
                    <p style={{fontSize:"14px", color:"#f5ede6", fontFamily:"Cormorant Garamond, serif", marginBottom:"3px"}}>{opt.title}</p>
                    <p style={{fontSize:"11px", color:"rgba(244,175,200,0.6)"}}>{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Meals() {
  const navigate = useNavigate();

  return (
    <section className="ml-screen">
      <p className="ml-eyebrow">IDEAS PARA NUTRIRTE</p>
      <p className="ml-subtitle">La proteína es tu gran aliada para construir músculo, recuperarte mejor y sentirte saciada.</p>

      <div style={{
        background:"linear-gradient(135deg, rgba(107,21,53,0.7), rgba(61,14,37,0.9))",
        borderRadius:"16px", padding:"20px",
        border:"2px solid rgba(201,96,122,0.5)",
        boxShadow:"0 4px 24px rgba(201,96,122,0.2)"
      }}>
        <p style={{fontSize:"13px", fontFamily:"Cormorant Garamond, serif", color:"#f4afc8", marginBottom:"10px", fontStyle:"italic", fontSize:"16px"}}>
          ⚠️ Información importante
        </p>
        <p style={{fontSize:"13px", color:"rgba(244,175,200,0.95)", lineHeight:"1.8", marginBottom:"8px"}}>
          Estas recomendaciones son educativas y generales. Si tienes una condición médica, necesidades específicas o quieres un plan personalizado, consulta con un profesional en nutrición o salud.
        </p>
        <p style={{fontSize:"12px", color:"#c9607a", fontWeight:"500"}}>
          Tu bienestar siempre es prioridad. ✦
        </p>
      </div>

      {/* ── CALCULADORA ── */}
      <CalorieCalculator />

      {/* ── COMIDAS ── */}
      {Object.entries(meals).map(([cat, list]) => (
        <div className="ml-card" key={cat}>
          <h2 className="ml-card-title">{cat}</h2>
          {list.map(meal => (
            <div className="ml-item" key={meal.title}>
              {/* Espacio para foto del plato */}
              <div style={{
                width:"100%", height:"160px", borderRadius:"12px",
                background:"rgba(0,0,0,0.2)",
                border:"1px dashed rgba(244,175,200,0.2)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:"12px", overflow:"hidden"
              }}>
                <p style={{fontSize:"11px", color:"rgba(244,175,200,0.3)", letterSpacing:"0.2em", textTransform:"uppercase"}}>
                  📷 Foto del plato
                </p>
              </div>
              <h3>{meal.title}</h3>
              <ul>{meal.items.map(i => <li key={i}>{i}</li>)}</ul>
              <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginTop:"8px"}}>
                <span style={{fontSize:"11px", background:"rgba(201,96,122,0.15)", color:"#c9607a", padding:"3px 8px", borderRadius:"8px"}}>P {meal.protein}g</span>
                <span style={{fontSize:"11px", background:"rgba(160,196,160,0.15)", color:"#a0c4a0", padding:"3px 8px", borderRadius:"8px"}}>C {meal.carbs}g</span>
                <span style={{fontSize:"11px", background:"rgba(196,160,96,0.15)", color:"#c4a060", padding:"3px 8px", borderRadius:"8px"}}>G {meal.fat}g</span>
                <span style={{fontSize:"11px", background:"rgba(244,175,200,0.1)", color:"rgba(244,175,200,0.7)", padding:"3px 8px", borderRadius:"8px"}}>{meal.calories} kcal</span>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ── SUPLEMENTACIÓN ── */}
      <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
        {/* Aviso importante */}
        <div style={{
          background:"linear-gradient(135deg, rgba(107,21,53,0.6), rgba(61,14,37,0.8))",
          borderRadius:"16px", padding:"20px",
          border:"1px solid rgba(201,96,122,0.4)",
          boxShadow:"0 4px 20px rgba(201,96,122,0.15)"
        }}>
          <p style={{fontSize:"14px", fontFamily:"Cormorant Garamond, serif", color:"#f4afc8", marginBottom:"10px", fontStyle:"italic"}}>
            🌿 La alimentación, el entrenamiento, el descanso y la gestión del estrés son la base.
          </p>
          <p style={{fontSize:"13px", color:"rgba(244,175,200,0.9)", lineHeight:"1.7", marginBottom:"10px"}}>
            Los suplementos son un complemento, nunca un sustituto.
          </p>
          <div style={{height:"1px", background:"rgba(201,96,122,0.3)", margin:"10px 0"}}/>
          <p style={{fontSize:"11px", color:"rgba(244,175,200,0.7)", lineHeight:"1.6"}}>
            ⚠️ La información mostrada es educativa y no sustituye el consejo de un profesional de la salud.
          </p>
        </div>

        {supplementGroups.map((group, gi) => (
          <div key={gi} style={{display:"flex", flexDirection:"column", gap:"12px"}}>
            <div>
              <h2 style={{fontFamily:"Cormorant Garamond, serif", fontSize:"22px", color:"#f4afc8", marginBottom:"4px"}}>{group.group}</h2>
              <p style={{fontSize:"12px", color:"rgba(244,175,200,0.6)"}}>{group.desc}</p>
            </div>
            {group.items.map((s, si) => (
              <SupplementCard key={si} supp={s} />
            ))}
          </div>
        ))}
      </div>

      
    </section>
  );
}