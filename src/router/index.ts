import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import ThankYouPage from '../views/ThankYouPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage,
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: ThankYouPage,
    }
  ],
})

export default router
