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
import {
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import WlbText from 'components/WlbText';
import { useTheme } from 'context/theme';
import GraphCard from 'components/graphs/GraphCard';
import { router } from 'expo-router';
import WlbEmptyState from 'components/WlbEmptyState';
import { asc } from 'drizzle-orm';
import { ProgressPhoto } from 'db/types';
import { useUnit } from 'context/unit';

function ProgressPhotoCard(props: {
  addProgressPhoto: () => void;
  progressPhotos: ProgressPhoto[];
}) {
  const { progressPhotos, addProgressPhoto } = props;

  return (
    <WlbCard title="Progress pictures">
      {progressPhotos.length === 0 && (
        <View style={{ height: 160, width: 120 }}>
          <WlbEmptyState
            icon="camera"
            onPress={addProgressPhoto}
            description="Add photo"
          />
        </View>
      )}
      {progressPhotos.map((photo) => (
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
  const [addDate, setAddDate] = useState<Date | null>(null);
  const { formatValueWithUnit } = useUnit();

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
  const { data: progressPhotos } = useLiveQuery(
    db.query.progressPhotos.findMany({
      orderBy: [asc(schema.progressPhotos.date)],
    }),
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
              onPress={() => setAddDate(new Date())}
              title="Add"
            />
          }
        />
      }
    >
      <ProgressPhotoCard
        addProgressPhoto={() => setAddDate(new Date())}
        progressPhotos={progressPhotos || []}
      />
      {measurements && measurements.length > 0 && (
        <GraphCard
          title="Measurements"
          data={measurements.map((measurement) => ({
            label: measurement.name,
            value: measurement.id.toString(),
            valueFormatter: (value: number) =>
              formatValueWithUnit(value, measurement.field),
            data: measurement.measurementPoints.map((point) => ({
              date: point.date,
              value: point.value,
            })),
          }))}
          GraphComponent={LineGraph}
        >
          {(data, valueFormatter) => (
            <WlbCard title="History">
              <FlatList
                data={data.toReversed()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 12,
                    }}
                    onPress={() => setAddDate(new Date(item.date))}
                  >
                    <WlbText>{formatDate(item.date)}</WlbText>
                    <WlbText>
                      {valueFormatter?.(item.value) || item.value}
                    </WlbText>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.date.toString()}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: theme.subAlt,
                    }}
                  />
                )}
              />
            </WlbCard>
          )}
        </GraphCard>
      )}

      <AddMeasurementModal
        date={addDate}
        close={() => setAddDate(null)}
        measurements={measurements || []}
        photos={progressPhotos || []}
      />
    </WlbScreenPage>
  );
}
