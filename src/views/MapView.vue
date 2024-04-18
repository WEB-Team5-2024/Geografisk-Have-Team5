<template>
    <div>
        <TopNav/>
        <MapComponent/>

        <div class="menuContainer">
            <router-link to="/country">
            <div class="menuItem" v-for="(item, index) in menuItems" :key="index">
                <img :src="item.src" :alt="item.title + ' Image'">
                <div class="details">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                </div>
                <div class="distanceContainer">
                    <p class="distance">{{ item.distance }}</p>
                    go
                </div>
            </div>
            </router-link>
        </div>
        
    </div>

</template>

<script setup>
import TopNav from '../components/TopNav.vue';

import MapComponent from '../components/MapComponent.vue';

const menuItems = [
    { src: '../src/assets/images/plantImages/Aucuba.png', title: 'Menu 1', description: 'Description for Menu 1', distance: '200 meter' },
    { src: '../src/assets/images/plantImages/Daglilje.png', title: 'Menu 2', description: 'Description for Menu 2', distance: '300 meter' },
    // Add more mockup data as needed
];

const navigateTo = (item) => {
    // Handle navigation logic her
    console.log('Navigating to:');
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
p{
    color:white;
}

.menuContainer {
    justify-content: center;
    margin-left:auto;
    margin-bottom: 100px;
    gap:20px;
    .menuItem {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 140px;
        background: #6C6D80 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 10px;
        margin:20px;
        padding: 10px 10px 10px 10px;
        color: white;
        
        img {
            height: 110px;
            width:110px;
            object-fit: cover;
        };
        .distanceContainer {
            padding-left: 10px;
            max-width: 80px;
            p{
                font-size: 9pt;
                font-weight: 200;
            };
            button{
                margin-left: auto;
                margin-right: auto;
            };
        };
    };
};
</style>
