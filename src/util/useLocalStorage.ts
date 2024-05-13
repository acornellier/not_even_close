import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T, json = true) {
  const [value, setValue] = useState(() => {
    let currentValue: T

    try {
      const storedValue = localStorage.getItem(key)
      currentValue = json
        ? JSON.parse(storedValue ?? String(defaultValue))
        : storedValue ?? defaultValue
    } catch (error) {
      currentValue = defaultValue
    }

    return currentValue
  })

  useEffect(() => {
    localStorage.setItem(key, json ? JSON.stringify(value) : (value as string))
  }, [value, key, json])

  return [value, setValue] as const
}
