import React, { useState } from 'react';
import { View, Image, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import WlbButton from './WlbButton';
import { useTheme } from 'context/theme';
import WlbModal from 'components/WlbModal';
import { saveWorkoutImage } from 'utils/imageStorage';
import WlbEmptyState from 'components/WlbEmptyState';

interface PhotoPickerProps {
  photo: string | null;
  onPhotoChange: (photo: string | null) => void;
}

export default function PhotoPicker({
  photo,
  onPhotoChange,
}: PhotoPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'We need camera and photo library permissions to let you add photos to your workouts.',
        [{ text: 'OK' }],
      );
      return false;
    }
    return true;
  };

  const launchImagePicker = async (
    imagePickerFunction: (
      options: ImagePicker.ImagePickerOptions,
    ) => Promise<ImagePicker.ImagePickerResult>,
  ) => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const result = await imagePickerFunction({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setModalVisible(false);
      saveWorkoutImage(result.assets[0].uri).then((path) => {
        onPhotoChange(path);
      });
    }
  };

  const removePhoto = () => {
    onPhotoChange(null);
    setModalVisible(false);
  };

  return (
    <>
      {photo ? (
        <Pressable onPress={() => setModalVisible(true)} style={{ gap: 8 }}>
          <Image
            source={{ uri: photo }}
            style={{
              width: '100%',
              aspectRatio: 1,
              borderRadius: 8,
              backgroundColor: theme.bg,
            }}
            resizeMode="cover"
          />
        </Pressable>
      ) : (
        <WlbEmptyState
          icon="camera"
          description="Add photo"
          onPress={() => setModalVisible(true)}
        />
      )}

      <WlbModal visible={modalVisible} close={() => setModalVisible(false)}>
        <View style={{ gap: 12, padding: 12 }}>
          <WlbButton
            title="Take Photo"
            onPress={() => launchImagePicker(ImagePicker.launchCameraAsync)}
          />

          <WlbButton
            title="Choose from Gallery"
            onPress={() =>
              launchImagePicker(ImagePicker.launchImageLibraryAsync)
            }
          />

          {photo && (
            <WlbButton
              title="Remove Photo"
              onPress={removePhoto}
              color="error"
            />
          )}

          <WlbButton
            title="Cancel"
            color="subAlt"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </WlbModal>
    </>
  );
}
