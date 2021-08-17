import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsList from '../views/NewsList';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:class',
    component: NewsList,
  },
  { path: '/', redirect: '/top' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
