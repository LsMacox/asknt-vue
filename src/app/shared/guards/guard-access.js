// import store from '@/store'

export function canAccessRoute (route) {
  try {
    // const authUser = store.getters.user

    //   const programId = store.getters.programId
    //   if (!authUser) return false

    // let canAccess = true
    // if (route.meta && route.meta.roles) {
    //   canAccess = canAccess && authUser.hasProgramAnyRole(route.meta.roles, programId)
    // }
    // if (route.meta && route.meta.permission) {
    //   canAccess = canAccess && authUser.hasProgramPermission(route.meta.permission, programId)
    // }
    // return canAccess
  } catch (error) {
    return false
  }
}
