<template>
  <base-navigation-drawer
    v-model="internalValue"
    width="1140"
    close
  >
    <div
      v-if="this.$wait.is('[dashboard] loading detail shipment') || !internalValue"
      class="loading-block"
    >
      <v-progress-circular
        class="loading-drawer"
        indeterminate
        color="secondary"
        :size="60"
      />
      <v-overlay
        class="overlay-drawer"
        :value="true"
      />
    </div>
    <div v-else>
      <block
        class="d-flex aligh-center"
        style="min-height: 190px; padding: 25px 24px 0 24px"
      >
        <ul class="info__list">
          <li
            class="info__item"
            style="margin-right: 60px"
          >
            <p class="roboto-s-regular info--text">
              Объект
            </p>
            <p class="roboto-m-regular accent--text mb-0">
              {{ detailByShipment.car || '-' }}
            </p>
          </li>
          <li
            class="info__item"
            style="margin-right: 45px"
          >
            <p class="roboto-s-regular info--text">
              Прицеп
            </p>
            <p class="roboto-m-regular accent--text mb-0">
              {{ detailByShipment.trailer || '-' }}
            </p>
          </li>
          <li
            class="info__item"
            style="margin-right: 42px"
          >
            <p class="roboto-s-regular info--text">
              Компания перевозчик
            </p>
            <p class="roboto-m-regular accent--text mb-0">
              {{ detailByShipment.carrier || '-' }}
            </p>
          </li>
          <li
            class="info__item"
            style="margin-right: 42px"
          >
            <p class="roboto-s-regular info--text">
              Грузоподъемность
            </p>
            <p class="roboto-m-regular accent--text mb-0">
              {{ detailByShipment.weight || '-' }}
            </p>
          </li>
          <li
            class="info__item"
            style="margin-right: 56px"
          >
            <p class="roboto-s-regular info--text">
              Водитель
            </p>
            <p class="roboto-m-regular accent--text mb-0">
              {{ detailByShipment.driver || '-' }}
            </p>
          </li>
          <li
            class="info__item"
            style="margin-right: 80px"
          >
            <p class="roboto-s-regular info--text">
              Телефон
            </p>
            <p class="roboto-m-regular accent--text mb-0">
              {{ detailByShipment.phone || '-' }}
            </p>
          </li>
          <li class="info__item">
            <base-btn
              min-width="187"
              max-width="187"
              height="48"
              @click="telPhone"
            >
              <!-- <input ref="tel" type="tel" :value="detailByShipment.phone"> -->
              <v-img
                :src="require('@/assets/icons/phone.png')"
                max-height="22"
                max-width="22"
                style="margin: 0 5px 0 0 !important;"
              />
              <p
                class="roboto-l-regular main--text mb-0"
                style="letter-spacing: normal"
              >
                Позвонить
              </p>
            </base-btn>
          </li>
        </ul>
      </block>

      <div class="d-flex">
        <block style="min-height: 257px; padding: 21px 24px 16px 24px; margin-right: 36px; width: 564px">
          <p
            class="roboto-l-medium accent--text"
            style="margin-bottom: 40px;margin-top: 6px;"
          >
            Детали маршрута
          </p>
          <ul class="info__list">
            <li
              class="info__item"
              style="margin-right: 146px"
            >
              <p class="roboto-s-regular info--text">
                № маршрутного листа
              </p>
              <p class="roboto-m-regular accent--text mb-0">
                {{ detailByShipment.id || '-' }}
              </p>
            </li>
            <li
              class="info__item"
              style="margin-right: 40px"
            >
              <p class="roboto-s-regular info--text">
                Вес груза
              </p>
              <p class="roboto-m-regular accent--text mb-0">
                520 кг
              </p>
            </li>
            <li
              class="info__item"
            >
              <p class="roboto-s-regular info--text">
                Кол-во ТТ
              </p>
              <p class="roboto-m-regular accent--text mb-0">
                {{ pointsCount || '-' }}
              </p>
            </li>
            <li
              class="info__item mb-0"
              style="margin-right: 166px"
            >
              <p class="roboto-s-regular info--text">
                Маршрут
              </p>
              <p class="roboto-m-regular accent--text mb-0">
                {{ detailByShipment.stock.name || '-' }}
              </p>
            </li>
            <li
              class="info__item mb-0"
            >
              <p class="roboto-s-regular info--text">
                Склад отгрузки
              </p>
              <p class="roboto-m-regular accent--text mb-0">
                {{ detailByShipment.loading_zone ? detailByShipment.loading_zone.name || '-' : '-' }}
              </p>
            </li>
          </ul>
        </block>
        <block
          class="d-flex flex-column align-center"
          style="padding: 21px 24px 16px 24px; width: 300px"
        >
          <p
            class="roboto-s-regular info--text"
            style="margin-top: 19px; margin-bottom: 20px"
          >
            Прогресс маршрута
          </p>
          <progress-circle
            :completed-steps="completedPoints"
            circle-color="var(--v-primary-base)"
            :start-color="progressMileageColor"
            :stop-color="progressMileageColor"
            :diameter="150"
            :circle-width="12"
            :total-steps="pointsCount"
          >
            <p
              class="roboto-xl-bold accent--text mb-0"
              style="font-size: 36px !important; font-weight: 700 !important;"
            >
              {{ completedPercent }}%
            </p>
          </progress-circle>
        </block>
      </div>

      <div class="d-flex">
        <block
          class="d-flex flex-row align-center justify-space-between"
          style="padding: 35px 40px 32px 20px; margin-right: 30px; min-height: 120px; width: 280px"
        >
          <p
            class="roboto-s-regular info--text mb-0"
            style="line-height: 22px;"
          >
            Текущая температура
          </p>
          <p
            class="roboto-xl-bold accent--text mb-0"
            style="font-size: 56px"
          >
            {{ (detailByShipment.curr_temp == 0 ? '' : detailByShipment.curr_temp > 0 ? '+' : '') + detailByShipment.curr_temp }}°
          </p>
        </block>
        <block
          class="d-flex flex-row align-center justify-space-between"
          style="padding: 35px 40px 32px 20px; margin-right: 30px; min-height: 120px; width: 280px"
        >
          <p
            class="roboto-s-regular info--text mb-0"
            style="line-height: 22px;"
          >
            Средняя температура
          </p>
          <p
            class="roboto-xl-bold accent--text mb-0"
            style="font-size: 56px;"
          >
            {{ (detailByShipment.avg_temp == 0 ? '' : detailByShipment.avg_temp > 0 ? '+' : '') + detailByShipment.avg_temp }}°
          </p>
        </block>
        <block
          class="d-flex flex-column"
          style="padding: 38px 40px 32px 20px; min-height: 120px; width: 280px"
        >
          <div
            class="d-flex align-center"
            style="margin-bottom: 14px"
          >
            <p
              class="roboto-s-regular info--text mb-0"
              style="margin-right: 20px"
            >
              Пробег:
            </p>
            <p class="roboto-s-bold accent--text mb-0">
              {{ detailByShipment.mileage || '-' }}
            </p>
          </div>
          <div class="d-flex align-center">
            <p
              class="roboto-s-regular info--text mb-0"
              style="margin-right: 20px"
            >
              Время:
            </p>
            <p class="roboto-s-bold accent--text mb-0">
              {{ detailByShipment.duration || '-' }}
            </p>
          </div>
        </block>
      </div>

      <block
        class="b-temps d-flex flex-column"
      >
        <template v-if="!Object.keys(detailByShipment.temps).length">
          <chart
            class="temp-chart"
            height="321"
            width="751"
            :data="getChartData([])"
            :options="getChartOptions($moment().utc().format('DD.MM.YYYY'))"
            :plugins="chartPlugins"
          />
        </template>
        <template v-else>
          <chart
            v-for="(temp, key) in detailByShipment.temps"
            :key="key"
            class="temp-chart"
            :data="getChartData(temp)"
            height="321"
            width="751"
            :options="getChartOptions(key)"
            :plugins="chartPlugins"
          />
        </template>
      </block>

      <block-violations />
      <block-routes-map />
    </div>
  </base-navigation-drawer>
