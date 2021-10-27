<template>
  <v-container>
    <v-row>
      <p class="h1 mt-5">
        Иконки
      </p>
      <v-col
        class="d-flex align-center"
        cols="12"
      >
        <v-icon
          v-for="icon in icons"
          :key="icon"
          color="accent"
          size="24"
          class="mr-3"
        >
          {{ '$icons_' + icon }}
        </v-icon>
        <v-img
          :src="require('@/assets/icons/wialon-full.png')"
          max-width="64"
          max-height="17"
        />
        <v-img
          :src="require('@/assets/icons/phone.png')"
          max-width="22"
          max-height="22"
        />
        <v-img
          :src="require('@/assets/icons/delete-38x38.png')"
          max-width="38"
        />
      </v-col>
      <p class="h1">
        Шрифты
      </p>
      <v-col cols="12">
        <p class="text-h1">
          Шрифт h1
        </p>
        <p class="text-subtitle-1">
          Шрифт subtitle-1
        </p>
        <p class="text-body-1">
          Шрифт body-1
        </p>
        <p class="text-button">
          Шрифт button
        </p>
        <p class="futura-pt-l-medium">
          Шрифт Futura PT L Medium
        </p>
        <p class="futura-pt-l-bold">
          Шрифт Futura PT L Bold
        </p>
      </v-col>
      <p class="h1">
        Цвета
      </p>
      <v-col
        class="d-flex align-center"
        cols="12"
      >
        <p class="text-body-1 primary--text accent">
          Primary
        </p>
        <p class="text-body-1 secondary--text">
          Secondary
        </p>
        <p class="text-body-1 accent--text">
          Accent
        </p>
        <p class="text-body-1 info--text">
          Info
        </p>
        <p class="text-body-1 warning--text">
          Warning
        </p>
        <p class="text-body-1 success--text">
          Success
        </p>
        <p class="text-body-1 error--text">
          Error
        </p>
        <p class="text-body-1 hidden--text">
          Hidden
        </p>
        <p class="text-body-1 active--text">
          Active
        </p>
        <p class="text-body-1 border--text">
          Border
        </p>
      </v-col>
      <p class="h1">
        Компоненты
      </p>
      <v-col
        class="d-flex align-center"
        cols="12"
      >
        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Текстовое поле
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <base-text-field
                label="Поле"
                hide-details
                max-width="250"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Поле дата
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <base-date-picker
                v-model="dateRange"
                :min-date="$moment('23.10.2021', 'DD.MM.YYYY').toDate()"
                :date-format="$config.date.MIN_DATE"
                label="Период дат"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Выпадающие меню
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <base-select
                :items="selectItems"
                label="Склад отгрузки"
                height="48"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Кнопка
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <base-btn>
                <v-icon size="22">
                  $icons_date
                </v-icon>
                <p class="text-button text-capitalize mb-0">
                  Кнопка
                </p>
              </base-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Фильтр
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <main-filter />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="primary">
            <v-expansion-panel-header>
              Таблица
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <base-data-table
                :headers="tableHeaders"
                :items="tableItems"
              >
                <template v-slot:[`item.date_shipping`]="{ item }">
                  {{ item.date_shipping | moment($config.date.MIN_DATE) }}
                </template>
              </base-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MainFilter from '@/app/shared/components/general/MainFilter'
  import { CUSTOM_ICONS } from '@/plugins/icons'

  export default {
    components: { MainFilter },
    data: function () {
      return {
        icons: Object.keys(CUSTOM_ICONS),
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
            temp: '-4 (норма)',
            performance: '30% (13/30)',
          },
        ],
      }
    },
    mounted () {},
  }
</script>

<style lang="scss" scoped>
</style>
