import React, { useState } from 'react';
import { View, Image, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import WlbButton from './WlbButton';
import { WlbModalPage, WlbHeader } from './WlbPage';
import WlbText from './WlbText';
import { useTheme } from 'context/theme';
import WlbModal from 'components/WlbModal';

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

  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  };

  const launchImagePicker = async (
    imagePickerFunction: (
      options: ImagePicker.ImagePickerOptions,
    ) => Promise<ImagePicker.ImagePickerResult>,
  ) => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const result = await imagePickerFunction(options);

    if (!result.canceled && result.assets[0]) {
      setModalVisible(false);
      onPhotoChange(result.assets[0].uri);
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
              backgroundColor: theme.sub,
            }}
            resizeMode="cover"
          />
        </Pressable>
      ) : (
        <WlbButton
          title="Add Photo"
          onPress={() => setModalVisible(true)}
          variant="ghost"
        />
      )}

      <WlbModal visible={modalVisible} close={() => setModalVisible(false)}>
        <View style={{ gap: 16, padding: 16 }}>
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
