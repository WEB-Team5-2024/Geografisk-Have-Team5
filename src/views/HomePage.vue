<template>
  <img 
        src="@/assets/images/omHavenImg.png" 
        alt="Geografisk Have" 
        class="banner-image"
        />
    
    <div class="geografisk-have">
      
        <h1>Geografisk have</h1>
        <p>Geografisk Have er en 14 ha stor oplevelsespark og botanisk have med mere end 2000 forskellige træer, buske og planter, som er opdelt i geografiske områder. Lad dig inspirere af Naturhaven, Krydderurtehaven, Den Økologiske Køkkenhave, Staudehaven og mange flere dejlige steder.</p>
        <div class="button-container">
          <router-link to="/map"><button>Kort</button></router-link>
          <router-link to="/omHaven"><button>Om haven</button></router-link>
          <router-link to="/calender"><button>Event</button></router-link>
        </div>
    </div>
    <bottomNav></bottomNav>
  
  </template>
  
  <script setup>
  import TopNav from '../components/TopNav.vue'
  
  </script>
  
  <style scoped lang="scss">
@import "@/styles/global.scss";

.geografisk-have {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px 100px 20px;
  background-color: $background-color;

  h1 {
    font-size: $extra-large-font-size;
    color: $primary-color;
    margin-bottom: 10px;
    text-align: center;
  }

  p {
    color: $secondary-color;
    font-size: $medium-font-size;
    margin-bottom: 30px;
    text-align: center;
    max-width: 600px; 
    margin-bottom: 80px;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    width: 100%; 
    gap: 30px;
    justify-content: space-between;
    align-items: center;

    button {
      @include button;
      width: 100%;
    }
    a {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
    }
  }
}
</style>
  