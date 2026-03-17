import { useState, useEffect } from "react";

/**
 * Hook for managing form state with automatic handling
 * @param {Object} initialState - Initial form state
 * @param {Function} onSubmit - Submit callback
 * @returns {Object} - { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, setFieldValue, setFieldError }
 */
export const useForm = (initialState, onSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  };

  const setFieldValue = (fieldName, value) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const setFieldError = (fieldName, errorMsg) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMsg,
    }));
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    isSubmitting,
  };
};
