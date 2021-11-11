<template>
  <block class="b-violations d-flex flex-column">
    <div class="d-flex violations-header align-center justify-space-between">
      <p
        class="roboto-l-medium accent--text mb-0"
        style="min-height: 36px;"
      >
        Нарушения
      </p>
      <v-btn
        v-if="!showComment"
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

    <template v-if="!showComment">
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
            @change="setForAllItemsStatusChecked($event)"
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
          @click="setForAllItemsStatusChecked(false)"
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
          @click="showComment = true"
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
        v-model="dispComment"
        :single-line="false"
        outlined
        hide-details
        style="max-width: 500px"
        placeholder="Введите комментарий"
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
          @click="showComment = false"
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
</template>

<script>
  import Block from '@/app/shared/components/general/Block'

  export default {
    components: { Block },
    data () {
      return {
        showComment: false,
        dispComment: '',
        tableHeaders: [
          { text: '', align: 'start', sortable: false, class: 'header-checkbox', cellClass: 'item-checkbox', value: 'checkbox' },
          { text: 'Дата и время', align: 'start', class: 'header-date_time', cellClass: 'item-date_time', sortable: false, value: 'date_time' },
          { text: 'Тип нарушения', value: 'type', sortable: false },
          { text: 'Текст нарушения ', value: 'text', cellClass: 'info--text', sortable: false },
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
      }
    },
    computed: {
      violationCount () {
        return this.$_.where(this.tableItems, { checked: true }).length
      },
    },
    methods: {
      setForAllItemsStatusChecked (bool) {
        this.tableItems = this.tableItems.map(item => {
          item.checked = bool
          return item
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
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
          color: var(--v-secondary-base);
        }
      }
    }
    & ::v-deep {
      .v-icon {
        margin-right: 5px !important;
      }
      p {
        color: var(--v-accent-base);
        @include text-to-href;
        &:before {
          bottom: -1px;
          background-size: 4px 1px;
        }
      }
    }
  }
}
</style>
