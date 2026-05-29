
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const affirmationCategories = {

  "Amor propio": [
    "No necesito castigarme para cambiar.",
    "La forma en la que te hablas tambien transforma tu vida",
    "Estoy aprendiendo a tratarme con amor.",
    "Puedo mejorar sin odiar mi proceso.",
  ],

  Autoestima: [
    "Mi valor no depende de un número.",
    "Puedo ocupar espacio sin disculparme.",
    "Estoy construyendo confianza desde adentro.",
    "Soy suficiente incluso mientras sigo creciendo.",
  ],

  Compromiso: [
    "Cada vez que vuelvo, me estoy eligiendo.",
    "La constancia también es amor propio.",
    "No necesito hacerlo perfecto, solo necesito seguir.",
    "Hoy cumplo una promesa conmigo.",
  ],

  Procrastinación: [
    "Cinco minutos también cuentan.",
    "No necesito ganas para empezar.",
    "Puedo hacerlo aunque no me sienta lista.",
    "Estoy dejando de abandonarme.",
  ],

  Motivación: [
    "Mi futuro cambia con lo que hago hoy.",
    "Estoy más cerca cada vez que lo intento.",
    "La mujer que quiero ser se construye con acciones pequeñas.",
    "Hoy doy un paso más hacia mí.",
  ],
};

export default function Affirmations() {
    const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Amor propio");
  const [favorite, setFavorite] = useState(() => {
    return localStorage.getItem("nylaFavoriteAffirmation") || "";
  });

  useEffect(() => {
    if (favorite) {
      localStorage.setItem("nylaFavoriteAffirmation", favorite);
    }
  }, [favorite]);

  const affirmations = affirmationCategories[selectedCategory];

  return (
    <section className="affirmations-page">
      <p className="affirmations-eyebrow"></p>

      
<p className="section-label">HABLATE BONITO</p>
      

      <div className="affirmation-categories">
        {Object.keys(affirmationCategories).map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="affirmation-list">
        {affirmations.map((text) => (
          <div className="affirmation-item" key={text}>
            <p>{text}</p>

            <button onClick={() => setFavorite(text)}>
              {favorite === text ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
      <div className="bottom-nav">

  <button className="nav-btn" onClick={() => navigate("/cycle")}>
    <span className="nav-icon">🌙</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/workout")}>
    <span className="nav-icon">🏋️</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/meals")}>
    <span className="nav-icon">🍓</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/affirmations")}>
    <span className="nav-icon">✨</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/library")}>
    <span className="nav-icon">📖</span>
  </button>

</div>
    </section>
  );
}