
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Meals.css";

const meals = {
  Desayunos: [
    { title: "Desayuno clásico fuerte", items: ["3 huevos enteros","150 g claras","2 tostadas integrales","½ aguacate"], protein: "32 g proteína", calories: "520 kcal" },
    { title: "Yogur + proteína", items: ["250 g yogur griego natural","1 scoop proteína whey","80 g frutos rojos","15 g crema de cacahuete"], protein: "35 g proteína", calories: "430 kcal" },
    { title: "Tostadas con atún", items: ["1 lata de atún en agua","2 tostadas integrales","30 g queso fresco light","Tomate"], protein: "30 g proteína", calories: "390 kcal" },
  ],
  Almuerzos: [
    { title: "Pollo + arroz", items: ["150 g pechuga de pollo","120 g arroz cocido","Verduras","10 g aceite de oliva"], protein: "35 g proteína", calories: "540 kcal" },
    { title: "Carne + patata", items: ["150 g carne magra","250 g patata","Ensalada"], protein: "32 g proteína", calories: "560 kcal" },
    { title: "Atún + pasta", items: ["1½ latas de atún en agua","100 g pasta cocida","Tomate natural","Queso ligero"], protein: "33 g proteína", calories: "500 kcal" },
  ],
  Meriendas: [
    { title: "Shake simple", items: ["1 scoop whey","250 ml leche alta proteína","1 banana"], protein: "32 g proteína", calories: "330 kcal" },
    { title: "Sandwich proteína", items: ["100 g pavo","2 rebanadas pan integral","Queso light"], protein: "30 g proteína", calories: "370 kcal" },
  ],
  Cenas: [
    { title: "Huevos + atún", items: ["2 huevos","1 lata atún en agua","Verduras","1 tostada integral"], protein: "32 g proteína", calories: "420 kcal" },
    { title: "Pollo + verduras", items: ["150 g pollo","Verduras al horno","150 g patata"], protein: "35 g proteína", calories: "460 kcal" },
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
    setResult({
      min: Math.round(libras * min),
      max: Math.round(libras * max),
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

      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/cycle")}><span className="nav-icon">🌙</span><span className="nav-label">Ciclo</span></button>
        <button className="nav-btn" onClick={() => navigate("/workout")}><span className="nav-icon">🏋️</span><span className="nav-label">Entrena</span></button>
        <button className="nav-btn active" onClick={() => navigate("/meals")}><span className="nav-icon">🍓</span><span className="nav-label">Nutrición</span></button>
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
      </nav>
    </section>
  );
}