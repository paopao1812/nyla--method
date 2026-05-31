
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(() =>
    localStorage.getItem("nylaUserName") || ""
  );

  const saveName = (name) => {
    localStorage.setItem("nylaUserName", name);
    setUserName(name);
  };

  const resetProgress = () => {
    // Borra solo el progreso, NO el nombre ni el onboarding
    localStorage.removeItem("nylaCompletedDays");
    localStorage.removeItem("nylaExerciseWeights");
    localStorage.removeItem("nylaInternalWeek");
    localStorage.removeItem("nylaLastPeriodDate");
    localStorage.removeItem("nylaFavoriteAffirmation");
    localStorage.removeItem("nylaRestDuration");
  };

  const resetAll = () => {
    // Borra TODO — solo para el botón explícito de reinicio
    localStorage.removeItem("nylaUserName");
    localStorage.removeItem("nylaOnboardingDone");
    localStorage.removeItem("nylaGoal");
    localStorage.removeItem("nylaLevel");
    localStorage.removeItem("nylaDays");
    localStorage.removeItem("nylaCompletedDays");
    localStorage.removeItem("nylaExerciseWeights");
    localStorage.removeItem("nylaInternalWeek");
    localStorage.removeItem("nylaLastPeriodDate");
    localStorage.removeItem("nylaFavoriteAffirmation");
    localStorage.removeItem("nylaRestDuration");
    setUserName("");
  };

  return (
    <UserContext.Provider value={{ userName, saveName, resetProgress, resetAll }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}