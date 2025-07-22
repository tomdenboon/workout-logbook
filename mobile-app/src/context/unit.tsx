import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useSetting } from 'hooks/useSetting';
import { formatTime } from 'hooks/useTimer';

interface UnitContextType {
  weightUnit: 'kg' | 'lbs';
  distanceUnit: 'km' | 'mi';
  measurementUnit: 'cm' | 'in';
  fieldToSuffix: (field: string) => string;
  formatValueWithUnit: (value: number, field: string) => string;
  convertToDisplayUnit: (value: number, field: string) => number;
  convertToStorageUnit: (value: number, field: string) => number;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function useUnit(): UnitContextType {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

interface UnitProviderProps {
  children: ReactNode;
}

export function UnitProvider({ children }: UnitProviderProps) {
  const weightUnit = useSetting<'kg' | 'lbs'>('weightUnit', 'kg');
  const distanceUnit = useSetting<'km' | 'mi'>('distanceUnit', 'km');
  const measurementUnit = useSetting<'cm' | 'in'>('measurementUnit', 'cm');

  const fieldToSuffix = (field: string) => {
    if (field === 'weight') {
      return weightUnit;
    }
    if (field === 'distance') {
      return distanceUnit;
    }
    if (field === 'measurement') {
      return measurementUnit;
    }
    if (field === 'percentage') {
      return '%';
    }
    if (field === 'reps') {
      return 'reps';
    }

    return '';
  };

  const formatValueWithUnit = (value: number, field?: string) => {
    const displayValue = convertToDisplayUnit(value, field);

    if (
      field &&
      ['weight', 'distance', 'measurement', 'reps', 'percentage'].includes(
        field,
      )
    ) {
      return `${parseFloat(displayValue.toFixed(1))} ${fieldToSuffix(field)}`;
    }
    if (field === 'time') {
      return formatTime(displayValue, 'digital');
    }

    return displayValue.toString();
  };

  const convertToDisplayUnit = (value: number, field?: string) => {
    if (field === 'weight' && weightUnit === 'lbs') {
      return value * 2.20462;
    }
    if (field === 'distance' && distanceUnit === 'mi') {
      return value * 0.621371;
    }
    if (field === 'measurement' && measurementUnit === 'in') {
      return value * 2.54;
    }

    return value;
  };

  const convertToStorageUnit = (value: number, field: string) => {
    if (field === 'weight' && weightUnit === 'lbs') {
      return value / 2.20462;
    }
    if (field === 'distance' && distanceUnit === 'mi') {
      return value / 0.621371;
    }
    if (field === 'measurement' && measurementUnit === 'in') {
      return value / 2.54;
    }

    return value;
  };

  const value: UnitContextType = useMemo(
    () => ({
      formatValueWithUnit,
      convertToDisplayUnit,
      convertToStorageUnit,
      fieldToSuffix,
      weightUnit,
      distanceUnit,
      measurementUnit,
    }),
    [weightUnit, distanceUnit, measurementUnit],
  );

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}
