<template>
  <v-responsive
    max-width="1108"
    class="c-responsive mx-auto"
  >
    <p
      v-if="title"
      class="c-title ml-6 roboto-xl-medium accent-text"
      v-text="title"
    />
    <slot />
  </v-responsive>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
      },
    },
  }
</script>

<style lang="scss" scoped>
.c-responsive {
  padding: 10px 0;
}
.c-title {
  margin-bottom: $block-indent-1 !important;
}
</style>
