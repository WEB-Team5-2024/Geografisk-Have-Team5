import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/OmHaven',
      name: 'omhaven',
      component: () => import('../views/AboutGarden.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
    },
    {
      path: '/calender',
      name: 'calender',
      component: () => import('../views/CalenderView.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404View.vue'),
    },
    
    {
      path: '/plant/cryptomeria', 
      name: 'cryptomeria', 
      component: () => import('../views/PlantPage.vue'), 
    },
    
    {
      path: '/julemarked',
      name: 'julemarked',
      component: () => import('../views/julemarked.vue')
    },
    {
      path: '/country',
      name: 'country',
      component: () => import('../views/CountryView.vue')
    },
    {
      path: '/plantoverview',
      name: 'plantoverview',
      component: () => import('../views/PlantOverview.vue')
    },

  ]
})


export default router;
