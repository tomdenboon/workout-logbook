import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import * as schema from 'db/schema';
import WlbButton from 'components/WlbButton';
import WlbPage from 'components/WlbPage';
import WlbModalForm from 'components/ModalForm';
import WlbView from 'components/WlbView';
import WlbCard from 'components/WlbCard';
import { useThemedStyleSheet, useTheme } from 'context/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WlbText from 'components/WlbText';
import LineGraph from 'components/LineGraph';

export default function Measurements() {
  const [addMeasurementModalVisible, setAddMeasurementModalVisible] =
    useState(false);
  const [addPointModalVisible, setAddPointModalVisible] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<number | null>(
    null,
  );

  const { data: measurements } = useLiveQuery(
    db.select().from(schema.measurements).orderBy(schema.measurements.name),
  );

  const { data: measurementPoints } = useLiveQuery(
    db
      .select()
      .from(schema.measurementPoints)
      .orderBy(schema.measurementPoints.date),
  );

  const addMeasurement = async (value: { name: string }) => {
    await db.insert(schema.measurements).values({ name: value.name });
    setAddMeasurementModalVisible(false);
  };

  const addMeasurementPoint = async (value: {
    name: string;
    value: string;
  }) => {
    if (selectedMeasurement !== null) {
      await db.insert(schema.measurementPoints).values({
        measurementId: selectedMeasurement,
        date: Date.now(),
        value: parseFloat(value.value),
      });
      setAddPointModalVisible(false);
    }
  };

  useEffect(() => {
    db.delete(schema.measurementPoints);
    db.delete(schema.measurements);
  }, []);

  const theme = useTheme();

  const mockPoints = [
    {
      value: 1,
      date: new Date('2024-01-01'),
    },
    {
      value: 2,
      date: new Date('2024-01-02'),
    },
    {
      value: 3,
      date: new Date('2024-01-03'),
    },
    {
      value: 2,
      date: new Date('2024-01-04'),
    },
  ];
  return (
    <WlbView>
      <WlbPage
        title="Measurements"
        headerRight={
          <WlbButton
            variant="text"
            onPress={() => setAddMeasurementModalVisible(true)}
            title="New"
          />
        }
      >
        {measurements?.map((measurement) => (
          <WlbCard
            key={measurement.id}
            title={measurement.name}
            titleRight={
              <WlbButton
                variant="text"
                size="small"
                title="Add Point"
                onPress={() => setAddPointModalVisible(true)}
              />
            }
          >
            <LineGraph />
          </WlbCard>
        ))}

        <WlbModalForm
          visible={addMeasurementModalVisible}
          close={() => setAddMeasurementModalVisible(false)}
          title="Add Measurement"
          init={{ name: '' }}
          inputs={[{ type: 'text', key: 'name', label: 'Measurement Name' }]}
          onSave={addMeasurement}
        />

        <WlbModalForm
          visible={addPointModalVisible}
          close={() => setAddPointModalVisible(false)}
          title="Add Measurement Point"
          init={{ name: '', value: '' }}
          inputs={[
            { type: 'text', key: 'name', label: 'Point Name' },
            { type: 'text', key: 'value', label: 'Value' },
          ]}
          onSave={addMeasurementPoint}
        />
      </WlbPage>
    </WlbView>
  );
}

const useStyles = () =>
  useThemedStyleSheet((theme) => ({
    measurementContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.subAlt,
    },
    measurementItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    measurementName: {
      fontSize: 16,
      color: theme.text,
    },
    pressed: {
      opacity: 0.7,
    },
  }));
