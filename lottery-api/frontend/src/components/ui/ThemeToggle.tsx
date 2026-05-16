import { Moon, Sun } from 'lucide-react'
import { useAppStore } from '../../store'

export const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useAppStore()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export default ThemeToggle