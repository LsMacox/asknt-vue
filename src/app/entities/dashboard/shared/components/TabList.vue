<template>
  <v-responsive
    class="mx-auto"
    max-width="1108"
  >
    <main-filter @filter="fetchFilteredList" />
    <base-data-table
      class="dashboard-table"
      :headers="tableHeaders"
      :items="tableItems"
      :options.sync="tableOptions"
      :server-items-length="transportsTotal"
      :loading="$wait.is('[dashboard] loading table')"
      @click:row="showNavigationDrawer = !showNavigationDrawer"
    >
      <template v-slot:[`item.date_shipping`]="{ item }">
        {{ item.date_shipping | moment($config.date.MIN_DATE) }}
      </template>
    </base-data-table>
    <info-navigation-drawer v-model="showNavigationDrawer" />
  </v-responsive>
</template>

<script>
  import { actionsTypes, gettersTypes } from '@/app/entities/dashboard/shared/state/dashboard'
  import { mapActions, mapGetters } from 'vuex'
  import MainFilter from '@/app/shared/components/general/MainFilter'
  import InfoNavigationDrawer from './InfoNavigationDrawer'

  export default {
    components: {
      MainFilter,
      InfoNavigationDrawer,
    },
    data () {
      return {
        showNavigationDrawer: false,
        tableHeaders: [
          {
            text: 'Дата отгрузки',
            align: 'start',
            sortable: false,
            value: 'date_shipping',
            cellClass: 'info--text',
          },
          { text: 'Машина', value: 'car', sortable: false },
          { text: 'Водитель', value: 'driver', cellClass: 'info--text', sortable: false },
          { text: '№ тран.', value: 'id', cellClass: 'info--text', sortable: false },
          { text: 'Маршрут', value: 'loading_warehouse', cellClass: 'info--text', sortable: false },
          { text: 'Тоннаж', value: 'weight', cellClass: 'info--text', sortable: false },
          { text: 'Температура', value: 'temp', cellClass: 'info--text', sortable: false },
          { text: 'Выполнение', value: 'performance', cellClass: 'info--text', sortable: false },
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
        transports: 'dashboard/dashboard/' + gettersTypes.TRANSPORTS,
        transportsTotal: 'dashboard/dashboard/' + gettersTypes.TRANSPORTS_TOTAL,
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
      transports: {
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
        fetchList: 'dashboard/dashboard/' + actionsTypes.LIST,
      }),
      fetchFilteredList (data) {
        const payload = Object.assign({}, data)
        payload.date_start = data.shipping_date?.startDate
        payload.date_end = data.shipping_date?.endDate
        delete payload.shipping_date
        this.filterPayload = payload
        this.fetchData()
      },
      async fetchData () {
        this.$wait.start('[dashboard] loading table')
        await this.fetchList(this.payload)
        this.$wait.end('[dashboard] loading table')
      },
    },
  }
</script>

<style lang="scss" scoped>
.dashboard-table {
  margin-top: calc(#{$block-indent-1} + 15px);
}
.field-filter {
  display: inline-block;
  width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
