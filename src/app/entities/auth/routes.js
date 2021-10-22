import Login from './shared/components/Login.vue'

export default [
  {
    path: '/login',
    name: 'authLogin',
    meta: { layout: 'auth' },
    component: Login,
  },
]
