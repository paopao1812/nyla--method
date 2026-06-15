
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Library from "./pages/Library";
import Meals from "./pages/Meals";
import Affirmations from "./pages/Affirmations";
import Cycle from "./pages/Cycle";
import Premium from "./pages/Premium";
import Success from "./pages/Success";

// Guard: si ya hizo onboarding, redirige a /home
function RequireOnboarding({ children }) {
  const done = localStorage.getItem("nylaOnboardingDone");
  const name = localStorage.getItem("nylaUserName");
  if (done && name) return <Navigate to="/home" replace />;
  return children;
}

// Guard: si NO hizo onboarding, redirige a /
function RequireAuth({ children }) {
  const done = localStorage.getItem("nylaOnboardingDone");
  const name = localStorage.getItem("nylaUserName");
  if (!done || !name) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas — si ya hizo onboarding redirigen a home */}
          <Route path="/" element={
            <RequireOnboarding><Welcome /></RequireOnboarding>
          } />
          <Route path="/onboarding" element={
            
          } />

          {/* Rutas protegidas — requieren onboarding completo */}
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/workout" element={<RequireAuth><Workout /></RequireAuth>} />
          <Route path="/library" element={<RequireAuth><Library /></RequireAuth>} />
          <Route path="/meals" element={<RequireAuth><Meals /></RequireAuth>} />
          <Route path="/affirmations" element={<RequireAuth><Affirmations /></RequireAuth>} />
          <Route path="/cycle" element={<RequireAuth><Cycle /></RequireAuth>} />
          <Route path="/premium" element={<Premium />} />
<Route path="/onboarding" element={<Onboarding />} />


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