</template>

<script>
  import { actionsTypes, gettersTypes } from '@/app/entities/dashboard/shared/state/dashboard'
  import { mapActions, mapGetters } from 'vuex'
  import { theme } from '@/plugins/vuetify'
  import Chart from '@/app/shared/components/graphs/Chart'
  import { ProgressCircle } from 'vue-progress-circle'
  import Block from '@/app/shared/components/general/Block'
  // blocks
  import BlockRoutesMap from './blocks/BlockRoutesMap'
  import BlockViolations from './blocks/BlockViolations'

  export default {
    components: {
      Block,
      ProgressCircle,
      Chart,
      BlockRoutesMap,
      BlockViolations,
    },
    model: {
      prop: 'value',
      event: 'update',
    },
    props: {
      value: Boolean,
    },
    data () {
      return {
        internalValue: false,
        chartPlugins: [{
          beforeDraw: function (instance) {
            if (instance.chartArea) {
              var ctx = instance.$context.chart.ctx
              var chartArea = instance.chartArea
              const heightPart = (ctx.canvas.height / 4)
              const heightHalf = (ctx.canvas.height / 2)

              ctx.save()
              ctx.fillStyle = 'rgba(111, 207, 151, 0.2)'
              ctx.fillRect(chartArea.left, chartArea.top + heightPart, chartArea.right - chartArea.left, chartArea.bottom - (chartArea.top + heightHalf))
              ctx.restore()
            }
          },
        }],
      }
    },
    computed: {
      ...mapGetters({
        detailByShipment: 'dashboard/dashboard/' + gettersTypes.DETAIL_BY_SHIPMENT,
      }),
      pointsCount () {
        return this.detailByShipment.retail_outlets?.length
        ? this.detailByShipment.retail_outlets.length + 1 : ''
      },
      completedPoints () {
        let completed = 0

        if (this.detailByShipment.loading_zone.passed ||
          this.detailByShipment.loading_zone.late) {
          completed++
        }

        this.detailByShipment.retail_outlets.forEach(r => {
          if (r.passed || r.late) completed++
        })

        return completed
      },
      completedPercent () {
        return Math.floor(100 * (this.completedPoints / this.pointsCount))
      },
      progressMileageColor () {
        return (this.completedPercent < 50) ? 'var(--v-secondary-base)'
          : (this.completedPercent >= 50 && this.completedPercent <= 90) ? 'var(--v-warning-base)'
            : (this.completedPercent > 91) ? 'var(--v-success-base)' : ''
      },
    },
    watch: {
      value (v) {
        this.internalValue = v
      },
      internalValue (v) {
        this.$emit('update', v)
      },
    },
    methods: {
      ...mapActions({
        fetchDetail: 'dashboard/dashboard/' + actionsTypes.LIST,
      }),
      getChartOptions (title) {
        return {
          plugins: {
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: function (context) {
                  return 'Время: ' + context[0].label
                },
                label: function (context) {
                  return 'Температура: ' + (context.raw > 0 ? '+' : '') + context.raw + '°'
                },
              },
            },
          },
          scales: {
            yAxes: {
              ticks: {
                callback: function (value, index, values) {
                  return (value > 0 ? '+' : '') + value + '°'
                },
              },
              grid: {
                display: false,
              },
            },
            xAxes: {
              grid: {
                display: false,
              },
            },
          },
        }
      },
      getChartData (temps) {
        return {
          labels: Object.keys(temps),
          datasets: [{
            labels: this.$_.range(-42, 43),
            data: Object.values(temps),
            fill: false,
            pointRadius: 1,
            borderColor: theme.secondary,
          }],
          plugins: {},
        }
      },
      telPhone () {
        window.location.href = 'tel://' + this.detailByShipment.phone
      },
    },
  }
</script>

<style lang="scss" scoped>
.info__list {
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  .info__item {
    margin-bottom: 30px;
    p {
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
}
.loading-drawer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 6;
}
.b-temps {
  position: relative;
  padding: 20px 40px 0 20px;
  height: 387px;
  overflow-y: auto;
  @include scrollbar;
  .temp-chart {
    &:first-child {
      margin-bottom: 0 !important;
    }
    &:not(:first-child) {
      margin-top: 10px;
    }
    &:last-child {
      margin-bottom: 20px;
    }
  }
}
</style>
