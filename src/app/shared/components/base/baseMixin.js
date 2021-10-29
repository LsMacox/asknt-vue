import { _ } from 'vue-underscore'
import camelCase from 'lodash/camelCase'

export default {
  computed: {
    attrs () {
      const attrs = {}
      // eslint-disable-next-line no-unused-vars
      for (const [key, val] of Object.entries(this.$attrs)) {
        attrs[camelCase(key)] = val
      }
      return attrs
    },
    scopedSlots () {
      const slots = {}
      const scopedSlots = _.reject(Object.keys(this.$scopedSlots), (name) => {
        return Object.keys(this.$slots).includes(name)
      })

      scopedSlots.forEach(name => {
        slots[name] = this.$scopedSlots[name]
      })

      return slots
    },
    slots () {
      return this.$slots
    },
  },
  methods: {
    existsAttrAndFalse (propName) {
      return !Object.keys(this.$attrs).includes(propName) ||
      (
        Object.keys(this.$attrs).includes(propName) &&
        this.$attrs[propName] === false
      )
    },
  },
}
