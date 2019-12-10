import Vue from 'vue';
import VueRouter from 'vue-router';
import Start from '../views/Start.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  },
  {
    path: '/snake',
    name: 'Snake',
    component: () => import(/* webpackChunkName: "Snake" */ '../views/Snake.vue'),
  },
  {
    path: '/end',
    name: 'End',
    component: () => import(/* webpackChunkName: "End" */ '../views/End.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
