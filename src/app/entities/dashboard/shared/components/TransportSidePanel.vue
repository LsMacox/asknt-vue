<template>
  <base-navigation-drawer
    v-model="internalValue"
    width="1140"
    close
  >
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
            У432АС 177
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
            Х846ТО 177
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
            Куриное царство Курск
          </p>
        </li>
        <li
          class="info__item"
        >
          <p class="roboto-s-regular info--text">
            Грузоподъемность
          </p>
          <p class="roboto-m-regular accent--text mb-0">
            10 тонн
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
            Хачатурян Гоги Инакентьевич
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
            +7 (916) 457-54-50
          </p>
        </li>
        <li class="info__item">
          <base-btn
            min-width="187"
            max-width="187"
            height="48"
          >
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
              sdf456sdf684
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
              12
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
              БМПК-Владимир
            </p>
          </li>
          <li
            class="info__item mb-0"
          >
            <p class="roboto-s-regular info--text">
              Склад отгрузки
            </p>
            <p class="roboto-m-regular accent--text mb-0">
              Склад №1
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
          :completed-steps="45"
          circle-color="var(--v-primary-base)"
          start-color="var(--v-secondary-base)"
          stop-color="var(--v-secondary-base)"
          :diameter="150"
          :circle-width="12"
          :total-steps="100"
        >
          <p
            class="roboto-xl-bold accent--text mb-0"
            style="font-size: 36px !important; font-weight: 700 !important;"
          >
            45%
          </p>
        </progress-circle>
      </block>
    </div>

    <div class="d-flex">
      <block
        class="d-flex flex-row align-center"
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
          +5°
        </p>
      </block>
      <block
        class="d-flex flex-row align-center"
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
          +2°
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
            14 356км
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
            8ч 32мин
          </p>
        </div>
      </block>
    </div>

    <block
      class="d-flex flex-column"
      style="padding: 32px 40px 32px 20px; min-height: 432px;"
    >
      <chart
        :data="chartData"
        height="321"
        width="751"
        :options="chartOptions"
        :plugins="chartPlugins"
      />
    </block>

    <block class="b-violations d-flex flex-column">
      <div class="d-flex violations-header align-center justify-space-between">
        <p
          class="roboto-l-medium accent--text mb-0"
          style="min-height: 36px;"
        >
          Нарушения
        </p>
        <v-btn
          v-if="!showPayOff"
          class="violations__btn-filter"
          text
        >
          <v-icon
            size="16"
            color="accent"
          >
            $icons_filter
          </v-icon>
          <p class="roboto-s-regular accent--text mb-0">
            Сортировать
          </p>
        </v-btn>
      </div>

      <template v-if="!showPayOff">
        <base-data-table
          class="violations-table"
          :headers="tableHeaders"
          :items="tableItems"
          :hide-default-header="false"
        >
          <template v-slot:[`header.checkbox`]>
            <v-checkbox
              class="header-checkbox"
              color="secondary"
              on-icon="$icons_checked"
              off-icon="$icons_checked-off"
              :ripple="false"
              hide-details
              @change="violationItemsChecked($event)"
            />
          </template>
          <template v-slot:[`item.checkbox`]="{ item }">
            <v-checkbox
              v-model="item.checked"
              color="secondary"
              on-icon="$icons_checked"
              off-icon="$icons_checked-off"
              :ripple="false"
              hide-details
            />
          </template>
          <template v-slot:[`item.date_time`]="{ item }">
            {{ item.date_time | moment($config.date.MAX_DATE) }}
          </template>
        </base-data-table>
        <div
          v-if="violationCount"
          class="violations__control"
        >
          <p class="count-text roboto-s-regular mb-0 accent--text">
            Выбрано {{ violationCount }} нарушение
          </p>
          <base-btn
            class="btn-cancel"
            min-width="160"
            max-width="160"
            height="40"
            color="hidden"
            @click="violationItemsChecked(false)"
          >
            <p
              class="text-button main--text mb-0"
            >
              Отменить
            </p>
          </base-btn>
          <base-btn
            class="btn-action"
            min-width="160"
            max-width="160"
            height="40"
            @click="showPayOff = true"
          >
            <p
              class="text-button main--text mb-0"
            >
              Погасить
            </p>
          </base-btn>
        </div>
      </template>
      <template v-else>
        <p
          class="roboto-s-regular accent--text mb-2"
          style="margin-top: 26px;"
        >
          Комментарий диспетчера
        </p>
        <v-textarea
          v-model="payoffComment"
          :single-line="false"
          outlined
          hide-details
          style="max-width: 500px"
          placeholder="Выберите склады"
        />
        <div
          class="d-flex"
          style="margin-top: 20px; margin-bottom: 106px;"
        >
          <base-btn
            class="btn-action"
            min-width="160"
            max-width="160"
            height="40"
            style="margin-right: 20px;"
          >
            <p
              class="text-button main--text mb-0"
            >
              Погасить
            </p>
          </base-btn>
          <base-btn
            class="btn-cancel"
            min-width="160"
            max-width="160"
            height="40"
            color="hidden"
            @click="showPayOff = false"
          >
            <p
              class="text-button main--text mb-0"
            >
              Отменить
            </p>
          </base-btn>
        </div>
      </template>
    </block>

    <block class="b-routes_map d-flex flex-column">
      <ul class="routes-map__list">
        <li
          v-for="(rmap, rmapIdx) in routesMap"
          :key="rmapIdx"
          class="routes-map__item"
        >
          <div class="item-title">
            <p
              class="roboto-s-medium secondary--text mb-0"
              @click="toggleMore(rmap.uuid)"
              v-text="rmap.transportName"
            />
            <v-btn
              class="btn-more text-center"
              text
              @click="toggleMore(rmap.uuid)"
            >
              <p
                class="roboto-s-medium secondary--text ma-0"
              >
                {{ itemShowList[rmap.uuid] ? 'Свернуть все' : 'Развернуть' }}
              </p>
            </v-btn>
          </div>
          <ul
            class="points__list"
          >
            <li
              v-for="(point, pointIdx) in rmap.points"
              :key="pointIdx"
              class="points__item"
              :class="{
                'item--success': point.type === 'success',
                'item--error': point.type === 'error',
              }"
            >
              <div class="d-flex align-center">
                <p
                  class="item-point_name roboto-s-medium secondary--text mb-0"
                  @click="toggleShow(point.uuid)"
                >
                  {{ point.name }}
                </p>
                <p class="roboto-sm-medium info--text mb-0">
                  № заказа:
                </p>
                <p class="item-order_name roboto-sm-medium accent--text mb-0">
                  {{ point.order_name }}
                </p>
              </div>
              <ul
                v-if="itemShowList[point.uuid]"
                class="info__list"
              >
                <li
                  v-for="(info, infoIdx) in point.info_items"
                  :key="infoIdx"
                  class="info__item"
                >
                  <p
                    class="item-info_title roboto-sm-medium info--text"
                    v-text="info.title"
                  />
                  <p
                    class="roboto-sm-medium mb-0"
                    :class="{
                      'accent--text': !info.type,
                      'secondary--text': info.type === 'error',
                      'success--text': info.type === 'success'
                    }"
                    v-text="info.text"
                  />
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </block>
  </base-navigation-drawer>
