import * as FileSystem from 'expo-file-system';

const WORKOUT_IMAGES_DIR = `${FileSystem.documentDirectory}workout-images/`;

async function ensureDirExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, {
      intermediates: true,
    });
  }
}

export async function saveWorkoutImage(imageUri: string): Promise<string> {
  await ensureDirExists(WORKOUT_IMAGES_DIR);

  const timestamp = Date.now();
  const fileExtension = imageUri.split('.').pop() || 'jpg';
  const fileName = `workout_${timestamp}.${fileExtension}`;
  const persistentPath = `${WORKOUT_IMAGES_DIR}${fileName}`;

  await FileSystem.copyAsync({
    from: imageUri,
    to: persistentPath,
  });

  return persistentPath;
}

export async function deleteImage(imagePath: string | null) {
  if (!imagePath) return;

  const fileInfo = await FileSystem.getInfoAsync(imagePath);
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(imagePath);
  }
}
