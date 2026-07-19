
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Affirmations.css";

const affirmationCategories = {
  "Amor propio": [
    "No necesito castigarme para cambiar.",
    "La forma en la que me hablo también transforma mi vida.",
    "Estoy aprendiendo a tratarme con amor.",
    "Puedo mejorar sin odiar mi proceso.",
    "Merezco el mismo cuidado que le doy a los demás.",
    "Elegirme a mí misma no es egoísmo, es necesidad.",
    "No tengo que ganarme el derecho a descansar.",
  ],
  "Autoestima": [
    "Mi valor no depende de un número.",
    "Puedo ocupar espacio sin disculparme.",
    "Estoy construyendo confianza desde adentro.",
    "Soy suficiente incluso mientras sigo creciendo.",
    "No necesito la aprobación de nadie para saber que valgo.",
    "Mi cuerpo no es mi enemigo. Es mi aliado más fiel.",
    "Soy más que lo que veo en el espejo.",
  ],
  "Compromiso": [
    "Cada vez que vuelvo, me estoy eligiendo.",
    "La constancia también es amor propio.",
    "No necesito hacerlo perfecto, solo necesito seguir.",
    "Hoy cumplo una promesa conmigo.",
    "Volver siempre vale más que no haber caído.",
    "Mi compromiso no depende de cómo me siento hoy.",
    "Cada pequeño esfuerzo construye algo grande.",
  ],
  "Disciplina": [
    "Cinco minutos también cuentan.",
    "No necesito ganas para empezar.",
    "Puedo hacerlo aunque no me sienta lista.",
    "Estoy dejando de abandonarme.",
    "La disciplina es un acto de amor hacia mi futuro.",
    "No espero motivación, creo el hábito.",
    "Hoy hago lo que mi versión futura me agradecerá.",
  ],
  "Motivación": [
    "Mi futuro cambia con lo que hago hoy.",
    "Estoy más cerca cada vez que lo intento.",
    "La mujer que quiero ser se construye con acciones pequeñas.",
    "Hoy doy un paso más hacia mí.",
    "No necesito verlo todo claro para seguir avanzando.",
    "Mi progreso no siempre se ve, pero siempre existe.",
    "Cada entrenamiento es una promesa que me cumplo.",
  ],
  "Confianza": [
    "Confío en mi proceso aunque no lo entienda todavía.",
    "Soy capaz de más de lo que creo.",
    "No tengo que demostrarle nada a nadie.",
    "Puedo cambiar de opinión sin perder mi valor.",
    "Mi voz importa. Mi historia importa.",
    "Estoy aprendiendo a fiarme de mí misma.",
    "La seguridad no llega antes de actuar, llega después.",
  ],
  "Proceso": [
    "No necesito hacerlo perfecto, solo necesito volver a mí.",
    "Los días difíciles también son parte del camino.",
    "Cada etapa tiene su propósito, aunque no lo vea.",
    "El progreso no siempre es lineal y eso está bien.",
    "Estoy donde necesito estar.",
    "Un mal día no borra todo el trabajo hecho.",
    "Confío en que lo que construyo hoy tiene sentido.",
  ],
  "Cuerpo": [
    "Mi cuerpo hace cosas increíbles cada día.",
    "No entreno para castigarme, entreno para cuidarme.",
    "Mi cuerpo merece respeto, no crítica constante.",
    "Le agradezco a mi cuerpo todo lo que hace por mí.",
    "No compito con nadie. Solo con quien era ayer.",
    "Mi cuerpo no está roto, está en proceso.",
    "El movimiento es un regalo, no una obligación.",
  ],
  "Constancia": [
    "La constancia supera al talento.",
    "No necesito ser perfecta, necesito ser regular.",
    "Cada vez que vuelvo es una victoria.",
    "La racha no se rompe al fallar, se rompe al no volver.",
    "Pequeños pasos cada día construyen grandes cambios.",
    "Hoy es suficiente con aparecer.",
    "Mi consistencia es mi superpoder.",
  ],
  "Calma": [
    "Puedo hacer una pausa sin perder el rumbo.",
    "El descanso también es productivo.",
    "No todo necesita resolverse hoy.",
    "Respiro. Me centro. Sigo.",
    "La calma es una fortaleza, no una debilidad.",
    "Puedo soltar el control y confiar en el proceso.",
    "Hoy me permito ir despacio.",
  ],
};

const CATEGORIES = Object.keys(affirmationCategories);

export default function Affirmations() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Amor propio");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nylaFavorites") || "[]");
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("nylaFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (text) => {
    setFavorites(prev =>
      prev.includes(text) ? prev.filter(f => f !== text) : [...prev, text]
    );
  };

  const affirmations = affirmationCategories[selectedCategory];

  // Split categories into rows of 5
  const row1 = CATEGORIES.slice(0, 5);
  const row2 = CATEGORIES.slice(5);

  return (
    <section className="aff-screen">
      <p className="aff-eyebrow">HÁBLATE BONITO</p>

      {/* CATEGORÍAS EN 2 FILAS */}
      <div className="aff-cats-wrap">
        <div className="aff-cats-row">
          {row1.map(cat => (
            <button
              key={cat}
              className={`aff-cat ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="aff-cats-row">
          {row2.map(cat => (
            <button
              key={cat}
              className={`aff-cat ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* AFIRMACIONES */}
      <div className="aff-list">
        {affirmations.map(text => (
          <div className="aff-item" key={text}>
            <p>{text}</p>
            <button
              className="aff-fav"
              onClick={() => toggleFavorite(text)}
              aria-label="Favorito"
            >
              {favorites.includes(text) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      
    </section>
  );
}