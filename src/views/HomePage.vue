<template>
  <img src="@/assets/images/omHavenImg.png" alt="Geografisk Have" class="banner-image">
  <div class="geografisk-have">
    <TopNav></TopNav> 
    <div class="main-content">
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
@import "@/styles/global.scss";

.geografisk-have {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: $background-color;
  min-height: 100vh;


  .banner-image {
    width: 100%; 
    margin-bottom: 20px;
  }

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

    button {
      background-color: $btn-color;
      border: none;
      border-radius: 25px;
      padding: 15px 20px;
      font-size: $medium-font-size;
      color: white;
      box-shadow: $btn-shadow;
      transition: background-color 0.3s;

      &:hover {
        background-color: darken($btn-color, 10%);
      }
    }
  }
}
</style>
  