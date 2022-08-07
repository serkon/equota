import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Equota',
    component: () => import(/* webpackChunkName "login" */ '@/views/equota/equota.page.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'sub-active',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition
      ? savedPosition
      : to.hash
      ? { el: to.hash, behavior: 'smooth' }
      : { top: 0, behavior: 'smooth' };

    // Or always scroll 10px above the element #main
    /**
    return {
      // could also be
      // el: document.getElementById('main'),
      el: '#main',
      top: -10,
    }*/

    // Or
    /**
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })*/
  },
});

export default router;
