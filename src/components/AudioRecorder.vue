<template>
    <div>
      <audio-recorder
        :upload-url="uploadUrl"
        :attempts="attempts"
        :time="time"
        :headers="headers"
        @before-recording="callback"
        @pause-recording="callback"
        @after-recording="callback"
        @select-record="callback"
        @before-upload="callback"
        @successful-upload="callback"
        @failed-upload="callback"
      />
    </div>
  </template>
  
  <script setup>
  import AudioRecorder from 'vue-audio-recorder';
  
  const uploadUrl = 'YOUR_API_URL';
  const attempts = 3;
  const time = 2;
  const headers = {
    // Add your headers here if needed
  };
  
  const callback = (data) => {
    console.debug(data);
  };
  </script>

<style lang="">
    
</style>