<template>
    <div class="plantContainer">
        <div class="plantBox">
            <div class="plantImg">
                <img src="../assets/images/Aucuba.png" alt="Aucuba">
            </div>
            <p class="plantText">Aucuba</p>
        </div>
    </div>
</template>
<script setup></script>

<style scoped lang="scss" >
@import '../styles/global.scss';



.plantContainer{
    max-width: 180px;
    max-height: 73px;
    margin: 10px;  
}

.plantBox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: auto;
    gap: 10px;
    height: 100%;
    padding-top: 7px;
    color: $font-color;
    background-color: $secondary-color;
    border-radius: $border-radius;
    box-shadow: $drop-shadow-light;
}

</style>
