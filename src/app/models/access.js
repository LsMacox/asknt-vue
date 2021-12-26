export default class Access {
  constructor () {
    this.roles = {
      ascntdisp: {
        name: 'Диспетчер',
        level: 0,
      },
      ascntmaindisp: {
        name: 'Главный диспетчер',
        level: 1,
      },
      ascntmanager: {
        name: 'Менеджер',
        level: 2,
      },
      ascntsmanager: {
        name: 'Старший менеджер',
        level: 3,
      },
      ascntadmin: {
        name: 'Админ',
        level: 4,
      },
    }
  }

  acceptableUserAccessLevel (slug, level) {
    return this.getUserRoleLevel(slug) >= level
  }

  getUserRole (slug) {
    return this.roles?.[slug]
  }

  getUserRoleName (slug) {
    return this.roles?.[slug]?.name
  }

  getUserRoleLevel (slug) {
    return this.roles?.[slug]?.level
  }
}
