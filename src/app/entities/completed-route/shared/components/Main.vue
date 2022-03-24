<template>
  <container
    title="Завершенные маршруты"
  >
    <v-responsive
      class="mx-auto"
      max-width="1108"
    >
      <main-filter @filter="fetchFilteredList" />
      <base-data-table
        class="completed_routes-table"
        :headers="tableHeaders"
        :items="tableItems"
        :options.sync="tableOptions"
        :server-items-length="completedRoutesTotal"
        :loading="$wait.is('[completed-route] loading table')"
      >
        <template v-slot:[`item.date_shipping`]="{ item }">
          {{ item.date_shipping | moment($config.date.MIN_DATE) }}
        </template>
        <template v-slot:[`item.files`]>
          файл.wln, файл.wlp, отчет о поездки.xls
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <base-btn
            class="pa-0"
            height="24"
            width="24"
            min-width="24"
            @click="downloadShipmentFiles(item)"
          >
            <v-icon
              size="16"
              class="mr-0"
            >
              $icons_download-circle
            </v-icon>
          </base-btn>
        </template>
      </base-data-table>
    </v-responsive>
  </container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { actionsTypes, gettersTypes } from '@/app/entities/completed-route/shared/state/completed-route'
  import MainFilter from '@/app/shared/components/general/MainFilter'
  import Container from '@/app/shared/components/general/Container'

  export default {
    components: { Container, MainFilter },
    data () {
      return {
        tableHeaders: [
          { text: '№ тран', value: 'shipment_id', sortable: false },
          { text: 'Дата', value: 'date_shipping', cellClass: 'info--text', sortable: false },
          { text: 'Машина', value: 'car', cellClass: 'info--text', sortable: false },
          { text: 'Первозчик', value: 'carrier', cellClass: 'info--text', sortable: false },
          { text: 'Склад отгрузки', value: 'loading_warehouse', cellClass: 'info--text', sortable: false },
          { text: 'Файлы', value: 'files', cellClass: 'info--text', sortable: false },
          { text: '', value: 'action', sortable: false, align: 'end' },
        ],
        tableOptions: {
          page: 1,
          itemsPerPage: 10,
          sortBy: 'id',
        },
        tableItems: [],
        filterPayload: null,
      }
    },
    computed: {
      ...mapGetters({
        completedRoutes: 'completed-route/completed-route/' + gettersTypes.COMPLETED_ROUTES,
        completedRoutesTotal: 'completed-route/completed-route/' + gettersTypes.COMPLETED_ROUTES_TOTAL,
      }),
      pagOffset () {
        return (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage
      },
      payload () {
        return {
          offset: this.pagOffset,
          sortBy: this.tableOptions.sortBy,
          sortByDesk: true,
          limit: this.tableOptions.itemsPerPage,
          filter: this.filterPayload,
        }
      },
    },
    watch: {
      completedRoutes: {
        deep: true,
        handler (v) {
          this.tableItems = JSON.parse(JSON.stringify(v))
        },
      },
      'tableOptions.page' (v) {
        if (v) this.fetchData()
      },
      'tableOptions.itemsPerPage' (v) {
        if (v) this.fetchData()
      },
    },
    async mounted () {
      await this.fetchData()
    },
    methods: {
      ...mapActions({
        fetchList: 'completed-route/completed-route/' + actionsTypes.LIST,
        fetchDownload: 'completed-route/completed-route/' + actionsTypes.DOWNLOAD_FILES,
      }),
      async downloadShipmentFiles (item) {
        await this.fetchDownload({ item })
      },
      fetchFilteredList (data) {
        const payload = Object.assign({}, data)
        payload.date_start = data.shipping_date?.startDate
        payload.date_end = data.shipping_date?.endDate
        delete payload.shipping_date
        Object.keys(payload).forEach(k => {
          if (Array.isArray(payload[k]) && !payload[k].length) {
            delete payload[k]
          }
        })
        this.filterPayload = payload
        if (this.tableOptions.page > 1) {
          this.tableOptions.page = 1
        } else {
          this.fetchData()
        }
      },
      async fetchData () {
        this.$wait.start('[completed-route] loading table')
        await this.fetchList(this.payload)
        this.$wait.end('[completed-route] loading table')
      },
    },
  }
</script>

<style lang="scss" scoped>
.completed_routes-table {
  margin-top: $block-indent-1;
  background-color: transparent !important;
  box-shadow: none !important;
  & ::v-deep {
    .v-data-table-header {
      tr > th {
        padding-bottom: 0 !important;
        span {
          font-weight: 400 !important;
          font-size: 16px !important;
          line-height: 18px !important;
        }
      }
    }
    tbody {
      tr {
        td {
          height: 20px !important;
          &:last-child {
            padding-right: 0 !important;
          }
        }
        &:not(:last-child) {
          td {
            padding-bottom: 16px !important;
          }
        }
        &:hover {
          background: none !important;
        }
      }
    }
    .v-data-footer {
      padding-left: 0 !important;
    }
  }
}
</style>
