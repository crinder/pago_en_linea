import { useState, useEffect } from "react";
import { useWizardStore } from "../utils/Persists";

const useForm = (initialValues, schema) => {
  

  const formData = useWizardStore((state) => state.formData);
  const setFormData = useWizardStore((state) => state.setFormData);

  const [values, setValues] = useState((initialValues) => ({
    ...initialValues,
    ...formData,
  }));

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues((prev) => ({ ...prev, ...formData }));
  }, []);

  const validateField = (key, value) => {
    const fieldSchema = schema?.shape?.[key];
    if (!fieldSchema) return "";

    const result = fieldSchema.safeParse(value);
    return result.success ? "" : result.error.issues[0]?.message || "Invalid";
  };

  const updateValue = (name, value) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };
      setFormData({ [name]: value });
      return updated;
    });

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
    setFormData(initialValues);
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

export default useForm;