import { VBtn } from 'vuetify/lib'
import baseMixin from './baseMixin'

export default {
  mixins: [baseMixin],
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
        ...this.slots,
        ...this.scopedSlots,
      },
    }, [this.genDefaultSlot()])
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
