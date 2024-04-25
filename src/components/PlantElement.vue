<template>
    <div class="plantContainer" @click="() => navigateToPlant(plant.id)">
      <img :src="imageUrl" alt="Plant image" class="plantImage" />
      <div class="plantTextContainer">
        <p class="plantText">{{ plant.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useFirebaseStorage } from '@/composables/useFirebaseStorage';
  import { useRouter } from 'vue-router';
  
  export default {
  props: ['plant'],
  setup(props) {
    const router = useRouter();
    const { imageUrl, loadImage } = useFirebaseStorage();
    console.log(props.plant)
    
    loadImage(`images/${props.plant.name}.png`);

    
    const navigateToPlant = () => {
       
      if (!props.plant.id) {
        console.error('Plant ID is undefined or empty');
        return;
      }
      router.push({ name: 'PlantPage', params: { id: props.plant.id } });
    };
    
    return {
      imageUrl,
      navigateToPlant,
    };
  },
};
</script>
  
  
  
  <style scoped lang="scss">
  @import '@/styles/global.scss';
  
  .plantContainer {
    display: flex;
    align-items: center;
    border-radius: $border-radius; 
    overflow: hidden;
    box-shadow: $drop-shadow-light; 
    margin: 10px 0;
    width: 100%; 
  }
  
  .plantImage {
    
    width: 50px; 
    height: 50px; 
    border-top-left-radius: 10px; 
    border-top-right-radius: 10px; 
    border-bottom-right-radius: 10px; 
    border-bottom-left-radius: 10px; 
    
  }
  
  .plantTextContainer {
    padding: 10px;
    color: $font-color; 
    
  }
  
  .plantText {

    font-family: $primary-font; 
  }
  </style>
  