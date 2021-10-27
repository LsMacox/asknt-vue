<template>
  <div>
    <p
      v-if="$attrs.title"
      class="roboto-s-regular accent--text"
      style="margin-bottom: 10px"
      v-text="$attrs.title"
    />
    <v-select
      v-bind="[$attrs, propsDefault]"
      v-on="$listeners"
    >
      <template
        v-if="!slots.append"
        v-slot:append
      >
        <v-icon
          size="20"
          color="hidden"
        >
          $icons_arrow-down
        </v-icon>
      </template>
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
    </v-select>
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
          singleLine: true,
          appendIcon: '$icons_arrow-down',
          noDataText: 'Нету доступных данных',
          menuProps: 'auto',
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
