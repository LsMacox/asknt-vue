<template>
  <container
    title="Отчеты"
  >
    <v-responsive
      class="mx-auto"
      max-width="1108"
    >
      <main-filter
        date-range-for-date
        action-text="Сформировать"
        @filter="getReportsByFilter"
      />
      <ul class="reports__list pa-0 d-flex">
        <li class="reports__item d-flex">
          <div class="b-info">
            <p
              class="roboto-l-medium accent--text"
              style="margin-bottom: 10px"
            >
              Отчет 1
            </p>
            <p class="roboto-sm-regular hidden--text mb-0">
              01 января 2020 - 31 января 2020
            </p>
          </div>
          <base-btn
            min-width="151"
            max-width="151"
            height="44"
          >
            <v-icon
              style="margin-right: 5px"
              size="24"
              color="main--text"
            >
              $icons_download-square
            </v-icon>
            <p
              class="roboto-s-regular main--text mb-0"
              style="letter-spacing: normal"
            >
              экспорт в .XLS
            </p>
          </base-btn>
        </li>
      </ul>
    </v-responsive>
  </container>
</template>

<script>
  import { actionsTypes, gettersTypes } from '@/app/entities/report/shared/state/report'
  import { mapActions, mapGetters } from 'vuex'
  import MainFilter from '@/app/shared/components/general/MainFilter'
  import Container from '@/app/shared/components/general/Container'

  export default {
    components: { Container, MainFilter },
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        reports: 'report/report/' + gettersTypes.REPORTS,
      }),
    },
    methods: {
      ...mapActions({
        fetchList: 'report/report/' + actionsTypes.LIST,
      }),
      getReportsByFilter (filteredVal) {
        let payload = Object.assign({}, filteredVal)
        payload.date_start = filteredVal.shipping_date?.startDate
        payload.date_end = filteredVal.shipping_date?.endDate
        delete payload.shipping_date
        payload = { filter: payload }
        this.fetchList(payload)
      },
    },
  }
</script>

<style lang="scss" scoped>
.report-table {
  margin-top: calc(#{$block-indent-1} + 15px);
}
.field-filter {
  display: inline-block;
  width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.reports__list {
  margin-left: 24px;
  margin-top: $block-indent-2;
  .reports__item {
    .b-info {
      margin-right: $block-indent-2;
    }
  }
}
</style>
