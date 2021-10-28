<template>
  <container
    title="Отчеты"
  >
    <main-filter />
    <base-data-table
      class="completed_routes-table"
      :headers="tableHeaders"
      :items="tableItems"
    >
      <template v-slot:[`item.date`]="{ item }">
        {{ item.date | moment($config.date.MIN_DATE) }}
      </template>
      <template v-slot:[`item.action`]>
        <base-btn
          class="pa-0"
          height="24"
          width="24"
          min-width="24"
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
  </container>
</template>

<script>
  import MainFilter from '@/app/shared/components/general/MainFilter'
  import Container from '@/app/shared/components/general/Container'

  export default {
    components: { Container, MainFilter },
    data () {
      return {
        tableHeaders: [
          { text: '№ тран', value: 'car_number', sortable: false },
          { text: 'Дата', value: 'date', cellClass: 'info--text', sortable: false },
          { text: 'Машина', value: 'car', cellClass: 'info--text', sortable: false },
          { text: 'Первозчик', value: 'carrier', cellClass: 'info--text', sortable: false },
          { text: 'Склад отгрузки', value: 'shipping_warehouse', cellClass: 'info--text', sortable: false },
          { text: 'Файлы', value: 'files', cellClass: 'info--text', sortable: false },
          { text: '', value: 'action', sortable: false, align: 'end' },
        ],
        tableItems: [
          {
            car_number: '324234',
            date: new Date(),
            car: 'ГП БИКОМ',
            carrier: 'Юпитер',
            shipping_warehouse: 'ГП БИКОМ',
            files: 'файл.wln, файл.wlp, отчет о поездки.xls',
          },
          {
            car_number: '324234',
            date: new Date(),
            car: 'ГП БИКОМ',
            carrier: 'Юпитер',
            shipping_warehouse: 'ГП БИКОМ',
            files: 'файл.wln, файл.wlp, отчет о поездки.xls',
          },
          {
            car_number: '324234',
            date: new Date(),
            car: 'ГП БИКОМ',
            carrier: 'Юпитер',
            shipping_warehouse: 'ГП БИКОМ',
            files: 'файл.wln, файл.wlp, отчет о поездки.xls',
          },
          {
            car_number: '324234',
            date: new Date(),
            car: 'ГП БИКОМ',
            carrier: 'Юпитер',
            shipping_warehouse: 'ГП БИКОМ',
            files: 'файл.wln, файл.wlp, отчет о поездки.xls',
          },
        ],
      }
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
        padding-bottom: 10px !important;
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
            padding-bottom: 20px !important;
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
