<template>
    <div class="bannerContainer">
      <img src="@/assets/images/hero-img.png" alt="Geografisk Have" class="banner-image"/>
      <img src="@/assets/logo/geografiskhave_logo_hvid_med_tekst.svg" alt="logo" class="geografisk-logo">
    </div>
    <div class="geografisk-have">
        <h1>Geografisk have</h1>
        <p>Geografisk Have er en 14 ha stor oplevelsespark og botanisk have med mere end 2000 forskellige træer, buske og planter, som er opdelt i geografiske områder. Lad dig inspirere af Naturhaven, Krydderurtehaven, Den Økologiske Køkkenhave, Staudehaven og mange flere dejlige steder.</p>
        <div class="button-container">
          <router-link to="/map"><button>Kort</button></router-link>
          <router-link to="/omHaven"><button>Om haven</button></router-link>
          <router-link to="/calender"><button>Event</button></router-link>
          <router-link to="/admin"><button id="empty">kun for medlemmer </button></router-link>
        </div>
    </div>
    <bottomNav></bottomNav>
  
  </template>
  
  <script setup>
  </script>
  
  <style scoped lang="scss">
@import "@/styles/global.scss";

#empty {

}

.bannerContainer {
  position: relative;
  width: 100%;
  height: auto;
}
.banner-image{
  max-height: 500px;  
}
.geografisk-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  object-fit: contain;
  z-index: 1; /* Ensure the logo is on top */
  padding: 10px;
}


.geografisk-have {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px 100px 20px;
  background-color: $background-color;

  h1 {
    font-size: $extra-large-font-size;
    color: $fontblack-color;
    margin-bottom: 10px;
    text-align: center;
    font-weight: $bold-weight;
  }

  p {
    color: $fontblack-color;
    font-size: $small-font-size;
    margin-bottom: 30px;
    text-align: center;
    max-width: 600px;
    margin-bottom: 40px;
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
  