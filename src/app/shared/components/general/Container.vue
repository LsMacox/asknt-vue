<template>
  <div
    class="d-flex"
    style="position: relative"
  >
    <v-responsive
      max-width="1108"
      class="c-responsive mx-auto"
    >
      <p
        v-if="title"
        class="c-title ml-6 roboto-xl-medium accent-text"
        v-text="title"
      />
      <slot />
    </v-responsive>
    <field-search
      v-if="search"
      class="field-search"
      :label="searchLabel"
      @update="$emit('update:searchValue', $event)"
    />
  </div>
</template>

<script>
  import FieldSearch from '@/app/shared/components/general/SearchField'

  export default {
    components: { FieldSearch },
    props: {
      title: {
        type: String,
      },
      search: Boolean,
      searchLabel: String,
      searchValue: String,
    },
  }
</script>

<style lang="scss" scoped>
.c-responsive {
  padding: 10px 0;
}
.c-title {
  margin-bottom: $block-indent-1 !important;
}
.field-search {
  position: absolute;
  min-width: 250px !important;
  right: 24px;
  border-radius: 5px;
  & ::v-deep {
    .v-label {
      @include roboto-m-medium;
      top: 16px;
    }
  }
}
</style>
