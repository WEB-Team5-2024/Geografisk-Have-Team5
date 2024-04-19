// vues version af "custom hooks" hedder "composables"
// dette er et composable der tager et filePath-argument og sætter 

import { ref, onMounted } from 'vue';

// tildelt alias for at kende forskel på de forkellige hooks, 
// TLDR; gør globale modules unikke.  
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

// exporter useFireBaseStorage hook som en function med et argument
export function useFirebaseStorage(filePath) {

    const imageUrl = ref('');

  onMounted(async () => {
    try {
      const storage = getStorage();
      const storageReference = storageRef(storage, filePath);
      console.log(storageReference)
      // henter image url fra reference og omdanner til imageUrl: 
      const url = await getDownloadURL(storageReference);
      imageUrl.value = url;
      
    } catch (error) {
      console.error('Error getting download URL:', error);
    }
  });
  return {
    imageUrl
  };
}
