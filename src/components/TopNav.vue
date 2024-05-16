<template>

    <div class="TopNavcontainer">
            <div @click="$router.back()"> <!--Sender brugeren 1 skridt tilbage i deres historik, fungere som browserens tilbage knap-->
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </div>
    </div>


</template>
<script setup>

</script>

<style lang="scss">
@import '../styles/global.scss';
.TopNavcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-color;
    border-bottom: 1px solid var(--color-border);
    width:  60px;
    height: 60px;
    border-radius: 50%;
    padding: 0;
    margin: 5px;

    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100000000;
}
.arrow {
    display: flex;
    fill: $background-color;
    width:  30px;
    height: 30px;
}

</style>

