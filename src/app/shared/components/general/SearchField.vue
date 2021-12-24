<template>
  <base-text-field
    class="field-search"
    hide-details
    :label="label"
    height="55"
    @input="$emit('update', $event)"
  >
    <template
      v-if="!slots.append"
      v-slot:append
    >
      <v-icon
        size="24"
        color="accent"
      >
        $icons_search
      </v-icon>
    </template>
  </base-text-field>
</template>

<script>
  import BaseMixins from '../base/baseMixin'

  export default {
    mixins: [BaseMixins],
    model: {
      prop: 'value',
      event: 'update',
    },
    props: {
      value: String,
      label: String,
    },
  }
</script>

<style lang="scss" scoped>
.field-search {
  border-radius: 10px;
  & ::v-deep {
    .v-label {
      @include roboto-s-medium;
    }
    .v-input__slot {
      padding: 0 27px !important;
    }
  }
}
</style>
