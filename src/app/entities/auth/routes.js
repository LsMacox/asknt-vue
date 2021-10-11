import Home from '@/app/layouts/Home.vue'

export default {
  path: '/auth',
  children: [
    {
      path: 'login',
      name: 'AuthLogin',
      component: Home,
    },
  ],
}
