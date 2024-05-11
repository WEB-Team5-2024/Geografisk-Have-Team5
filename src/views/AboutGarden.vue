<template>
  <div class="contentContainer">
    <TopNav/>
    <img src="../assets/images/omHavenImg.png" alt="Om haven" class="topBannerImage">
    <div class="aboutText">
      <h1 class="titleHeader">Om haven</h1>

      <div>
        <h2 class="gardenOpenTitle">Åbningstider</h2>
        <p>Alle hverdage 10-19 <br> Weekendt og helligedage 10-17</p>
      </div>

      <div>
        <h2 class="prices">Priser</h2>
        <p>Geografisk Have er en 14 hektar stor, botanisk have, hvor det geografiske relaterer sig til, at træer, buske og urter er plantet sammen efter oprindelsesland.</p>
      </div>

      <div>
        <h2 class="botanicGarden">Botanisk Have</h2>
        <p>Geografisk Have er en 14 hektar stor, botanisk have, hvor det geografiske relaterer sig til, at træer, buske og urter er plantet sammen efter oprindelsesland. <br> Grundlæggeren Aksel Olsen Købte jorden og startede stedet som planteskole i 1918. Han havde en stor interesse for planter fra hele verden og især fra Østasien. Han testede om 6000 planter kunne klare sig i vores danske klima og i dag er ca. 2000 af dem tilbage i haven.</p>
      </div>

      <div>
        <h2 class="inspiringGarden">Inspirerende have</h2>
        <p>Lad dig inspirere af Naturhaven, Krydderurtehaven, Den Økologiske Køkkenhave, Staudehaven og mange andre dejlige områder. Den prisbelønnede Rosenhave er især en fantastisk duftoplevelse om sommeren med over 5000 moderne roser. I Rosariet kan du gå på opdagelse i både historiske og vilde roser. I Syvdalen venter spændende og mere vilde natureventyr med grotter, bæk og kvidrende fuglesang. Følger du den 1,8 km lange Hjertesti med fuglesang, vil du også opleve det rige fugleliv, som er med til at give stedet en helt særlig stemning.</p>
      </div>

      <div>
        <h2 class="bringKids">Tag børnene med</h2>
        <p>Haven er et mangfoldigt sted, med plads til gæster i alle aldre. Mange bruger Geografisk Have som mødested eller som et grønt åndehul. For børn og unge er det særligt populært at besøge Havens legepladser, Bambuslunden, Grotterne og Dyrefolden med klappegeder, kaniner, høns, klippeegern, ponyer og Havens kat.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNav from '../components/TopNav.vue'

</script>

<style scoped lang="scss">
@import "@/styles/global.scss";
.contentContainer{
  margin-bottom: 50px;
  
  h2{
    font-size: $large-font-size;
    color: $fontblack-color;
    margin-bottom: 5px;
    font-weight: $regular-weight;
    font-weight: $bold-weight;
  }

}

.aboutText{
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px 12px 90px 12px;
}

.titleHeader {
  font-size: $extra-large-font-size;
  color: $fontblack-color;
  margin-bottom: 10px;
  text-align: center;
  font-weight: $bold-weight;
}

</style>