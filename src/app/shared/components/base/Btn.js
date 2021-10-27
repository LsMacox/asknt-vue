import { VBtn } from 'vuetify/lib'
import camelCase from 'lodash/camelCase'

export default {
  inheritAttrs: false,
  data () {
    return {}
  },
  render (createElement) {
    return createElement(VBtn, {
      props: {
        height: '50',
        color: 'secondary',
        minWidth: '250',
        ...this.attrs,
        depressed: true,
      },
      on: {
        ...this.$listeners,
      },
      scopedSlots: {
        ...this.$scopedSlots,
        ...this.$slots,
      },
    }, [this.genDefaultSlot()])
  },
  computed: {
    attrs () {
      const attrs = {}
      // eslint-disable-next-line no-unused-vars
      for (const [key, val] of Object.entries(this.$attrs)) {
        attrs[camelCase(key)] = camelCase(val)
      }
      return attrs
    },
  },
  methods: {
    genDefaultSlot () {
      const def = this.$slots.default
      if (def.length === 1 &&
          def[0].text && !def[0].children) {
        return this.$createElement('p', {
          staticClass: 'text-button text-capitalize mb-0',
        }, def[0].text)
      }

      return def
    },
  },
}
