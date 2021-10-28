<template>
  <div class="layout-cabinet">
    <app-bar />
    <v-main>
      <v-container
        class="container"
        fluid
      >
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
  import AppBar from './AppBar.vue'

  export default {
    components: { AppBar },
    computed: {
      pageTitle () {
        return this.$route.meta.pageTitle || ''
      },
    },
  }
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>
