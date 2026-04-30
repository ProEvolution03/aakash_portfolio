import { useState, useEffect, useRef } from 'react';

/**
 * Returns the current scroll direction: 'down' | 'up'
 * Ignores micro-movements smaller than `threshold` px to avoid noise.
 */
export function useScrollDirection(threshold = 5) {
  const [direction, setDirection] = useState('down');
  const lastY = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY.current;

      if (Math.abs(delta) < threshold) return; // ignore tiny jitter

      setDirection(delta > 0 ? 'down' : 'up');
      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}
