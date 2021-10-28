import store from '@/store'

export default async function (to, from, next) {
  try {
    console.log('guard-loading-app')
    await store.dispatch('app/LoadingApp')
    return next()
  } catch (error) {
    return next({
      name: 'Login',
    })
  }
}
