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
            <p>Selected area: {{ selectedAreaName }}</p>      
            <button @click="uploadAudio" :disabled="!canSubmit" class="submit-btn">Upload Audio</button>
        </div>
    </section>
</template>

<script setup>
import { useAudioManagement } from '@/composables/useAudioManagement';

const { 
    areas, 
    selectedArea, 
    selectedAreaName, 
    handleFileSelection, 
    canSubmit, 
    uploadAudio 
} = useAudioManagement();

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
