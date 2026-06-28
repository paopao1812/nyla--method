
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Library from "./pages/Library";
import Meals from "./pages/Meals";
import Affirmations from "./pages/Affirmations";
import Cycle from "./pages/Cycle";
import Premium from "./pages/Premium";
import Success from "./pages/Success";


// Guard: requiere sesión y onboarding completo
function RequireAuth({ children }) {
  const email = localStorage.getItem("nylaUserEmail");
  const done = localStorage.getItem("nylaOnboardingDone");
  if (!email) return <Navigate to="/login" replace />;
  if (!done) return <Navigate to="/onboarding" replace />;
  return children;
}

// Guard: si ya tiene sesión, redirige a home
function RequireGuest({ children }) {
  const email = localStorage.getItem("nylaUserEmail");
  const done = localStorage.getItem("nylaOnboardingDone");
  if (email && done) return <Navigate to="/home" replace />;
  return children;
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<RequireGuest><Welcome /></RequireGuest>} />
          <Route path="/login" element={<RequireGuest><Login /></RequireGuest>} />
          <Route path="/register" element={<RequireGuest><Register /></RequireGuest>} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/success" element={<Success />} />
          

          {/* Protegidas */}
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/workout" element={<RequireAuth><Workout /></RequireAuth>} />
          <Route path="/library" element={<RequireAuth><Library /></RequireAuth>} />
          <Route path="/meals" element={<RequireAuth><Meals /></RequireAuth>} />
          <Route path="/affirmations" element={<RequireAuth><Affirmations /></RequireAuth>} />
          <Route path="/cycle" element={<RequireAuth><Cycle /></RequireAuth>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}