<template>
  <base-filter
    v-model="filterValue"
    :more.sync="showFilterMore"
  >
    <template v-slot:filters="{ on }">
      <base-select
        class="field-filter"
        :items="selectItems"
        title="Склад отгрузки"
        label="Склад отгрузки"
        height="48"
        hide-details
        @change="on.change('shipping-warehouse', $event)"
      />
      <base-date-picker
        v-model="dateRange"
        class="field-filter"
        :min-date="$moment('23.10.2021', 'DD.MM.YYYY').toDate()"
        :date-format="$config.date.MIN_DATE"
        label="Период дат"
        title="Дата отгрузки"
        :text-ranges="dateRangeIfMore ? showFilterMore : false"
        @change="on.change('shipping-date', $event)"
      />
      <base-select
        class="field-filter mr-0"
        :items="selectItems"
        title="Перевозчик"
        label="Перевозчик"
        hide-details
        @change="on.change('carrier', $event)"
      />
    </template>
    <template v-slot:filters-more>
      <base-select
        class="field-filter"
        :items="selectItems"
        title="Выбор машины"
        label="Машина"
        hide-details
        @change="on.change('car', $event)"
      />
      <base-select
        class="field-filter"
        :items="selectItems"
        title="Грузоподъемность"
        label="Грузоподъемность"
        hide-details
        @change="on.change('carrying-capacity', $event)"
      />
      <base-select
        class="field-filter mr-0"
        :items="selectItems"
        title="Транспортировка"
        label="Транспортировка"
        hide-details
        @change="on.change('transportation', $event)"
      />
      <base-select
        class="field-filter"
        :items="selectItems"
        title="Водитель"
        label="ФИО водителя"
        hide-details
        @change="on.change('driver', $event)"
      />
      <base-select
        class="field-filter"
        :items="selectItems"
        title="Маршрут"
        label="Маршрут"
        hide-details
        @change="on.change('route', $event)"
      />
    </template>
  </base-filter>
</template>

<script>
  import BaseFilter from './Filter'

  export default {
    components: { BaseFilter },
    props: {
      dateRangeIfMore: Boolean,
    },
    data () {
      return {
        filterValue: [],
        showFilterMore: false,
        dateRange: {
          startDate: null,
          endDate: null,
        },
        selectItems: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
.field-filter {
  display: inline-block;
  width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
