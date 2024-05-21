<template>
  <div>
    <audio class="styled-audio-player" ref="audioPlayer">
      <!-- injecter audioUrl som er lavet om til src prop -->
      <source :src="src" />
      Your browser does not support the audio element.
    </audio>
    <div class="controls" v-if="src && audioPlayer">
      <div class="cFirstRow">

        <!-- tom kasse så audioplayeren ligner konceptet -->
        <router-link to="/admin"><div id="empty"></div></router-link>

        <div class="audioControls">
          
          <button @click="rewind">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-skip-backward-fill" viewBox="0 0 16 16">
              <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5"/>
            </svg>
          </button>

          <button @click="togglePlayback">
            <span v-if="isPlaying">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
              </svg>
            </span>
            <span v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
              </svg>
            </span>

          </button>

          <button @click="forward">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-skip-forward-fill" viewBox="0 0 16 16">
              <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5"/>
            </svg>
          </button>

        </div>

        <button class="mute" @click="toggleMute">
          <span v-if="isMuted">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
              <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-volume-off-fill" viewBox="0 0 16 16">
              <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
            </svg>
          </span>
        </button>
      </div>

      <input 
          type="range" 
          min="0" 
          :max="duration" 
          step="1" 
          v-model="currentTime" 
          @input="seek" 
        />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  src: String
});

const isPlaying = ref(false);
const audioPlayer = ref(null);
const isMuted = ref(false);
const currentTime = ref(0);

const togglePlayback = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const rewind = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime -= 5;
  }
};

const forward = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime += 5;
  }
};

const toggleMute = () => {
  if (audioPlayer.value) {
    audioPlayer.value.muted = !audioPlayer.value.muted;
    isMuted.value = audioPlayer.value.muted;
  } else {
    console.error("Audio player is not defined");
  }
};

const seek = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = currentTime.value;
  }
};

const duration = computed(() => {
  return audioPlayer.value ? audioPlayer.value.duration : 0;
});

</script>

<style scoped lang="scss">
@import '@/styles/global.scss';


button {
  @include button;
  margin-left: auto;
  margin-right: auto;
}

.styled-audio-player {
  width: 100%;
  margin-top: 20px;
}
audio::-webkit-media-controls-panel {
  background-color: #f0f0f0;
}

.controls {
  background-color: $secondary-color;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  bottom: 76px;
}
.controls button { 
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  box-shadow: none;
  border-radius: 0px;

}
.audioControls {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  width: 150px;
}
.mute{
  width:min-content;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 8px;
}

#empty {
  background-color: $secondary-color;
  width: 50px;
  height: 50px;
}
.cFirstRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.slider {
  -webkit-appearance: none; 
  width: 100%; 
  height: 10px; 
  background: $secondary-color; 
  border-radius: 5px; 
}
</style>
