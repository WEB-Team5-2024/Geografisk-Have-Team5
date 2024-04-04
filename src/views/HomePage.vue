<template>
    <div class="geografisk-have">
      <TopNav></TopNav> 
      <div class="main-content">
        <img src="@/assets/images/om haven img.png" alt="Geografisk Have" class="banner-image">
        <h1>Geografisk have</h1>
        <p>Geografisk Have er en 14 ha stor oplevelsespark og botanisk have med mere end 2000 forskellige træer, buske og planter, som er opdelt i geografiske områder. Lad dig inspirere af Naturhaven, Krydderurtehaven, Den Økologiske Køkkenhave, Staudehaven og mange flere dejlige steder.</p>
        <div class="button-container">
          <button>Kort</button>
          <button>Om haven</button>
          <button>Event</button>
        </div>
      </div>
      <bottomNav></bottomNav>
    </div>
  </template>
  
  <script>
  import TopNav from '../components/TopNav.vue'
  import bottomNav from '../components/bottomNav.vue'
  
  export default {
    name: 'HomePage',
    components: {
      TopNav,
      bottomNav
    }
  }
  </script>
  
  <style scoped lang="scss">
  @import "@/styles/HomePage.scss";
  </style>
  