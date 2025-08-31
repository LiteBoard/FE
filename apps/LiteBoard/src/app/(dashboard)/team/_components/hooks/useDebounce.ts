import { useState, useCallback } from 'react';

/**
 * 디바운스 훅
 * @param callback 실행할 콜백 함수
 * @param delay 지연 시간 (밀리초)
 * @returns 디바운스된 함수
 */
export const useDebounce = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      const newTimeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
      
      setTimeoutId(newTimeoutId);
    }) as T,
    [callback, delay, timeoutId]
  );
}; 