</template>

<script>
  import { theme } from '@/plugins/vuetify'
  import Chart from '@/app/shared/components/graphs/Chart'
  import { ProgressCircle } from 'vue-progress-circle'
  import Block from '@/app/shared/components/general/Block'
  import { v4 as uuidv4 } from 'uuid'

  export default {
    components: { Block, ProgressCircle, Chart },
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
        showPayOff: false,
        payoffComment: '',
        tableHeaders: [
          { text: '', align: 'start', sortable: false, class: 'header-checkbox', cellClass: 'item-checkbox', value: 'checkbox' },
          { text: 'Дата и время', align: 'start', class: 'header-date_time', cellClass: 'item-date_time', sortable: false, value: 'date_time' },
          { text: 'Тип нарушения', value: 'type', sortable: false },
          { text: 'Текст нарушения ', value: 'text', cellClass: 'info--text', sortable: false },
        ],
        itemShowList: {},
        routesMap: [
          {
            uuid: uuidv4(),
            transportName: 'БИКОМ',
            points: [
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                type: 'success',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34', type: 'error' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                type: 'error',
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                type: 'success',
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
              {
                uuid: uuidv4(),
                name: 'Пятерочка 1 (547256)',
                order_name: 'pqer125 (полуфабрикаты), wder348 (сосиски)',
                info_items: [
                  { title: 'Приезд план', text: '09:00 - 10:30' },
                  { title: 'Приезд факт', text: '10:34' },
                  { title: 't°', text: '+5°' },
                  { title: 'Выезд факт', text: '10:46' },
                  { title: 't°', text: '+5°' },
                  { title: 'Время на ТТ', text: '12 мин' },
                  { title: 'Открытие двери', text: '9 мин' },
                ],
              },
            ],
          },
        ],
        tableItems: [
          {
            checked: false,
            date_time: new Date(),
            type: 'Опоздание на загрузку',
            text: 'Прибытие в 9:21, норма 08:00-09:00',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Опоздание на ТТ',
            text: 'Прибытие в 9:21, норма 08:00-09:00',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Опоздание на ТТ',
            text: 'Прибытие в 9:21, норма 08:00-09:00',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Нарушение температуры',
            text: 'Температура 0, норма от -6 до -2',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Нарушение температуры',
            text: 'Температура 0, норма от -6 до -2',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Опоздание на ТТ',
            text: 'Прибытие в 9:21, норма 08:00-09:00',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Опоздание на ТТ',
            text: 'Прибытие в 9:21, норма 08:00-09:00',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Нарушение температуры',
            text: 'Температура 0, норма от -6 до -2',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Нарушение температуры',
            text: 'Температура 0, норма от -6 до -2',
          },
          {
            checked: false,
            date_time: new Date(),
            type: 'Опоздание на ТТ',
            text: 'Прибытие в 9:21, норма 08:00-09:00',
          },
        ],
        chartData: {
          labels: [
            '08:00', '08:10', '08:20', '08:30', '08:40', '08:50', '09:00', '09:10', '09:20', '09:30',
            '09:40', '09:50', '10:00', '10:10', '10:20', '10:30', '10:30', '10:40', '10:50', '11:00', '11:10',
          ],
          datasets: [{
            labels: [
              -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
              21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
            ],
            data: [
              -2, 3, 5, 8, 2, 8, 0, 1, 42,
            ],
            fill: false,
            pointRadius: 1,
            borderColor: theme.secondary,
          }],
        },
        chartOptions: {
          plugins: {
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
        },
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
      violationCount () {
        return this.$_.where(this.tableItems, { checked: true }).length
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
      toggleShow (id) {
        if (Object.keys(this.itemShowList).includes(id)) {
          delete this.itemShowList[id]
          this.itemShowList = Object.assign({}, this.itemShowList)
          return false
        }
        this.$set(this.itemShowList, id, id)
        return true
      },
      toggleMore (id) {
        const ids = this.routesMap.map(rm => {
          return rm.points.map(p => p.uuid)
        }).flat()

        const isShowMore = this.toggleShow(id)

        ids.forEach(id => {
          if (isShowMore) {
            this.itemShowList[id] = id
          } else if (this.itemShowList[id]) {
            delete this.itemShowList[id]
          }
        })

        this.itemShowList = Object.assign({}, this.itemShowList)
      },
      violationItemsChecked (bool) {
        this.tableItems = this.tableItems.map(item => {
          item.checked = bool
          return item
        })
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
.b-violations {
  position: relative;
  padding: 27px 24px 20px 24px;
  .violations-table {
    & ::v-deep {
      box-shadow: none;
      .v-data-table__wrapper {
        max-height: 274px;
        overflow-y: auto;
        @include scrollbar;
      }
      .header-checkbox {
        width: 0;
        padding: 0 0 5px 0 !important;
      }
      .header-date_time {
        padding-left: 9px !important;
      }
      .item-checkbox {
        width: 0;
        padding: 0 !important;
      }
      .item-date_time {
        padding-left: 10px !important;
      }
      .v-data-table-header {
        background-color: var(--v-main-base) !important;
        &:before {
          content: none;
        }
        tr > th {
          padding-bottom: 5px;
          height: 24px;
        }
      }
      .v-data-footer {
        margin-top: 20px;
        padding-bottom: 0;
        padding-left: 0;
      }
    }
  }
  .violations-header {
    margin-bottom: 16px;
  }
  .violations__control {
    position: absolute;
    height: 118px;
    width: 100%;
    left: 0;
    bottom: 0;
    background: linear-gradient(177.86deg, rgba(255, 255, 255, 0.4) 1.8%, #FFFFFF 98.2%);
    display: flex;
    align-items: center;
    .count-text {
      margin: 0 61px;
    }
    .btn-cancel {
      margin-right: 20px;
    }
  }
  .violations__btn-filter {
    &:hover {
      & ::v-deep {
        p {
          &:before {
            background-image: linear-gradient(to right, var(--v-secondary-base) 43%, rgba(255,255,255,0) 0%);
          }
        }
      }
    }
    & ::v-deep {
      .v-icon {
        margin-right: 5px !important;
      }
      p {
        @include text-to-href;
        &:before {
          bottom: -1px;
          background-image: linear-gradient(to right, var(--v-accent-base) 43%, rgba(255,255,255,0) 0%);
          background-size: 4px 1px;
        }
      }
    }
  }
}

@mixin status-circle {
  &:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border: 1px solid var(--v-hidden-base);
    border-radius: 50%;
    top: 0px;
    background: var(--v-main-base);
  }
}

.b-routes_map {
  padding: 50px 24px 35px 45px;
  height: 900px;
  .routes-map__list {
    list-style: none;
    padding: 10px 0;
    position: relative;
    max-height: 900px;
    overflow-y: auto;
    @include scrollbar;
    .routes-map__item {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 1px;
        height: calc(100% - 4px);
        left: 14px;
        background-color: var(--v-hidden-base);
      }
      .item-title {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include status-circle;
        border: none;
        &:after {
          top: -3px;
          border: none;
          background: var(--v-success-base);
        }
        p {
          &:first-child {
            margin-left: 65px;
            @include text-to-href;
          }
        }
        .btn-more {
          margin-right: 80px;
          & ::v-deep {
            p {
              @include text-to-href;
            }
          }
        }
      }
      .points__list {
        list-style: none;
        padding: 0;
        .points__item {
          margin-left: 65px;
          margin-top: 40px;
          &.item--error {
            .item-point_name:after {
              border: none;
              background: #EB5757;
            }
          }
          &.item--success {
            .item-point_name:after {
              border: none;
              background: var(--v-success-base);
            }
          }
          .item-point_name {
            margin-right: 40px;
            @include text-to-href;
            @include status-circle;
            &:after {
              left: -60px;
              top: 2px;
              width: 20px;
              height: 20px;
            }
          }
          .item-order_name {
            padding-left: 5px;
          }
          .info__list {
            margin-top: 20px;
            .info__item {
              margin-bottom: 0;
              &:not(:last-child) {
                margin-right: 40px;
              }
              .item-info_title {
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
