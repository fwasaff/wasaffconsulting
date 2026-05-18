'use client';
import { useEffect, useRef } from 'react';

interface UseFadeInOptions {
  threshold?: number;
  rootMargin?: string;
  staggerMs?: number;
}

export function useFadeIn<T extends HTMLElement = HTMLElement>(
  options: UseFadeInOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', staggerMs = 80 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll('.fade-in-item');
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    items.forEach((item, i) => {
      (item as HTMLElement).style.transitionDelay = `${i * staggerMs}ms`;
      io.observe(item);
    });

    return () => io.disconnect();
  }, [threshold, rootMargin, staggerMs]);

  return ref;
}
