<template>
  <base-data-table
    class="fields-table table--hover__none"
    :headers="headers"
    :items="items"
    hide-default-header
  >
    <template
      v-for="header in headers"
      #[`item.${header.value}`]
    >
      <base-text-field
        :key="header.value"
        class="item-field"
        :label="header.text"
        :style="
          header.maxWidth ? `max-width: ${header.maxWidth}px !important;` : '' +
            header.minWidth ? `min-width: ${header.minWidth}px !important` : ''
        "
        height="50"
        hide-details
      />
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
  </base-data-table>
</template>

<script>
  import BaseMixin from '../base/baseMixin'

  export default {
    mixins: [BaseMixin],
    props: {
      headers: {
        type: Array,
        default: function () {
          return []
        },
      },
      items: {
        type: Array,
        default: function () {
          return []
        },
      },
    },
    data () {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>
.fields-table {
  box-shadow: none !important;
  background-color: transparent !important;
  .item-field {
    & ::v-deep {
      .v-input__control {
        background: var(--v-main-base);
      }
    }
  }
  & ::v-deep {
    tbody {
      tr {
        &:not(:last-child) {
          td {
            padding-bottom: 20px !important;
          }
        }
        td {
          &:not(:first-child) {
            padding-right: 0 !important;
            padding-left: 20px !important;
          }
          &:first-child {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      }
    }
    .v-data-footer {
      padding-left: 0 !important;
    }
  }
}
</style>
