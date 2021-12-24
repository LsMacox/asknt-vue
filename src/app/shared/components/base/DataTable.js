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
        noDataText: 'Нет доступных данных',
        loadingText: 'Загрузка данных...',
        ...this.attrs,
      },
      on: {
        ...this.$listeners,
      },
      scopedSlots: {
        ...this.$slots,
        ...this.$scopedSlots,
        header: (data) => {
          if (this.existsAttrAndNotFalse('hideDefaultHeader')) return

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
          props.itemsPerPage = 10
          props.itemsPerPageOptions = [10, 20, 50, 100, -1]
          return createElement(BaseDataFooter, { attrs: { ...props }, on })
        },
      },
    })
  },
}
