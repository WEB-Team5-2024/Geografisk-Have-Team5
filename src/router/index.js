import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AdminPage from '@/views/AdminDashboard.vue';

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
      path: '/plant',
      name: 'plant',
      component: () => import('../views/PlantPage.vue'),
      props: true
    },
    
    {
      path: '/calender/:startDate',
      name: 'event',
      component: () => import('../views/julemarked.vue'),
      props: true
    },
    {
      path: '/areas/:id',
      name: 'country',
      component: () => import('../views/CountryView.vue'),
      props: true
    },
    {
      path: '/plants',
      name: 'plantoverview',
      component: () => import('../views/PlantOverview.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue')
      
    },

  ]
})


export default router;
