import * as FileSystem from 'expo-file-system';

const WORKOUT_IMAGES_DIR = `${FileSystem.documentDirectory}workout-images/`;
const PROGRESS_PHOTOS_DIR = `${FileSystem.documentDirectory}progress-photos/`;

async function ensureDirExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, {
      intermediates: true,
    });
  }
}

export async function saveImage(
  imageUri: string,
  type: 'workout' | 'progress',
): Promise<string> {
  const dir = type === 'workout' ? WORKOUT_IMAGES_DIR : PROGRESS_PHOTOS_DIR;
  await ensureDirExists(dir);

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
