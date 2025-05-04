"use client"

import { createContext, useContext } from "react"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  // In light-mode-only version, we just provide a simple context with fixed "light" theme
  const theme = "light"
  const toggleTheme = () => {
    // No-op in light-mode-only version
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
