import { useEffect, useRef, useState } from "react";

/**
 * Hook for intersection observer (lazy loading)
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - { ref, isVisible }
 */
export const useIntersectionObserver = (
  options = {
    threshold: 0.1,
    rootMargin: "0px",
  },
) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isVisible };
};
