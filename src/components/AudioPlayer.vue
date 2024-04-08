<template>
    <div>
      {{ currentAudioName || audioList[0].name }}
      <audio-player
        ref="audioPlayer"
        :audio-list="audioList.map(elm => elm.url)"
        :before-play="handleBeforePlay"
        theme-color="#ff2929"
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentAudioName: '',
        audioList: [
          {
            name: 'audio1',
            url: '../src/assets/sample.mp3'
          }
        ]
      }
    },
  
    methods: {
      // Something to do before playing
      handleBeforePlay(next) {
        // There are a few things you can do here...
        this.currentAudioName = this.audioList[this.$refs.audioPlayer.currentPlayIndex].name
  
        next() // Start playing
      }
    }
  }
  </script>