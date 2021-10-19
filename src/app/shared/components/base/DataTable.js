import { VDataTable, VDataTableHeader } from 'vuetify/lib'
import BaseDataFooter from './DataFooter'

export default {
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
        header ({ props, on }) {
          return createElement(VDataTableHeader, {
            props: {
              ...props,
            },
            on: {
              ...on,
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
