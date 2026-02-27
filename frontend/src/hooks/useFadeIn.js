import { useRef, useEffect } from 'react';

/**
 * Returns a ref — attach to any element to trigger the
 * `.visible` class when it enters the viewport.
 * Pair with `.fade-section` CSS class.
 */
export function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
