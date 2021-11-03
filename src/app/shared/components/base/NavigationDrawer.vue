<template>
  <v-navigation-drawer
    class="base-navigation-drawer"
    :value="value"
    v-bind="[attrs, propsDefault]"
    @input="$emit('input', $event)"
    v-on="$listeners"
  >
    <template
      v-if="existsAttrAndNotFalse('close')"
      v-slot:prepend
    >
      <v-btn
        class="btn-close pa-0"
        min-width="0"
        text
        @click="$emit('input', false)"
      >
        <v-img
          :src="require('@/assets/icons/delete-38x38.png')"
          max-width="38"
          max-height="38"
        />
      </v-btn>
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
  </v-navigation-drawer>
</template>

<script>
  import BaseMixin from './baseMixin'

  export default {
    mixins: [BaseMixin],
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      value: Boolean,
    },
    data () {
      return {}
    },
    computed: {
      propsDefault () {
        return {
          fixed: true,
          right: true,
          temporary: true,
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.base-navigation-drawer {
  .btn-close {
    position: absolute;
    right: 40px;
    top: 40px;
  }
}
</style>
