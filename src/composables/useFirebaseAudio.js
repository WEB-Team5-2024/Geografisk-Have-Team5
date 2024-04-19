// Create a new composable named useFirebaseAudio
import { ref, onMounted } from 'vue';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export function useFirebaseAudio(filePath) {
  const audioUrl = ref('');

  onMounted(async () => {
    try {
      const storage = getStorage();
      const storageReference = storageRef(storage, filePath);
      console.log(storageReference)
      const url = await getDownloadURL(storageReference);
      audioUrl.value = url;
      console.log(audioUrl);
    } catch (error) {
      console.error('Error getting download URL:', error);
    }
  });

  return {
    audioUrl
  };
}
