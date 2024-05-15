<template>
    <section class="admin-section">
        <h2>Audio Management</h2>
        <div class="audio-uploader">
            <input type="file" ref="fileInput" @change="handleFileSelection" accept="audio/*" id="audio-file" style="display: none;"/>
            <label for="audio-file" class="upload-btn">Choose Audio</label>
            <select v-model="selectedArea">
                <option disabled value="">Select Area</option>
                <option v-for="area in areas" :key="area.id" :value="area.id">{{ area.name }}</option>
            </select>      
            <button @click="uploadAudio" :disabled="!canSubmit" class="submit-btn">Upload Audio</button>

        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
const db = getFirestore();
const areas = ref([]);
const selectedArea = ref('');
const audioURL = ref('');
const fileInput = ref(null);
async function fetchAreas() {
    const querySnapshot = await getDocs(collection(db, 'areas'));
    areas.value = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
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
        contentType: 'audio/mpeg' 
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
onMounted(async () => {
    await fetchAreas();
});
</script>
<style lang="scss" scoped>
@import '../styles/global.scss';
.admin-section {
    margin-bottom: 2rem;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    h2 {
        font-size: 18px;
        margin-bottom: 15px;
        text-align: center;
        color: #333;
    }
}
.audio-uploader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.upload-btn, .submit-btn {
    background-color: $primary-color;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: darken($primary-color, 10%);
    }
    &:disabled {
        background-color: lighten($primary-color, 20%);
        cursor: not-allowed;
    }
}
select {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>