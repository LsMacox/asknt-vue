<template>
  <v-text-field
    v-bind="[$attrs, propsDefault]"
    v-on="$listeners"
  >
    <template
      v-for="scopedSlot in Object.keys(scopedSlots)"
      #[scopedSlot]="props"
    >
      <slot
        :name="scopedSlot"
        v-bind="props"
      />
    </template>
    <template
      v-for="slot in Object.keys(slots)"
      #[slot]
    >
      <slot
        :name="slot"
      />
    </template>
  </v-text-field>
</template>

<script>
  import BaseMixin from './baseMixin'

  export default {
    mixins: [BaseMixin],
    inheritAttrs: false,
    data () {
      return {}
    },
    computed: {
      propsDefault () {
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
