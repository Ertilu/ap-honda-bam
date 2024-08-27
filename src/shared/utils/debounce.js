import { useEffect, useState } from 'react'

export const useDebounce = (value, delay = 600, minLengthValue = 1) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value?.length >= (minLengthValue ?? 3) || value?.length === 0) {
        setDebouncedValue(value)
      }
    }, delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay, minLengthValue])

  return debouncedValue
}
