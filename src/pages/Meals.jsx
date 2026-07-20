
import { useState } from "react";
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

const supplements = [
  { title: "Proteína Whey", text: "Ayuda a llegar a la proteína diaria, favorece recuperación y saciedad.", dose: "1 scoop · 20–25 g proteína" },
  { title: "Creatina monohidrato", text: "Apoya fuerza, rendimiento, recuperación y energía muscular.", dose: "3–5 g diarios" },
  { title: "Omega 3", text: "Puede apoyar salud cardiovascular, inflamación, cerebro y recuperación.", dose: "Según indicación del producto o profesional" },
  { title: "Magnesio", text: "Puede apoyar descanso, sistema nervioso, recuperación y fatiga.", dose: "Consultar dosis adecuada" },
];

// ─── Calculadora ───────────────────────────────────────────
const FACTORS = {
  "Perder grasa": {
    "Sedentaria":             [10, 12],
    "Moderadamente activa":   [12, 14],
    "Muy activa":             [14, 15],
  },
  "Mantener peso": {
    "Sedentaria":             [12, 14],
    "Moderadamente activa":   [14, 16],
    "Muy activa":             [16, 18],
  },
  "Ganar masa muscular": {
    "Sedentaria":             [16, 18],
    "Moderadamente activa":   [18, 20],
    "Muy activa":             [20, 22],
  },
};

function CalorieCalculator() {
  const [peso, setPeso] = useState("");
  const [objetivo, setObjetivo] = useState("Perder grasa");
  const [actividad, setActividad] = useState("Moderadamente activa");
  const [result, setResult] = useState(null);

  const calcular = () => {
    const kg = parseFloat(peso);
    if (!kg || kg <= 0) return;
    const libras = kg * 2.2;
    const [min, max] = FACTORS[objetivo][actividad];
    const kcalMin = Math.round(libras * min);
    const kcalMax = Math.round(libras * max);
    const kcal = Math.round((kcalMin + kcalMax) / 2);

    // Proteína por kg de peso corporal (fórmula correcta)
    let proteinPerKg;
    if (objetivo === "Perder grasa")        proteinPerKg = 1.2;
    else if (objetivo === "Mantener peso")  proteinPerKg = 1.6;
    else                                    proteinPerKg = 2.2;

    const protein = Math.round(kg * proteinPerKg);
    const proteinKcal = protein * 4;

    // Grasas: 25% de las calorías totales
    const fat = Math.round((kcal * 0.25) / 9);
    const fatKcal = fat * 9;

    // Carbos: resto de calorías
    const carbs = Math.round((kcal - proteinKcal - fatKcal) / 4);

    setResult({
      min: kcalMin, max: kcalMax, kcal,
      protein, carbs, fat,
      proteinPerKg,
    });
  };

  return (
    <div className="ml-calc-card">
      <p className="ml-calc-eyebrow">CALCULADORA</p>
      <h2 className="ml-calc-title">Calorías diarias</h2>
      <p className="ml-calc-sub">Obtén una estimación personalizada según tu objetivo y nivel de actividad.</p>

      {/* Peso */}
      <div className="ml-calc-field">
        <label className="ml-calc-label">Peso (kg)</label>
        <input
          className="ml-calc-input"
          type="number"
          placeholder="Ej. 62"
          value={peso}
          onChange={e => { setPeso(e.target.value); setResult(null); }}
          min="30"
          max="200"
        />
      </div>

      {/* Objetivo */}
      <div className="ml-calc-field">
        <label className="ml-calc-label">Objetivo</label>
        <div className="ml-calc-options">
          {Object.keys(FACTORS).map(opt => (
            <button
              key={opt}
              className={`ml-calc-opt ${objetivo === opt ? "active" : ""}`}
              onClick={() => { setObjetivo(opt); setResult(null); }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Actividad */}
      <div className="ml-calc-field">
        <label className="ml-calc-label">Nivel de actividad</label>
        <div className="ml-calc-options">
          {["Sedentaria","Moderadamente activa","Muy activa"].map(opt => (
            <button
              key={opt}
              className={`ml-calc-opt ${actividad === opt ? "active" : ""}`}
              onClick={() => { setActividad(opt); setResult(null); }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Botón calcular */}
      <button className="ml-calc-btn" onClick={calcular} disabled={!peso}>
        Calcular
      </button>

      {/* Resultado */}
      {result && (
        <div className="ml-calc-result">
          <p className="ml-calc-result-label">Calorías estimadas</p>
          <p className="ml-calc-result-value">{result.min.toLocaleString()} – {result.max.toLocaleString()}</p>
          <p className="ml-calc-result-unit">kcal por día</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",margin:"16px 0"}}>
            {[
              {label:"Proteína",value:result.protein,color:"#c9607a"},
              {label:"Carbos",value:result.carbs,color:"#a0c4a0"},
              {label:"Grasas",value:result.fat,color:"#c4a060"},
            ].map((m,i) => (
              <div key={i} style={{background:"rgba(0,0,0,0.2)",borderRadius:"12px",padding:"12px 8px",textAlign:"center",border:`1px solid ${m.color}40`}}>
                <div style={{fontSize:"22px",fontFamily:"Cormorant Garamond, serif",color:m.color,marginBottom:"2px"}}>{m.value}g</div>
                <div style={{fontSize:"10px",color:"rgba(244,175,200,0.8)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{m.label}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:"11px",color:"rgba(244,175,200,0.6)",lineHeight:"1.7",fontStyle:"italic",marginBottom:"12px"}}>
            💡 Prioriza la proteína. Es el macro más importante para preservar músculo y construirlo cuando entrenas.
          </p>
        </div>
      )}

      {/* Aviso */}
      <div className="ml-calc-disclaimer">
        <span>ℹ️</span>
        <p>Esta estimación es una guía general y no sustituye el asesoramiento de un profesional de la nutrición.</p>
      </div>
    </div>
  );
}

// ─── Pantalla principal ────────────────────────────────────
export default function Meals() {
  const navigate = useNavigate();

  return (
    <section className="ml-screen">
      <p className="ml-eyebrow">IDEAS PARA NUTRIRTE</p>
      <p className="ml-subtitle">La proteína es tu gran aliada para construir músculo, recuperarte mejor y sentirte saciada.</p>

      <div className="ml-note">
        <p>Estas ideas son educativas y generales. Si tienes una condición médica, necesidades específicas o quieres un plan personalizado, consulta con un profesional en nutrición o salud.</p>
        <p>Tu bienestar siempre es prioridad.</p>
      </div>

      {/* ── CALCULADORA ── */}
      <CalorieCalculator />

      {/* ── COMIDAS ── */}
      {Object.entries(meals).map(([cat, list]) => (
        <div className="ml-card" key={cat}>
          <h2 className="ml-card-title">{cat}</h2>
          {list.map(meal => (
            <div className="ml-item" key={meal.title}>
              <h3>{meal.title}</h3>
              <ul>{meal.items.map(i => <li key={i}>{i}</li>)}</ul>
              <div className="ml-macros">
                <span>{meal.protein}</span>
                <span>{meal.calories}</span>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ── SUPLEMENTACIÓN ── */}
      <div className="ml-card">
        <h2 className="ml-card-title">Suplementación básica</h2>
        {supplements.map(s => (
          <div className="ml-item" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="ml-macros"><span>{s.dose}</span></div>
          </div>
        ))}
      </div>

      
    </section>
  );
}