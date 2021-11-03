<template>
  <div
    style="position: relative"
  >
    <v-responsive
      max-width="1108"
      class="mx-auto"
      style="position: relative"
    >
      <p
        v-if="title"
        class="c-title ml-6 roboto-xl-medium accent-text"
        v-text="title"
      />
    </v-responsive>
    <slot />
    <field-search
      v-if="search"
      class="field-search"
      :label="searchLabel"
      @update="$emit('update:searchValue', $event)"
    />
    <v-tabs
      v-if="tabs"
      v-model="internalTabValue"
      class="tabs"
    >
      <v-tab
        v-for="tab in tabItems"
        :key="tab.id"
      >
        {{ tab.text }}
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-if="tabs && !search"
      v-model="internalTabValue"
      class="tab-items"
    >
      <v-tab-item
        v-for="tab in tabItems"
        :key="tab.id"
      >
        <slot :name="'tab-' + tab.id" />
      </v-tab-item>
    </v-tabs-items>
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
      tabs: Boolean,
      tabItems: Array,
      tabValue: [String, Number],
    },
    data () {
      return {
        internalTabValue: '',
      }
    },
    watch: {
      internalTabValue (v) {
        this.$emit('update:tabValue', v)
      },
    },
  }
</script>

<style lang="scss" scoped>
.c-responsive {
  overflow: visible;
}
.c-title {
  margin-bottom: 40px !important;
}
.field-search {
  position: absolute;
  min-width: 250px !important;
  right: 24px;
  border-radius: 5px;
  top: 10px;
  & ::v-deep {
    .v-label {
      @include roboto-m-medium;
      top: 16px;
    }
  }
}
.tabs {
  position: absolute;
  right: 24px;
  top: 10px;
  width: inherit;
}
.tab-items {
  padding: 0 10px 10px 10px;
  background: transparent !important;
}
</style>
