
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

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/library" element={<Library />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/affirmations" element={<Affirmations />} />
          <Route path="/cycle" element={<Cycle />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}