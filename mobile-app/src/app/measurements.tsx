import React, { useMemo, useState } from 'react';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import * as schema from 'db/schema';
import WlbButton from 'components/WlbButton';
import { WlbScreenPage, WlbHeader } from 'components/WlbPage';
import WlbModalForm from 'components/ModalForm';
import AddMeasurementModal from 'components/AddMeasurementModal';
import WlbCard from 'components/WlbCard';
import LineGraph from 'components/graphs/LineGraph';
import { View, FlatList, Pressable, Image } from 'react-native';
import WlbText from 'components/WlbText';
import { useTheme } from 'context/theme';
import GraphCard from 'components/graphs/GraphCard';
import { router } from 'expo-router';
import WlbEmptyState from 'components/WlbEmptyState';

function ProgressPhotoCard(props: { addProgressPhoto: () => void }) {
  const { data: progressPhotos } = useLiveQuery(
    db.query.progressPhotos.findMany(),
  );

  return (
    <WlbCard title="Progress pictures">
      {progressPhotos?.length === 0 && (
        <View style={{ height: 160, width: 120 }}>
          <WlbEmptyState
            icon="camera"
            onPress={props.addProgressPhoto}
            description="Add photo"
          />
        </View>
      )}
      {progressPhotos?.map((photo) => (
        <View key={photo.id} style={{ height: 100, width: 100 }}>
          <Image
            source={{ uri: photo.photo }}
            style={{
              width: '100%',
              aspectRatio: 1,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        </View>
      ))}
    </WlbCard>
  );
}

export default function Measurements() {
  const theme = useTheme();
  const [addMeasurementModalVisible, setAddMeasurementModalVisible] =
    useState(false);
  const [addPointModalVisible, setAddPointModalVisible] = useState(false);

  const { data: measurements } = useLiveQuery(
    db.query.measurements.findMany({
      with: {
        measurementPoints: {
          orderBy: (measurementPoints, { asc }) => [
            asc(measurementPoints.date),
          ],
        },
      },
    }),
  );

  const addMeasurement = async (value: { name: string }) => {
    await db.insert(schema.measurements).values({ name: value.name });
    setAddMeasurementModalVisible(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatValue = (value: number) => {
    return value.toFixed(1);
  };

  const renderMeasurementPoint = ({
    item,
  }: {
    item: { date: number; value: number };
  }) => (
    <Pressable
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => setAddPointModalVisible(true)}
    >
      <WlbText color="sub">{formatDate(item.date)}</WlbText>
      <WlbText>{formatValue(item.value)}</WlbText>
    </Pressable>
  );

  return (
    <WlbScreenPage
      header={
        <WlbHeader
          title="Measurements"
          headerLeft={
            <WlbButton
              variant="ghost"
              onPress={() => router.back()}
              title="Back"
            />
          }
          headerRight={
            <WlbButton
              variant="ghost"
              onPress={() => setAddPointModalVisible(true)}
              title="Add"
            />
          }
        />
      }
    >
      <ProgressPhotoCard
        addProgressPhoto={() => setAddPointModalVisible(true)}
      />
      {measurements && measurements.length > 0 && (
        <GraphCard
          title="Measurements"
          data={measurements.map((measurement) => ({
            label: measurement.name,
            value: measurement.id.toString(),
            data: measurement.measurementPoints.map((point) => ({
              date: point.date,
              value: point.value,
            })),
          }))}
          GraphComponent={LineGraph}
        >
          {(data) => (
            <WlbCard title="History">
              <FlatList
                data={data.toReversed()}
                renderItem={renderMeasurementPoint}
                keyExtractor={(item) => item.date.toString()}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      marginVertical: 7,
                      backgroundColor: theme.subAlt,
                    }}
                  />
                )}
              />
            </WlbCard>
          )}
        </GraphCard>
      )}

      <WlbModalForm
        visible={addMeasurementModalVisible}
        close={() => setAddMeasurementModalVisible(false)}
        title="Add Measurement"
        init={{ name: '' }}
        inputs={[{ type: 'text', key: 'name', label: 'Measurement Name' }]}
        onSave={addMeasurement}
      />

      <AddMeasurementModal
        visible={addPointModalVisible}
        close={() => setAddPointModalVisible(false)}
        measurements={measurements || []}
      />
    </WlbScreenPage>
  );
}
