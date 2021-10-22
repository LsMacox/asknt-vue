import { session } from '@/plugins/session'

export default function (router) {
  router.beforeEach((to, from, next) => {
    const isLoggedIn = session.exists() && !!session.get('access_token')

    if (to.name !== 'authLogin' && !isLoggedIn) next({ name: 'authLogin' })
    if (to.name === 'authLogin' && isLoggedIn) next({ path: '/' })

    next()
  })
}
