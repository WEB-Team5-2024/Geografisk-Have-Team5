import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseStorage } from '@/composables/useFirebaseStorage';
import { useLocationStore } from '@/stores/location';
import { db } from '@/firebase';
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';


export function useAudioManagement() {
  const areas = ref([]);
  const selectedArea = ref(null);
  const audioURL = ref('');
  const fileInput = ref(null);
  


  watch(
    () => useLocationStore.currentPosition,
    (newPosition) => {
      if (newPosition && newPosition.lat && newPosition.lng) {
        calculateDistances();
      }
    },
    { immediate: true, deep: true }
  );


  function selectArea(areas) {
    selectedArea.value = areas;
    if (!areas.lat || !areas.lng) {
      console.error("Missing latitude or longitude for the area", areas);
      return;
    }
    useLocationStore.updateSelectedArea(areas);
  }

  watch(
    () => useLocationStore.selectedArea,
    (newSelectedArea) => {
      selectedArea.value = newSelectedArea;
    },
    { immediate: true }
  );

  async function fetchAreas() {
    const querySnapshot = await getDocs(collection(db, 'areas'));
    areas.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      mapLocation: doc.data().mapLocation
    }));
  }



  function handleFileSelection(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('File selected:', file.name, file.size, file.type); // This will help you verify the MIME type detection
      fileInput.value = file;
    } else {
      fileInput.value = null;
    }
  }

  const canSubmit = computed(() => {
    return selectedArea.value && fileInput.value;
  });

  async function uploadAudio() {
    if (!fileInput.value || !selectedArea.value) {
      alert('Please select a file and area before uploading!');
      return;
    }

    const file = fileInput.value;
    let metadata = {
      contentType: 'audio/mp3' 
    };

    if (!metadata.contentType && file.name) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension === 'mp3') {
        metadata.contentType = 'audio/mp3';
      } else if (extension === 'wav') {
        metadata.contentType = 'audio/wav';
      }
    }

    const storagePath = `audio/${selectedArea.value}/${file.name}`;
    const storageRef = firebaseRef(storage, storagePath);

    try {
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const url = await getDownloadURL(snapshot.ref);
      audioURL.value = url;
      console.log('Audio uploaded:', url);
      await saveAudioURLToFirestore(url);
      alert('Audio uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed!');
    }
  }

  async function saveAudioURLToFirestore(url) {
    const areaDocRef = doc(db, 'areas', selectedArea.value);

    try {
      await updateDoc(areaDocRef, {
        audioURL: url
      });
      console.log('Audio URL saved to Firestore successfully');
    } catch (error) {
      console.error('Failed to save audio URL to Firestore:', error);
      alert('Failed to save audio URL!');
    }
  }

  return {
    areas,
    selectedArea,
    selectArea,
    audioURL,
    fileInput,
    fetchAreas,
    handleFileSelection,
    canSubmit,
    uploadAudio,
  };
}
