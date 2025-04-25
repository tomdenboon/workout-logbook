import React, { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import * as schema from 'db/schema';
import WlbButton from 'components/WlbButton';
import WlbPage from 'components/WlbPage';
import WlbModalForm from 'components/ModalForm';
import WlbView from 'components/WlbView';
import WlbCard from 'components/WlbCard';
import { useThemedStyleSheet, useTheme } from 'context/theme';
import LineGraph from 'components/graphs/LineGraph';

export default function Measurements() {
  const [addMeasurementModalVisible, setAddMeasurementModalVisible] =
    useState(false);
  const [addPointModalVisible, setAddPointModalVisible] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<number | null>(
    null,
  );

  const { data: measurements } = useLiveQuery(
    db.query.measurements.findMany({
      with: {
        measurementPoints: true,
      },
    }),
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

  const randomMockData = useMemo(() => {
    const data = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1); // Go back 1 year

    for (let i = 0; i < 100; i++) {
      const randomDate =
        startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime());

      data.push({
        value: Math.floor(Math.random() * 100) + 50, // Random value between 50-150
        date: randomDate,
      });
    }

    return data.sort((a, b) => a.value - b.value);
  }, []);

  return (
    <WlbView>
      <WlbPage
        title="Measurements"
        containerStyle={{
          padding: 16,
          gap: 16,
        }}
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
            <LineGraph
              data={measurement.measurementPoints.map((p) => ({
                date: p.date,
                value: p.value,
              }))}
              period="3months"
            />
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
