<template>
    <TopNav/>
    <div>
        <div class="titleContainer">
            <h2>Japan</h2>
        </div>
        <p>
            Japan byder på en mangfoldig plantenatur, der spænder fra de skovklædte bjerge i nord til de frodige regnskove i syd. I nord findes nåletræer som gran og fyr, mens de subtropiske områder i syd er hjemsted for eksotiske træer, buske og blomster. Bambus er udbredt, og sakura (kirsebærblomster) er en ikonisk del af japansk kultur. Den rige plantenatur afspejler Japans kulturelle arv og forbindelse til naturen. Japan's planteliv udgør også et fundament for landets økologiske balance og støtter en rig biodiversitet af både flora og fauna. Denne dybe forbindelse til naturen er en central del af japansk identitet og tradition, og den afspejler sig i alt fra kunst og litteratur til dagliglivet.
        </p>
        <div class="buttonContainer">
        <button>Afspil lydbog</button>
        <button><RouterLink to="/plantoverview">Liste over planter</RouterLink></button>
        </div>
        
    </div>
</template>

<script setup>
    import TopNav from '@/components/TopNav.vue';
   
</script>
<style lang="scss">
    @import '@/styles/global.scss';

    a{
        width: 100%;
    }

    button{
        @include button;
        margin-left: auto;
        margin-right: auto;
        
    }

    body{
        background-color: $background-color;
    }

    .buttonContainer {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    p{
        color: black;
        text-align:center;
       

    }
    .titleContainer{
        background-image: url('../assets/images/Yucca-flaccida-palmelilje-1024x683.png');
        text-align: center;
        height: 179px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2{
            color: white;
        }
        

        
    }
    a{
        margin-left: auto;
        margin-right: auto;
    }

</style>