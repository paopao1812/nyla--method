
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
import Login from "./pages/Login";
import Register from "./pages/Register";

// Guard: si ya hizo onboarding, redirige a /home
function RequireAuth({ children }) {
  const done = localStorage.getItem("nylaOnboardingDone");
  const email = localStorage.getItem("nylaUserEmail");
  const name = localStorage.getItem("nylaUserName");
  if (!done || (!email && !name)) return <Navigate to="/login" replace />;
  return children;
}

// Guard: si NO hizo onboarding, redirige a /
export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas — si ya hizo onboarding redirigen a home */}
          <Route path="/" element={<Welcome />} />
          
          <Route path="/onboarding" element={<Onboarding />
            
          } />

          {/* Rutas protegidas — requieren onboarding completo */}
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/workout" element={<RequireAuth><Workout /></RequireAuth>} />
          <Route path="/library" element={<RequireAuth><Library /></RequireAuth>} />
          <Route path="/meals" element={<RequireAuth><Meals /></RequireAuth>} />
          <Route path="/affirmations" element={<RequireAuth><Affirmations /></RequireAuth>} />
          <Route path="/cycle" element={<RequireAuth><Cycle /></RequireAuth>} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
