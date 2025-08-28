import { useState } from "react";

const useFormLocal = (initialValues, schema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = (key, value) => {
    const fieldSchema = schema?.shape?.[key];
    if (!fieldSchema) return "";

    const result = fieldSchema.safeParse(value);
    return result.success ? "" : result.error.issues[0]?.message || "Invalid";
  };

  const updateValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    updateValue(name, newValue);
  };

  const handleCustomChange = (name, value) => {
    updateValue(name, value);
  };

  const setValue = (key, value) => {
    updateValue(key, value);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validateAll = () => {
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors = {};
    result.error.issues.forEach((issue) => {
      const key = issue.path[0];
      fieldErrors[key] = issue.message;
    });

    setErrors(fieldErrors);
    return false;
  };

  return {
    values,
    errors,
    handleChange,
    handleCustomChange,
    setValue,
    reset,
    validateAll,
  };
};

export default useFormLocal;