import { useState, useEffect } from "react";

/**
 * Hook for media queries
 * @param {string} query - Media query string
 * @returns {boolean} - Whether query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

/**
 * Hook for checking if screen is mobile
 * @returns {boolean}
 */
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");

/**
 * Hook for checking if screen is tablet
 * @returns {boolean}
 */
export const useIsTablet = () => useMediaQuery("(max-width: 1024px)");
