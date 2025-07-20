import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { WlbScreenPage, WlbHeader } from 'components/WlbPage';
import WlbCard from 'components/WlbCard';
import WlbButton from 'components/WlbButton';
import WlbText from 'components/WlbText';
import WlbSelect from 'components/WlbSelect';
import ThemeSelector from 'components/home/ThemeSelector';
import { seedData } from 'db/seed';
import { router } from 'expo-router';
import { setDistanceUnit, setWeightUnit, setSetting } from 'db/mutation';
import { useUnit } from 'context/unit';
import { useSetting } from 'hooks/useSetting';
import { exportWorkoutsToCSV } from 'utils/dataExport';
import WlbButtonGroup from 'components/WlbButtonGroup';

function SettingsRow({
  label,
  action,
  description,
}: {
  label: string;
  action: React.ReactNode;
  description?: string;
}) {
  return (
    <View style={{ gap: 4 }}>
      <WlbText color="sub">{label}</WlbText>
      {description && <WlbText>{description}</WlbText>}
      {action}
    </View>
  );
}

export default function SettingsTab() {
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [exportingCSV, setExportingCSV] = useState(false);
  const { weightUnit, distanceUnit } = useUnit();
  const restTimerSound = useSetting<string>('restTimerSound', 'Default');

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            seedData({ reset: true });
            Alert.alert('Success', 'Data has been reset successfully.');
          },
        },
      ],
    );
  };

  const handleExportCSV = () => {
    setExportingCSV(true);
    exportWorkoutsToCSV().then(() => {
      setExportingCSV(false);
    });
  };

  return (
    <WlbScreenPage
      header={
        <WlbHeader
          title="Settings"
          headerLeft={
            <WlbButton
              variant="ghost"
              title="Back"
              onPress={() => router.back()}
            />
          }
        />
      }
    >
      <SettingsRow
        label="Weight Unit"
        action={
          <WlbButtonGroup
            options={
              [
                { label: 'kg', value: 'kg' },
                { label: 'lbs', value: 'lbs' },
              ] as const
            }
            fullWidth
            value={weightUnit}
            onChange={(value) => {
              setWeightUnit(value);
            }}
          />
        }
      />

      <SettingsRow
        label="Distance Unit"
        action={
          <WlbButtonGroup
            options={
              [
                { label: 'kilometers', value: 'km' },
                { label: 'miles', value: 'mi' },
              ] as const
            }
            fullWidth
            value={distanceUnit}
            onChange={(value) => setDistanceUnit(value)}
          />
        }
      />

      <SettingsRow
        label="Rest Timer Sound"
        action={
          <WlbSelect
            value={restTimerSound}
            onChange={(value) => setSetting('restTimerSound', value)}
            options={
              [
                { label: 'None', value: 'None' },
                { label: 'Default', value: 'Default' },
              ] as const
            }
          />
        }
      />

      <SettingsRow
        label="Theme"
        action={
          <WlbButton
            color="subAlt"
            title="Change Theme"
            icon="palette"
            onPress={() => setThemeModalVisible(true)}
          />
        }
      />

      <SettingsRow
        label="Export"
        description="Export your workout data, add sample data, or reset if needed"
        action={
          <WlbButton
            color="subAlt"
            title="CSV"
            icon="download"
            onPress={exportingCSV ? () => {} : handleExportCSV}
          />
        }
      />

      <SettingsRow
        label="Reset All Data"
        action={
          <WlbButton
            color="error"
            title="Reset All Data"
            icon="delete"
            onPress={handleResetData}
          />
        }
      />

      <ThemeSelector
        visible={themeModalVisible}
        setVisible={setThemeModalVisible}
      />
    </WlbScreenPage>
  );
}
