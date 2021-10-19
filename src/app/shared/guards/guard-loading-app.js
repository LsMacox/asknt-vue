export default async function (to, from, next) {
  try {
    console.log('guard-loading-app')
    // await store.dispatch('app/loadingApp')
    return next()
  } catch (error) {
    return next({
      name: 'Login',
    })
  }
}
