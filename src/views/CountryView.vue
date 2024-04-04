<template>
    <!--TopNav/-->
    <div>
        <img src="" alt="">
        <div class="titleContainer">
        <h2>Japan</h2>
        </div>
        <p>
            Japan byder på en mangfoldig plantenatur, der spænder fra de skovklædte bjerge i nord til de frodige regnskove i syd. I nord findes nåletræer som gran og fyr, mens de subtropiske områder i syd er hjemsted for eksotiske træer, buske og blomster. Bambus er udbredt, og sakura (kirsebærblomster) er en ikonisk del af japansk kultur. Den rige plantenatur afspejler Japans kulturelle arv og forbindelse til naturen. Japan's planteliv udgør også et fundament for landets økologiske balance og støtter en rig biodiversitet af både flora og fauna. Denne dybe forbindelse til naturen er en central del af japansk identitet og tradition, og den afspejler sig i alt fra kunst og litteratur til dagliglivet.
        </p>
        <div class="buttonContainer">
        <RouterLink to="/"><button>Afspil lydbog</button></RouterLink>
        <RouterLink to="/"><button>Liste over planter</button></RouterLink>
        </div>
    </div>
    
    <!--BottomNav/-->
</template>

<script setup>
    import BottomNav from '@/components/bottomNav.vue';
    import TopNav from '@/components/TopNav.vue';
</script>
<style lang="scss">
    @import '@/styles/global.scss';

    button{
        @include button;
    }

    body{
        background-color: $background-color;
    }

    .buttonContainer {
        display: flex;
        flex-direction: column;
    }
    p{
        color: black;
    }
    .titleContainer{
        background-image: url('./assets/images/Yucca-flaccida-palmelilje-1024x683.png');
    }

</style>