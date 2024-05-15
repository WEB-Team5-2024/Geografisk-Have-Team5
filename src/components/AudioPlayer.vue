<template>
  <audio ref="audio" class="audio-player" :src= audioUrl @timeupdate="updateTime"></audio>
  <div class="audio-player-container">
    <div class="controls">
      <div class="cLayout">
        <button @click="rewind">Rewind</button>
        <button @click="togglePlayback">
          <span v-if="isPlaying">Pause</span>
          <span v-else>Play</span>
        </button>
        <button @click="forward">Forward</button>
      </div>
      <button @click="toggleMute">
        <span v-if="!isMuted">Mute</span>
        <span v-else>Unmute</span>
      </button>
    </div>
    <div class="timeline">
      <input type="range" class="seek-slider" :max="audioLength" v-model="currentTime" @input="seekToTime">
      <div class="playhead" :style="{ width: (currentTime / audioLength * 100) + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const audio = ref(null);
let isPlaying = ref(false);
let currentTime = ref(0);
let audioLength = ref(0);
let isMuted = ref(false);

function togglePlayback() {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
}

function toggleMute() {
  audio.value.muted = !audio.value.muted;
  isMuted.value = audio.value.muted;
}

function updateTime() {
  currentTime.value = audio.value.currentTime;
}

function seekToTime() {
  audio.value.currentTime = currentTime.value;
}

function rewind() {
  audio.value.currentTime -= 5;
}

function forward() {
  audio.value.currentTime += 5;
}

onMounted(() => {
  audio.value.addEventListener('timeupdate', updateTime);
  audio.value.addEventListener('loadedmetadata', () => {
    audioLength.value = audio.value.duration;
  });
});
</script>

<style lang="scss">
.audio-player-container {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
}

.controls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}


.timeline {
  position: relative;
}

.seek-slider {
  width: 100%;
  z-index: 6;
}

.playhead {
  position: absolute;
  top: 3px;
  left: 0;
  height: 10px;
  background-color: #3498db;
  border-radius: 5px;
}
.cLayout{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
