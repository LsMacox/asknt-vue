<template>
  <div class="filter">
    <v-row no-gutters>
      <v-col cols="9">
        <slot
          name="filters"
          :on="{ change }"
        />
        <div
          :class="{
            'filters-more': true,
            'filters-more--hide': !showMore
          }"
        >
          <slot name="filters-more" />
        </div>
      </v-col>
      <v-col
        class="d-flex justify-end align-center"
        cols="3"
      >
        <base-btn @click="$emit('filter', value)">
          {{ actionText }}
        </base-btn>
      </v-col>
    </v-row>
    <v-btn
      text
      height="18"
      :ripple="false"
      class="pa-0"
      @click="showMore = !showMore"
    >
      <v-icon
        color="secondary"
        size="16"
      >
        $icons_settings
      </v-icon>
      <p class="roboto-sm-medium accent--text mb-0">
        {{ showMore ? moreTextClose : moreTextOpen }}
      </p>
    </v-btn>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      value: {
        type: Array,
        default: function () {
          return []
        },
      },
      actionText: {
        type: String,
        default: 'Найти',
      },
      moreTextOpen: {
        type: String,
        default: 'Больше фильтров',
      },
      moreTextClose: {
        type: String,
        default: 'Свернуть',
      },
    },
    data () {
      return {
        showMore: false,
      }
    },
    watch: {
      showMore (v) {
        this.$emit('update:more', v)
      },
    },
    methods: {
      change (key, value) {
        const idx = this.value.findIndex(v => v.key === key)
        if (idx !== -1) this.value[idx] = value
        else this.value.push(value)
      },
    },
  }
</script>

<style lang="scss" scoped>
.filter {
  background: var(--v-main-base);
  box-shadow: $block-box-shadow;
  border-radius: 5px;
  padding: 28px 24px 20px 24px;
}
.filters-more {
  &.filters-more--hide {
    display: none;
  }
}
</style>
