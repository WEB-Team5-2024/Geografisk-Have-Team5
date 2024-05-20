import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import HomePage from '../views/HomePage.vue';
// fjern fucking ikke den her adminpage - det fucker med resten af siden (flex)
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
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404View.vue'),
    },
    
    {
      path: '/plant/:id',
      name: 'PlantPage',
      component: () => import('../views/PlantPage.vue'),
      props: true
    },
    
    {
      path: '/event/:id',
      name: 'event-detail',
      component: () => import('@/views/SingleEventPage.vue'),
      props: true
    },
    {
      path: '/areas/:id',
      name: 'countryView',
      component: () => import('../views/CountryView.vue'),
      props: true
    },
    {
      path: '/plants/:origin',
      name: 'plantoverview',
      component: () => import('../views/PlantOverview.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) next('/login');
  else next();
});

export default router;
