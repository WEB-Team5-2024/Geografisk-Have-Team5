<template>
    <div class="overviewContainer">
        <TopNav/>
        <h1 class="plantheader">Planter i Japan</h1>
        <PlantElement/>
        <PlantElement/>
    </div>
</template>
<script setup>
import TopNav from '../components/TopNav.vue'
import PlantElement from '../components/PlantElement.vue'
</script>

<style scoped lang="scss">
@import '../styles/global.scss';
.plantheader {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
    font-weight: $bold-weight;
}
</style>