import { useEffect, RefObject, useRef } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event?: MouseEvent | TouchEvent) => void
) => {
  const handlerRef = useRef(handler);

  // handler를 ref에 저장하여 최신 값을 유지
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        (ref.current && ref.current.contains(event.target as Node))
      ) {
        return;
      }

      handlerRef.current(event ?? undefined);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]); // handler를 의존성 배열에서 제거
};
