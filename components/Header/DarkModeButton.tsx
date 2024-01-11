import { useTheme } from 'next-themes'

export function DarkModeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <a
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="cursor-pointer inline-flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1 select-none"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 stroke-gray-800 dark:stroke-white"
      >
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
        <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"></path>
      </svg>
    </a>
  )
}
