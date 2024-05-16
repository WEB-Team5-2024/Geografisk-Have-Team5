<template>
  <div>
    <TopNav />
    <MapComponent @distance-calculated="handleDistanceCalculation" />
      <AreaCard :distance="distanceResult" />
  </div>
</template>

<script setup>
import TopNav from '../components/TopNav.vue';
import MapComponent from '../components/MapComponent.vue';
import AreaCard from '../components/AreaCard.vue';

import { ref } from 'vue';

const distanceResult = ref(null);

function handleDistanceCalculation(distance) {
    distanceResult.value = distance;
}

</script>


<style scoped lang="scss">
@import '@/styles/global.scss';
@import 'bootstrap-icons/font/bootstrap-icons.css';

.menuContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 8px 15px 0px 15px;
    margin-bottom: 100px;

    .menuItem {
        display: flex;
        align-items: center;
        background: $secondary-color;
        box-shadow: $menuContainer-shadow;
        border-radius: $border-radius;
        padding: 20px;
        color: $font-color;
        position: relative;
        gap: 10px;

        .imageContainer {
            flex-shrink: 0;
            width: 100px; 
            height: 100px; 
            border-radius: $border-radius;
            overflow: hidden;
            margin-right: 10px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .textContainer {
            flex-grow: 1;

            .titleAndDistance {
                display: flex;
                justify-content: space-between;
                align-items: center;
                
                h3 {
                    font-size: $medium-font-size;
                    margin: 0;
                    color: $font-color; 
                    font-size: 16px; 
                }

                .distance {
                    background: #FFFFFF;
                    color: #000000;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                }

                .distanceText {
                    color: $distancetext-color;
                }
            }

            p {
                font-size: $small-font-size;
                margin: 0;
                font-size: 12px; 
                color: $font-color;
            }
        }

        .bi-arrow-right-circle {
            font-size: 30px; 
            margin-left: auto; 
            color: #FFF; 
        }
    }
}
.selectedAreaContainer {
    display: flex;
    gap: 15px;
    margin: 10px;
  

  .menuItem {
    display: flex;
    align-items: center;
    background: $secondary-color;
    box-shadow: $drop-shadow-light;
    border-radius: $border-radius;
    padding: 20px;
    color: $font-color;
    position: relative;

    .imageContainer {
            padding: 5px;
            flex-shrink: 0;
            width: 100px; 
            height: 100px; 
            border-radius: $border-radius;
            overflow: hidden;
            margin-right: 10px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
    }

    .textContainer {
      h3 {
        margin: 0;
        color: $font-color;
        font-size: $medium-font-size;
      }

      p {
        margin: 0;
        font-size: $small-font-size; 
        color: $font-color; 
      }

      button {
        margin-top: 20px;
        display: flex;
        padding: 10px 15px; 
        border-radius: 15px; 
        font-size: 1rem; 
        background-color: #4A4C63; 
        color: white;
        border: none; 
        cursor: pointer; 
        display: inline-block; 
        text-align: center; 
      }
    }
  }
}
</style>

