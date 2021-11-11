<template>
  <div>
    <p
      v-if="$attrs.title"
      class="roboto-s-regular accent--text"
      style="margin-bottom: 10px"
      v-text="$attrs.title"
    />
    <v-autocomplete
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
    </v-autocomplete>
  </div>
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
          outlined: true,
          noDataText: 'Данные не найдены',
          appendIcon: '$icons_arrow-down',
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
