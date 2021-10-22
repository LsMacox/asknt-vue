<template>
  <div class="layout-cabinet">
    <app-bar />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
  import AppBar from './AppBar.vue'

  export default {
    components: { AppBar },
  }
</script>

<style lang="scss" scoped>

</style>
