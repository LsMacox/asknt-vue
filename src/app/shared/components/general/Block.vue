<template>
  <div class="general-block">
    <slot />
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.general-block {
  padding: 10px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: $block-box-shadow;
  background: var(--v-main-base);
}
</style>
