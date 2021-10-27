import { _ } from 'vue-underscore'

export default {
  computed: {
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
}
