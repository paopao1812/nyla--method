
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

export default function Meals() {
  const navigate = useNavigate();

  return (
    <section className="meals-screen">

      <p className="meals-section-label">Ideas para nutrirte</p>

      <p className="meals-subtitle">
        La proteína es tu gran aliada para construir músculo, recuperarte mejor y sentirte saciada.
      </p>

      <div className="nutrition-note">
        <p>Estas ideas son educativas y generales. Si tienes una condición médica, necesidades específicas o quieres un plan personalizado, consulta con un profesional en nutrición o salud.</p>
        <p>Tu bienestar siempre es prioridad.</p>
      </div>

      {Object.entries(meals).map(([category, list]) => (
        <div className="meal-card" key={category}>
          <h2>{category}</h2>
          {list.map((meal) => (
            <div className="meal-item" key={meal.title}>
              <h3>{meal.title}</h3>
              <ul>{meal.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="meal-macros">
                <span>{meal.protein}</span>
                <span>{meal.calories}</span>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="meal-card">
        <h2>Suplementación básica</h2>
        {supplements.map((item) => (
          <div className="meal-item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="meal-macros"><span>{item.dose}</span></div>
          </div>
        ))}
      </div>

      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/cycle")}><span className="nav-icon">🌙</span><span className="nav-label">Ciclo</span></button>
        <button className="nav-btn" onClick={() => navigate("/workout")}><span className="nav-icon">🏋️</span><span className="nav-label">Entrena</span></button>
        <button className="nav-btn active" onClick={() => navigate("/meals")}><span className="nav-icon">🍓</span><span className="nav-label">Nutrición</span></button>
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
        <button className="nav-btn" onClick={() => navigate("/library")}><span className="nav-icon">📖</span><span className="nav-label">Biblioteca</span></button>
      </nav>
    </section>
  );
}