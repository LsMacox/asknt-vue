import { VDataTable, VDataTableHeader } from 'vuetify/lib'
import BaseDataFooter from './DataFooter'
import baseMixin from './baseMixin'

export default {
  mixins: [baseMixin],
  inheritAttrs: false,
  render (createElement) {
    return createElement(VDataTable, {
      props: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        ...this.$attrs,
      },
      on: {
        ...this.$listeners,
      },
      scopedSlots: {
        ...this.$slots,
        ...this.$scopedSlots,
        header: (data) => {
          if (this.existsAttrAndFalse('hideDefaultHeader')) return

          return createElement(VDataTableHeader, {
            props: {
              ...data.props,
            },
            on: {
              ...data.on,
            },
          })
        },
        footer: ({ props, on }) => {
          props.itemsPerPageText = 'Строк'
          props.itemsPerPage = 5
          return createElement(BaseDataFooter, { attrs: { ...props }, on })
        },
      },
    })
  },
}
