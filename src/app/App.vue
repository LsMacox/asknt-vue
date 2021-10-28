<template>
  <div>
    <vue-progress-bar />
    <notifications group="api" />
    <notifications />

    <v-app>
      <component :is="layout">
        <router-view />
      </component>
    </v-app>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { actionsTypes } from '@/app/shared/state/app'
  const defaultLayout = 'cabinet'

  export default {
    name: 'App',
    data: () => ({
      //
    }),
    computed: {
      layout () {
        return (this.$route.meta.layout || defaultLayout) + '-layout'
      },
    },
    async mounted () {
      await this.initApp()
    },
    methods: {
      ...mapActions({
        initApp: 'app/' + actionsTypes.INIT_APP,
      }),
    },
  }
</script>
