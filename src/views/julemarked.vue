<template>
    <TopNav />
    <div class="julemarkedhero">
        <img src="../assets/images/Julemarked img.png" alt="Julemarked">
        <div class="text-centered">Julemarked</div>
    </div>
    <JulemarkedCard />
    <julemarkedProgram />
</template>
  
<script setup>
    import TopNav from '../components/TopNav.vue'
    import JulemarkedCard from '../components/JulemarkedCard.vue'
    import julemarkedProgram from '../components/JulemarkedProgram.vue';
</script>
<style lang="scss">
@import '../styles/global.scss';
.text-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: $extra-large-font-size;
    font-weight: $bold-weight;
}
.julemarkedhero{
  position: relative;
  text-align: center;
  color: white;
  overflow: hidden;
}
</style>