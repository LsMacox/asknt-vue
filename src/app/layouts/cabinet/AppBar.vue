<template>
  <v-app-bar
    min-height="80"
    height="80"
  >
    <v-row
      class="align-center"
      no-gutters
    >
      <v-col cols="2">
        <router-link
          :to="{ name: 'dashboardMain' }"
        >
          <v-img
            class="logo-img"
            :src="require('@/assets/img/asknt-logo.png')"
            max-width="108"
            max-height="32"
          />
        </router-link>
      </v-col>
      <v-col
        cols="9"
      >
        <v-item
          v-for="(item, idx) in toolbarItemsByAccess"
          :key="idx"
        >
          <v-btn
            text
            :to="item.route"
            :ripple="false"
            class="nav-item"
            active-class="nav-item--active"
          >
            <v-icon
              size="16"
              color="accent"
              class="nav-icon"
            >
              {{ item.icon }}
            </v-icon>
            <p class="nav-title roboto-s-medium mb-0 accent--text">
              {{ item.text }}
            </p>
          </v-btn>
        </v-item>
      </v-col>
      <v-col
        class="d-flex justify-end"
        cols="1"
      >
        <v-btn
          text
          min-width="57"
          :ripple="false"
          class="btn-logout"
          @click="onLogout"
        >
          <v-icon
            color="accent"
            size="16"
          >
            $icons_exit
          </v-icon>
          <p class="roboto-sm-regular accent--text mb-0">
            Выйти
          </p>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
  import Access from '@/app/models/access'
  import { mapActions } from 'vuex'
  import { actionsTypes, gettersTypes } from '@/app/entities/auth/shared/state/auth'

  export default {
    data: () => ({
      toolbarItems: [
        { icon: '$icons_dashboard', text: 'Дэшборд', route: { name: 'dashboardMain' }, accessLevel: 0 },
        { icon: '$icons_report', text: 'Отчеты', route: { name: 'reportMain' }, accessLevel: 1 },
        { icon: '$icons_finished-points', text: 'Завершенные маршруты', route: { name: 'completedRouteMain' }, accessLevel: 2 },
        { icon: '$icons_chain-square', text: 'Торговые точки', route: { name: 'outletMain' }, accessLevel: 3 },
        { icon: '$icons_chain-circle', text: 'Зоны загрузки', route: { name: 'loadingAreaMain' }, accessLevel: 4 },
        // { icon: '$icons_wialon', text: 'Подключение Wialon', route: { name: 'connectionMain' } },
      ],
    }),
    computed: {
      toolbarItemsByAccess () {
        const slug = this.$store.getters['auth/auth/' + gettersTypes.USER_ROLE].slug

        return this.toolbarItems.filter(item => {
          return (new Access().acceptableUserAccessLevel(slug, item.accessLevel))
        })
      },
    },
    methods: {
      ...mapActions({
        fetchLogout: 'auth/auth/' + actionsTypes.LOGOUT,
      }),
      async onLogout () {
        await this.fetchLogout()
        this.$notify({
          type: 'success',
          title: 'Авторизация',
          text: 'Вы вышли из аккаунта',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.nav-item {
  margin: 0 10px !important;
  padding: 0 !important;
  .nav-icon {
    margin-right: 10px !important;
  }
  &:before {
    content: none;
    background-color: none;
  }
  .nav-title {
    font-weight: 400 !important;
  }
  &.nav-item--active {
    &:before {
      content: '';
      background-color: var(--v-secondary-base);
      height: 3px;
      opacity: 1;
      border-radius: 20px;
      top: initial;
      bottom: 4px;
    }
    .nav-title {
      color: var(--v-secondary-base) !important;
    }
    .nav-icon {
      & ::v-deep {
        svg {
          color: var(--v-secondary-base) !important;
        }
      }
    }
  }
}
.btn-logout {
  width: 57px;
  & ::v-deep {
    .v-icon {
      margin-right: 5px !important;
    }
  }
}
</style>
