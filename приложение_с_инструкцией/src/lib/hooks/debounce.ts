import { useState, useEffect } from 'react';

/**
 * Debounce hook.
 * @param value Value to listen.
 * @param delay Delay in ms.
 */
export default function useDebounce<T>(value: T, delay: number): T {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value],
  );

  return debouncedValue;
}
