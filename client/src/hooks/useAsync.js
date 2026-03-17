import { useState, useEffect } from "react";

/**
 * Hook for managing async operations with loading and error states
 * @param {Function} asyncFunction - Async function to execute
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Object} - { execute, data, loading, error }
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFunction(...args);
      setData(response);
      return response;
    } catch (err) {
      setError(err.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { execute, data, loading, error };
};
