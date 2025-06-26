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

export default function SettingsTab() {
  const [themeModalVisible, setThemeModalVisible] = useState(false);
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

  const handleSeedData = () => {
    Alert.alert(
      'Seed Data',
      'This will add sample data to your app. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add Sample Data',
          onPress: () => {
            seedData({ reset: false });
            Alert.alert('Success', 'Sample data has been added.');
          },
        },
      ],
    );
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
      <WlbCard title="Units">
        <View style={{ gap: 12 }}>
          <View style={{ gap: 8 }}>
            <WlbText size={16} color="subAlt">
              Weight
            </WlbText>
            <WlbSelect
              options={
                [
                  { label: 'Kilograms (kg)', value: 'kg' },
                  { label: 'Pounds (lbs)', value: 'lbs' },
                ] as const
              }
              value={weightUnit}
              onChange={(value) => setWeightUnit(value)}
            />
          </View>
          <View style={{ gap: 8 }}>
            <WlbText size={16} color="subAlt">
              Distance
            </WlbText>
            <WlbSelect
              options={
                [
                  { label: 'Kilometers (km)', value: 'km' },
                  { label: 'Miles (mi)', value: 'mi' },
                ] as const
              }
              value={distanceUnit}
              onChange={(value) => setDistanceUnit(value)}
            />
          </View>
        </View>
      </WlbCard>

      <WlbCard title="Rest Timer">
        <View style={{ gap: 12 }}>
          <View style={{ gap: 8 }}>
            <WlbText size={16} color="subAlt">
              Notification Sound
            </WlbText>
            <WlbSelect
              options={
                [
                  { label: 'None', value: 'None' },
                  { label: 'Default', value: 'Default' },
                ] as const
              }
              value={restTimerSound}
              onChange={(value) => setSetting('restTimerSound', value)}
            />
          </View>
          <WlbText size={14} color="sub">
            Choose the sound that plays when your rest timer completes. The
            phone will always vibrate regardless of sound setting.
          </WlbText>
        </View>
      </WlbCard>

      <WlbCard title="Appearance">
        <View style={{ gap: 12 }}>
          <WlbButton
            color="subAlt"
            title="Change Theme"
            icon="palette"
            onPress={() => setThemeModalVisible(true)}
          />
          <WlbText size={14} color="sub">
            Customize the app's appearance with different color themes
          </WlbText>
        </View>
      </WlbCard>

      <WlbCard title="Data Management">
        <View style={{ gap: 12 }}>
          <WlbButton
            color="subAlt"
            title="Add Sample Data"
            icon="add"
            onPress={handleSeedData}
          />
          <WlbButton
            color="error"
            title="Reset All Data"
            icon="delete"
            onPress={handleResetData}
          />
          <WlbText size={14} color="sub">
            Manage your workout data and reset if needed
          </WlbText>
        </View>
      </WlbCard>

      <WlbCard title="About">
        <View style={{ gap: 12 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <WlbText size={16} color="text">
              App Version
            </WlbText>
            <WlbText size={16} color="sub">
              1.0.0
            </WlbText>
          </View>
          <WlbText size={14} color="sub">
            Workout Logbook - Track your fitness journey
          </WlbText>
        </View>
      </WlbCard>
      <ThemeSelector
        visible={themeModalVisible}
        setVisible={setThemeModalVisible}
      />
    </WlbScreenPage>
  );
}
