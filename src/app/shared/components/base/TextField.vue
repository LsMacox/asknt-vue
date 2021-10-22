<template>
  <v-text-field
    v-bind="[textFieldDefaults, $attrs]"
    v-on="$listeners"
    @input="v => $emit('input', v)"
  >
    <template
      v-for="slot in parentSlots"
      #[slot]="props"
    >
      <slot
        :name="slot"
        v-bind="props"
      />
    </template>
  </v-text-field>
</template>

<script>
  export default {
    inheritAttrs: false,
    data () {
      return {}
    },
    computed: {
      parentSlots () {
        return Object.keys(this.$scopedSlots)
      },
      textFieldDefaults () {
        return {
          autocomplete: 'off',
          outlined: true,
          singleLine: true,
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
