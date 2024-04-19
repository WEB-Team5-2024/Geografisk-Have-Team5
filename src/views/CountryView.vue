<template>
    <TopNav/>
    <div>
        <div class="container">
            <img :src="imageUrl" alt="image from firebase">
            <h2 class="centered">Japan</h2>
        </div>
        <p>
            Japan byder på en mangfoldig plantenatur, der spænder fra de skovklædte bjerge i nord til de frodige regnskove i syd. I nord findes nåletræer som gran og fyr, mens de subtropiske områder i syd er hjemsted for eksotiske træer, buske og blomster. Bambus er udbredt, og sakura (kirsebærblomster) er en ikonisk del af japansk kultur. Den rige plantenatur afspejler Japans kulturelle arv og forbindelse til naturen. Japan's planteliv udgør også et fundament for landets økologiske balance og støtter en rig biodiversitet af både flora og fauna. Denne dybe forbindelse til naturen er en central del af japansk identitet og tradition, og den afspejler sig i alt fra kunst og litteratur til dagliglivet.
        </p>
        <div class="buttonContainer">
        <button>Afspil lydbog</button>
        <button><RouterLink to="/plantoverview">Liste over planter</RouterLink></button>
        </div>
        <div>
            <audio controls>
              <source :src="audioUrl" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
    </div>
</template>

<script setup>
    import TopNav from '@/components/TopNav.vue';

    //importerer composable/custom hook:
    import { useFirebaseStorage } from '@/composables/useFirebaseStorage';
    import { useFirebaseAudio } from '@/composables/useFirebaseAudio';
    const { imageUrl } = useFirebaseStorage('gs://geografisk-have-webteam5.appspot.com/images/Yucca-flaccida-palmelilje-1024x683.png');
    const { audioUrl } = useFirebaseAudio('https://firebasestorage.googleapis.com/v0/b/geografisk-have-webteam5.appspot.com/o/audio%2Fsample.mp3?alt=media&token=994b95b0-0b9e-484e-baba-26d5410475db')
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
    a{
        margin-left: auto;
        margin-right: auto;
    }
    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .container {
        position: relative;
        text-align: center;
        color: white;
      }
</style>