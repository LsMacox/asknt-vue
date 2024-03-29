import VDataFooter from 'vuetify/lib/components/VDataIterator/VDataFooter.js'
import BaseTextField from './TextField.vue'
import { VSelect } from 'vuetify/lib'
import { getSlot } from 'vuetify/lib/util/helpers'

export default {
  extends: VDataFooter,
  props: {
    itemsPerPageAllText: {
      type: String,
      default: 'Все',
    },
    itemsPerPageText: {
      type: String,
      default: 'Строк',
    },
    prevIcon: {
      type: String,
      default: '$icons_prev',
    },
    nextIcon: {
      type: String,
      default: '$icons_next',
    },
    pageText: {
      type: String,
      default: 'Страница',
    },
  },
  render () {
    return this.$createElement('div', {
      staticClass: 'v-data-footer',
    }, [
      this.$createElement('div', { staticClass: 'v-data-footer__section' }, [getSlot(this, 'prepend'), this.genItemsPerPageSelect(), this.genPaginationInfo()]),
      this.$createElement('div', { staticClass: 'v-data-footer__section' }, [this.genIcons()]),
    ])
  },
  methods: {
    genPaginationInfo () {
      let children = ['–']
      const itemsLength = this.pagination.itemsLength
      const page = this.pagination.page
      let pageStart = this.pagination.pageStart
      let pageStop = this.pagination.pageStop

      if (this.pagination.itemsLength && this.pagination.itemsPerPage) {
        pageStart = this.pagination.pageStart + 1
        pageStop = itemsLength < this.pagination.pageStop || this.pagination.pageStop < 0 ? itemsLength : this.pagination.pageStop
        children = this.$scopedSlots['page-text'] ? [this.$scopedSlots['page-text']({
          pageStart,
          pageStop,
          itemsLength,
        })] : [
          this.$createElement('p', { staticClass: 'roboto-s-regular mb-0', style: { marginRight: '5px' } }, this.pageText),
          this.$createElement(BaseTextField, {
           staticClass: 'pagination-field as--text-field',
            attrs: {
              type: 'number',
              value: page,
              min: 1,
              hideDetails: true,
            },
            props: {
              height: '22',
              value: page,
            },
            on: {
              input: (v) => {
                this.updateOptions({
                  page: v,
                })
              },
            },
          }),
          this.$createElement('p', { staticClass: 'pagination-total roboto-s-regular mb-0' }, 'из ' + this.pagination.pageCount),
        ]
      } else if (this.$scopedSlots['page-text']) {
        children = [this.$scopedSlots['page-text']({
          pageStart,
          pageStop,
          itemsLength,
        })]
      }

      return this.$createElement('div', {
        class: 'v-data-footer__pagination d-flex align-center',
      }, children)
    },
    genItemsPerPageSelect () {
      let value = this.options.itemsPerPage
      const computedIPPO = this.computedDataItemsPerPageOptions
      if (computedIPPO.length <= 1) return null
      if (!computedIPPO.find(ippo => ippo.value === value)) value = computedIPPO[0]
      return this.$createElement('div', {
        staticClass: 'v-data-footer__select',
      }, [this.$vuetify.lang.t(this.itemsPerPageText), this.$createElement(VSelect, {
        attrs: {
          'aria-label': this.$vuetify.lang.t(this.itemsPerPageText),
        },
        props: {
          disabled: this.disableItemsPerPage,
          items: computedIPPO,
          value,
          hideDetails: true,
          auto: true,
          height: '22px',
        },
        on: {
          input: this.onChangeItemsPerPage,
        },
      })])
    },
    genIcons () {
      const before = []
      const after = []
      before.push(this.genIcon(this.onPreviousPage, this.options.page === 1, this.$vuetify.lang.t('$vuetify.dataFooter.prevPage'), this.$vuetify.rtl ? this.nextIcon : this.prevIcon))
      after.push(this.genIcon(this.onNextPage, this.disableNextPageIcon, this.$vuetify.lang.t('$vuetify.dataFooter.nextPage'), this.$vuetify.rtl ? this.prevIcon : this.nextIcon))

      if (this.showFirstLastPage) {
        before.unshift(this.genIcon(this.onFirstPage, this.options.page === 1, this.$vuetify.lang.t('$vuetify.dataFooter.firstPage'), this.$vuetify.rtl ? this.lastIcon : this.firstIcon))
        after.push(this.genIcon(this.onLastPage, this.options.page >= this.pagination.pageCount || this.options.itemsPerPage === -1, this.$vuetify.lang.t('$vuetify.dataFooter.lastPage'), this.$vuetify.rtl ? this.firstIcon : this.lastIcon))
      }

      return [this.$createElement('div', {
        staticClass: 'v-data-footer__icons-before',
      }, before), this.showCurrentPage && this.$createElement('span', [this.options.page.toString()]), this.$createElement('div', {
        staticClass: 'v-data-footer__icons-after',
      }, after)]
    },
  },
}
