import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { WlbModalPage, WlbHeader } from 'components/WlbPage';
import WlbButton from 'components/WlbButton';
import WlbText from 'components/WlbText';
import WlbInput from 'components/WlbInput';
import PhotoPicker from 'components/PhotoPicker';
import { useTheme } from 'context/theme';
import { MeasurementFull } from 'db/types';
import db from 'db';
import * as schema from 'db/schema';
import { eq } from 'drizzle-orm';
import { toDateKey } from 'utils/date';

type MeasurementForm = Record<
  number,
  {
    id?: number;
    value: string;
  }
>;

const formatMeasurementValue = (value: number) => {
  return value.toFixed(1);
};

interface AddMeasurementModalProps {
  visible: boolean;
  close: () => void;
  measurements: MeasurementFull[];
}

export default function AddMeasurementModal({
  visible,
  close,
  measurements,
}: AddMeasurementModalProps) {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [photo, setPhoto] = useState<string | null>(null);

  const getExactCurrentDayPoint = (measurement: MeasurementFull) => {
    return measurement.measurementPoints.find(
      (point) => point.dateKey === toDateKey(selectedDate),
    );
  };

  const initialEntries = useMemo(
    () =>
      measurements.reduce<MeasurementForm>((acc, measurement) => {
        const exactCurrentDay = getExactCurrentDayPoint(measurement);
        if (exactCurrentDay) {
          acc[measurement.id] = {
            id: exactCurrentDay.id,
            value: formatMeasurementValue(exactCurrentDay.value),
          };
        }
        return acc;
      }, {}),
    [measurements],
  );

  const [measurementEntries, setMeasurementEntries] =
    useState<MeasurementForm>(initialEntries);

  useEffect(() => {
    if (visible) {
      setSelectedDate(new Date());
      setPhoto(null);
      setMeasurementEntries(initialEntries);
    }
  }, [visible, initialEntries]);

  const updateMeasurementEntry = (measurementId: number, value: string) => {
    setMeasurementEntries((prev) => ({
      ...prev,
      [measurementId]: {
        id: prev[measurementId]?.id,
        value,
      },
    }));
  };

  const handleSave = async () => {
    const entries = Object.entries(measurementEntries).map(
      ([measurementId, value]) => ({
        measurementId: parseInt(measurementId),
        id: value.id,
        date: selectedDate.getTime(),
        dateKey: toDateKey(selectedDate),
        value: value.value.trim() ? parseFloat(value.value) : undefined,
      }),
    );

    entries.forEach(async (entry) => {
      if (entry.id && !entry.value) {
        await db
          .delete(schema.measurementPoints)
          .where(eq(schema.measurementPoints.id, entry.id));
      } else if (entry.id) {
        await db
          .update(schema.measurementPoints)
          .set({ value: entry.value, date: entry.date })
          .where(eq(schema.measurementPoints.id, entry.id));
      } else if (entry.value) {
        await db.insert(schema.measurementPoints).values({
          measurementId: entry.measurementId,
          date: entry.date,
          dateKey: entry.dateKey,
          value: entry.value,
        });
      }
    });

    close();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <WlbModalPage
      visible={visible}
      close={close}
      header={
        <WlbHeader
          title="Add Measurements"
          headerLeft={
            <WlbButton
              icon="close"
              color="subAlt"
              size="small"
              onPress={close}
            />
          }
          headerRight={
            <WlbButton
              color="main"
              variant="ghost"
              title="Save"
              onPress={handleSave}
            />
          }
        />
      }
    >
      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <View style={{ gap: 8 }}>
          <WlbText size={16} fontWeight="bold">
            Progress Photos
          </WlbText>
          <PhotoPicker photo={photo} onPhotoChange={setPhoto} />
        </View>

        <View style={{ gap: 8 }}>
          <WlbText size={16} fontWeight="bold">
            Date
          </WlbText>
          <View
            style={{
              backgroundColor: theme.subAlt,
              padding: 12,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <WlbText>{formatDate(selectedDate)}</WlbText>
            <WlbButton
              title="Today"
              size="small"
              variant="ghost"
              onPress={() => setSelectedDate(new Date())}
            />
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <WlbText size={16} fontWeight="bold">
            Measurements
          </WlbText>
          {measurements.map((measurement) => {
            const mostRecent = measurement.measurementPoints.at(-1);
            const placeholder = mostRecent
              ? formatMeasurementValue(mostRecent.value)
              : '';

            return (
              <View
                key={measurement.id}
                style={{
                  gap: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <WlbText>{measurement.name}</WlbText>
                <WlbInput
                  style={{ width: 80, textAlign: 'center' }}
                  value={measurementEntries[measurement.id]?.value || ''}
                  onChangeText={(value) =>
                    updateMeasurementEntry(measurement.id, value)
                  }
                  size="small"
                  placeholder={placeholder}
                  keyboardType="numeric"
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </WlbModalPage>
  );
}
