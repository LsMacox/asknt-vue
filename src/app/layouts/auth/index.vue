<template>
  <div
    class="layouts-auth"
    :style="'background-image: url(' + require('@/assets/img/header-bg.png') + ')'"
  >
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
.layouts-auth {
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>
