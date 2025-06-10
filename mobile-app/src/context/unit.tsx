import React, { createContext, useContext, ReactNode } from 'react';
import { useSetting } from 'hooks/useSetting';
import { formatTime } from 'hooks/useTimer';

interface UnitContextType {
  weightUnit: 'kg' | 'lbs';
  distanceUnit: 'km' | 'mi';
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

  const formatValueWithUnit = (value: number, field?: string) => {
    const displayValue = convertToDisplayUnit(value, field);

    if (field === 'weight') {
      return `${parseFloat(displayValue.toFixed(1))} ${weightUnit}`;
    }
    if (field === 'distance') {
      return `${parseFloat(displayValue.toFixed(1))} ${distanceUnit}`;
    }
    if (field === 'time') {
      return formatTime(displayValue, 'pretty');
    }
    if (field === 'reps') {
      return `${displayValue.toString()} reps`;
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

    return value;
  };

  const convertToStorageUnit = (value: number, field: string) => {
    if (field === 'weight' && weightUnit === 'lbs') {
      return value / 2.20462;
    }
    if (field === 'distance' && distanceUnit === 'mi') {
      return value / 0.621371;
    }

    return value;
  };

  const value: UnitContextType = {
    formatValueWithUnit,
    convertToDisplayUnit,
    convertToStorageUnit,
    weightUnit,
    distanceUnit,
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}
