import { FaSun, FaMoon } from 'react-icons/fa'
import { useDarkMode } from '../../hooks/useDarkMode'

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
    </button>
  )
}
