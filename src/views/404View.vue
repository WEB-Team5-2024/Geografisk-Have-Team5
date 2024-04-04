<template>
    <TopNav />
    <h1 class="PageNotFound">404 <br> Page not found</h1>
  </template>
  
  <script setup>
    import TopNav from '../components/TopNav.vue'
  </script>

<style lang="scss">
.PageNotFound {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #000;
}
</style>