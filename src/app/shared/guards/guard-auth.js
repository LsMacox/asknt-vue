import vue from 'vue'

const session = vue.$session

export default async function (to, from, next) {
    if (session.exists() && session.get('access_token')) {
      return next()
    }

    return next({
      path: '/login',
      query: { redirect: to.fullPath, loginError: true },
    })
}
