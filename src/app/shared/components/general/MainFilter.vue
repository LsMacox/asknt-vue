<template>
  <base-filter
    v-model="filteredValue"
    :more.sync="showMore"
    :action-text="actionText"
    @btnAction="onFilter"
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
        @change="on.change('stock_name', $event)"
      />
      <base-date-picker
        v-model="dateRange"
        class="field-filter field-date"
        :class="{ 'open-more': dateRangeForDate && showMore }"
        :date-format="$config.date.MIN_DATE"
        label="Период дат"
        title="Дата отгрузки"
        multiple
        :text-ranges="dateRangeForDate"
        @update="on.change('shipping_date', $event)"
      />
      <base-autocomplete
        class="field-filter mr-0"
        :items="carriers"
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
        @change="on.change('weight', $event)"
      />
      <base-autocomplete
        class="field-filter mr-0"
        :items="selectItems"
        title="Транспортировка"
        placeholder="Транспортировка"
        multiple
        :loading="$wait.is('[mainFilter] loading data')"
        hide-details
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
  import { actionsTypes as shipmentAT, gettersTypes as shipmentGT } from '@/app/shared/state/shipment'
  import { mapGetters, mapActions } from 'vuex'
  import BaseFilter from './Filter'

  export default {
    components: { BaseFilter },
    props: {
      actionText: String,
      dateRangeForDate: Boolean,
    },
    data () {
      return {
        showMore: false,
        filteredValue: {},
        dateRange: {
          startDate: null,
          endDate: null,
        },
        selectItems: [],
      }
    },
    computed: {
      ...mapGetters({
        shipments: 'shipment/' + shipmentGT.SHIPMENTS,
      }),
      shippingWarehouse () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.stock.name,
            text: shipment.stock.name,
          }
        })
      },
      carriers () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.carrier,
            text: shipment.carrier,
          }
        })
      },
      cars () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.car ?? shipment.trailer,
            text: shipment.car ?? shipment.trailer,
          }
        })
      },
      weights () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.weight,
            text: shipment.weight,
          }
        })
      },
      drivers () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.driver,
            text: shipment.driver,
          }
        })
      },
      routes () {
        return this.shipments.map(shipment => {
          return {
            value: shipment.id,
            text: shipment.id,
          }
        })
      },
    },
    async mounted () {
      await this.fetchData()
    },
    methods: {
      ...mapActions({
        fetchList: 'shipment/' + shipmentAT.LIST,
      }),
      onFilter () {
        this.$emit('filter', this.filteredValue)
      },
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
