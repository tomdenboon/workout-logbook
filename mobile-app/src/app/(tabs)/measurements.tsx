import React, { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import * as schema from 'db/schema';
import WlbButton from 'components/WlbButton';
import { WlbScreenPage, WlbHeader } from 'components/WlbPage';
import WlbModalForm from 'components/ModalForm';
import WlbCard from 'components/WlbCard';
import LineGraph from 'components/graphs/LineGraph';
import { ScrollView, View } from 'react-native';

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

  return (
    <WlbScreenPage
      header={
        <WlbHeader
          title="Measurements"
          headerRight={
            <WlbButton
              variant="ghost"
              onPress={() => setAddMeasurementModalVisible(true)}
              title="New"
            />
          }
        />
      }
    >
      {measurements?.map((measurement) => (
        <WlbCard
          key={measurement.id}
          title={measurement.name}
          titleRight={
            <WlbButton
              variant="ghost"
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
    </WlbScreenPage>
  );
}
