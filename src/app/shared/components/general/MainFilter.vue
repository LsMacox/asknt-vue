<template>
  <base-filter
    v-model="filterValue"
    :more.sync="showMore"
    :action-text="actionText"
  >
    <template v-slot:filters="{ on }">
      <base-autocomplete
        class="field-filter"
        :items="shippingWarehouse"
        title="Склад отгрузки"
        placeholder="Склад отгрузки"
        hide-details
        :loading="$wait.is('[mainFilter] loading data')"
        multiple
        @change="on.change('shipping-warehouse', $event)"
      />
      <base-date-picker
        v-model="dateRange"
        class="field-filter field-date"
        :class="{ 'open-more': dateRangeForDateField && showMore }"
        :min-date="$moment('23.10.2021', 'DD.MM.YYYY').toDate()"
        :date-format="$config.date.MIN_DATE"
        label="Период дат"
        title="Дата отгрузки"
        multiple
        :text-ranges="dateRangeForDateField"
        @change="on.change('shipping-date', $event)"
      />
      <base-autocomplete
        class="field-filter mr-0"
        :items="carrier"
        title="Перевозчик"
        placeholder="Перевозчик"
        hide-details
        :loading="$wait.is('[mainFilter] loading data')"
        multiple
        @change="on.change('carrier', $event)"
      />
    </template>
    <template v-slot:filters-more="{ on }">
      <base-autocomplete
        class="field-filter"
        :items="cars"
        title="Выбор машины"
        placeholder="Машина"
        multiple
        :loading="$wait.is('[mainFilter] loading data')"
        hide-details
        @change="on.change('car', $event)"
      />
      <base-autocomplete
        class="field-filter"
        :items="weights"
        title="Грузоподъемность"
        placeholder="Грузоподъемность"
        multiple
        :loading="$wait.is('[mainFilter] loading data')"
        hide-details
        @change="on.change('carrying-capacity', $event)"
      />
      <base-autocomplete
        class="field-filter mr-0"
        :items="selectItems"
        title="Транспортировка"
        placeholder="Транспортировка"
        multiple
        :loading="$wait.is('[mainFilter] loading data')"
        hide-details
        @change="on.change('transportationy', $event)"
      />
      <base-autocomplete
        class="field-filter"
        :items="drivers"
        title="Водитель"
        placeholder="ФИО водителя"
        multiple
        :loading="$wait.is('[mainFilter] loading data')"
        hide-details
        @change="on.change('driver', $event)"
      />
      <base-autocomplete
        class="field-filter"
        :items="routes"
        title="Маршрут"
        placeholder="Маршрут"
        multiple
        :loading="$wait.is('[mainFilter] loading data')"
        hide-details
        @change="on.change('route', $event)"
      />
    </template>
  </base-filter>
</template>

<script>
  import { actionsTypes, gettersTypes } from '@/app/entities/dashboard/shared/state/shipment'
  import { mapGetters, mapActions } from 'vuex'
  import BaseFilter from './Filter'

  export default {
    components: { BaseFilter },
    props: {
      actionText: String,
      dateRangeForDateField: Boolean,
    },
    data () {
      return {
        showMore: false,
        filterValue: [],
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
    computed: {
      ...mapGetters({
        shipments: 'dashboard/shipment/' + gettersTypes.SHIPMENTS,
      }),
      shippingWarehouse () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.id,
            text: shipment.stock.name,
          }
        })
      },
      carrier () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.id,
            text: shipment.driver,
          }
        })
      },
      cars () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.id,
            text: shipment.car ?? shipment.trailer,
          }
        })
      },
      weights () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.id,
            text: shipment.weight,
          }
        })
      },
      drivers () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.id,
            text: shipment.driver,
          }
        })
      },
      routes () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.id,
            text: shipment.number,
          }
        })
      },
    },
    async mounted () {
      await this.fetchData()
    },
    methods: {
      ...mapActions({
        fetchList: 'dashboard/shipment/' + actionsTypes.LIST,
      }),
      async fetchData () {
        this.$wait.start('[mainFilter] loading data')
        await this.fetchList()
        this.$wait.end('[mainFilter] loading data')
      },
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
.field-date {
  &.open-more {
    margin-bottom: 59px;
  }
  & ::v-deep {
    .text-ranges__picker {
      position: absolute;
    }
  }
}
</style>
