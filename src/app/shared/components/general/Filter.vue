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
          <slot
            name="filters-more"
            :on="{ change }"
          />
        </div>
      </v-col>
      <v-col
        class="col-action d-flex justify-end"
        cols="3"
      >
        <base-btn
          class="btn-find"
          @click="$emit('btnAction', value)"
        >
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
        type: Object,
        default: function () {
          return {}
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
      change (key, val) {
        this.$set(this.value, key, val)
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
.btn-find {
  margin-top: 26px;
}
</style>
