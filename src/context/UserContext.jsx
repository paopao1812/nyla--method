import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(
    localStorage.getItem('nyla-name') || ''
  )
  const [currentWeek, setCurrentWeek] = useState(
    parseInt(localStorage.getItem('nyla-week')) || 1
  )
  const [completedDays, setCompletedDays] = useState(
    JSON.parse(localStorage.getItem('nyla-completed')) || {}
  )

  function saveName(name) {
    setUserName(name)
    localStorage.setItem('nyla-name', name)
  }

  function markDayComplete(weekDay) {
    const updated = { ...completedDays, [weekDay]: true }
    setCompletedDays(updated)
    localStorage.setItem('nyla-completed', JSON.stringify(updated))
  }

  function isDayComplete(weekDay) {
    return !!completedDays[weekDay]
  }

  return (
    <UserContext.Provider value={{
      userName,
      saveName,
      currentWeek,
      setCurrentWeek,
      markDayComplete,
      isDayComplete,
      completedDays
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}