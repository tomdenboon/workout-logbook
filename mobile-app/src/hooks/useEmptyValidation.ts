import { useState, useCallback } from 'react';

export function useValidation<T extends Record<string, any>>(
  data: T,
  fields: (keyof T)[],
) {
  const [errors, setErrors] = useState<(keyof T)[]>([]);

  const isEmpty = (value: any) => value == null || value === '';

  const validate = useCallback(
    (options: { noErrors?: boolean } = {}) => {
      const newErrors = fields.filter((field) => isEmpty(data[field]));
      if (!options.noErrors) setErrors(newErrors);
      return newErrors.length === 0;
    },
    [data, fields],
  );

  const hasError = useCallback(
    (field: keyof T) => errors.includes(field) && isEmpty(data[field]),
    [data, errors],
  );

  return { errors, validate, hasError };
}
