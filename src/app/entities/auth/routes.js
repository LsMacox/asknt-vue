export default {
  path: '/auth',
  children: [
    {
      path: 'login',
      name: 'AuthLogin',
    },
  ],
}
