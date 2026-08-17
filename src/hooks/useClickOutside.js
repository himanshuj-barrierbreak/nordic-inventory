import { useEffect, useRef } from 'react';

export function useClickOutside(ref, handler) {
  const cb = useRef(handler);
  useEffect(() => {
    cb.current = handler;
  });
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) cb.current();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref]);
}