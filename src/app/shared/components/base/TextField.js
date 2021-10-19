import { VTextField } from 'vuetify/lib'

export default {
  inheritAttrs: false,
  data () {
    return {}
  },
  render (createElement) {
    return createElement(VTextField, {
      attrs: {
        ...this.$attrs,
      },
      props: {
        autocomplete: 'off',
        outlined: true,
        singleLine: true,
        ...this.$attrs,
      },
      on: {
        ...this.$listeners,
      },
      scopedSlots: {
        ...this.$slots,
        ...this.$scopedSlots,
      },
    })
  },
}
