import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { WlbModalPage, WlbHeader } from 'components/WlbPage';
import WlbButton from 'components/WlbButton';
import WlbText from 'components/WlbText';
import WlbInput from 'components/WlbInput';
import PhotoPicker from 'components/PhotoPicker';
import { useTheme } from 'context/theme';
import { MeasurementFull, ProgressPhoto } from 'db/types';
import db from 'db';
import * as schema from 'db/schema';
import { eq } from 'drizzle-orm';
import { toDateKey } from 'utils/date';
import { filterMap, toMap } from 'utils/array';
import WlbDateTimePicker from 'components/WlbDatePicker';
import { useUnit } from 'context/unit';

type MeasurementForm = Record<
  number,
  {
    id?: number;
    value: string;
  }
>;

const formatMeasurementValue = (value: number) => {
  return parseFloat(value.toFixed(2)).toString();
};

interface AddMeasurementModalProps {
  date: Date | null;
  close: () => void;
  measurements: MeasurementFull[];
  photos: ProgressPhoto[];
}

export default function AddMeasurementModal({
  date,
  close,
  measurements,
  photos,
}: AddMeasurementModalProps) {
  const [selectedDate, setSelectedDate] = useState(date || new Date());
  const { fieldToSuffix } = useUnit();

  const getExactCurrentDayPoint = (measurement: MeasurementFull) => {
    return measurement.measurementPoints.find(
      (point) => point.dateKey === toDateKey(selectedDate),
    );
  };

  const initialPhoto = useMemo(() => {
    return photos.find((p) => p.dateKey === toDateKey(selectedDate));
  }, [photos, selectedDate]);

  const initialEntries = useMemo(
    () =>
      toMap(filterMap(measurements, getExactCurrentDayPoint), (m) => [
        m.measurementId,
        {
          id: m.id,
          value: formatMeasurementValue(m.value),
        },
      ]),
    [measurements, selectedDate],
  );

  const [photo, setPhoto] = useState<string | null>(
    initialPhoto?.photo || null,
  );
  const [measurementEntries, setMeasurementEntries] =
    useState<MeasurementForm>(initialEntries);

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
      setPhoto(initialPhoto?.photo || null);
      setMeasurementEntries(initialEntries);
    }
  }, [date]);

  useEffect(() => {
    setMeasurementEntries(initialEntries);
    setPhoto(initialPhoto?.photo || null);
  }, [initialEntries, initialPhoto]);

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
    const date = selectedDate.getTime();
    const dateKey = toDateKey(selectedDate);

    const entries = Object.entries(measurementEntries).map(
      ([measurementId, value]) => ({
        measurementId: parseInt(measurementId),
        id: value.id,
        date,
        dateKey,
        value: value.value.trim() ? parseFloat(value.value) : undefined,
      }),
    );

    entries.forEach(async (entry) => {
      if (entry.id) {
        await db
          .delete(schema.measurementPoints)
          .where(eq(schema.measurementPoints.id, entry.id));
      }

      if (entry.value) {
        await db.insert(schema.measurementPoints).values({
          id: entry.id,
          measurementId: entry.measurementId,
          date: entry.date,
          dateKey: entry.dateKey,
          value: entry.value,
        });
      }
    });

    if (initialPhoto) {
      await db
        .delete(schema.progressPhotos)
        .where(eq(schema.progressPhotos.id, initialPhoto.id));
    }

    if (photo) {
      await db.insert(schema.progressPhotos).values({
        id: initialPhoto?.id,
        date,
        dateKey,
        photo,
      });
    }

    close();
  };

  return (
    <WlbModalPage
      visible={!!date}
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
          <PhotoPicker type="progress" photo={photo} onPhotoChange={setPhoto} />
        </View>

        <View style={{ gap: 8 }}>
          <WlbText size={16} fontWeight="bold">
            Date
          </WlbText>
          <WlbDateTimePicker
            value={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
          />
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
                <WlbText>
                  {measurement.name} ({fieldToSuffix(measurement.field)})
                </WlbText>
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
