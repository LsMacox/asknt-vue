<template>
  <container
    title="Дэшборд"
  >
    <main-filter />
    <base-data-table
      class="dashboard-table"
      :headers="tableHeaders"
      :items="tableItems"
    >
      <template v-slot:[`item.date_shipping`]="{ item }">
        {{ item.date_shipping | moment($config.date.MIN_DATE) }}
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
          {
            text: 'Дата отгрузки',
            align: 'start',
            sortable: false,
            value: 'date_shipping',
            cellClass: 'info--text',
          },
          { text: 'Машина', value: 'car', sortable: false },
          { text: 'Водитель', value: 'driver', cellClass: 'info--text', sortable: false },
          { text: '№ тран.', value: 'number', cellClass: 'info--text', sortable: false },
          { text: 'Маршрут', value: 'route', cellClass: 'info--text', sortable: false },
          { text: 'Тоннаж', value: 'tonnage', cellClass: 'info--text', sortable: false },
          { text: 'Температура', value: 'temp', cellClass: 'info--text', sortable: false },
          { text: 'Выполнение', value: 'performance', cellClass: 'info--text', sortable: false },
        ],
        tableItems: [
          {
            date_shipping: new Date(),
            car: 'У432АС 177',
            driver: 'Гончаров Артем Владимирович',
            number: '479624',
            route: 'БИКОМ 35',
            tonnage: '10 тонн',
            temp: '-1 (нарушение)',
            performance: '80 % (10/16)',
          },
          {
            date_shipping: new Date(),
            car: 'К855СУ 799',
            driver: 'Гончаров Артем Владимирович',
            number: '789243',
            route: 'БИКОМ 35',
            tonnage: '10 тонн',
            temp: '-4 (норма)',
            performance: '30% (13/30)',
          },
          {
            date_shipping: new Date(),
            car: 'У432АС 177',
            driver: 'Гончаров Артем Владимирович',
            number: '479624',
            route: 'БИКОМ 35',
            tonnage: '10 тонн',
            temp: '-1 (нарушение)',
            performance: '80 % (10/16)',
          },
          {
            date_shipping: new Date(),
            car: 'К855СУ 799',
            driver: 'Гончаров Артем Владимирович',
            number: '789243',
            route: 'БИКОМ 35',
            tonnage: '10 тонн',
            temp: '-3 (норма)',
            performance: '30% (13/30)',
          },
          {
            date_shipping: new Date(),
            car: 'У432АС 177',
            driver: 'Гончаров Артем Владимирович',
            number: '479624',
            route: 'БИКОМ 35',
            tonnage: '10 тонн',
            temp: '-1 (нарушение)',
            performance: '80 % (10/16)',
          },
          {
            date_shipping: new Date(),
            car: 'К855СУ 799',
            driver: 'Гончаров Артем Владимирович',
            number: '789243',
            route: 'БИКОМ 35',
            tonnage: '10 тонн',
            temp: '-20 (норма)',
            performance: '30% (13/30)',
          },
        ],
      }
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
