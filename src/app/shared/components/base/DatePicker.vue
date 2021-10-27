<template>
  <div
    v-click-outside="closePicker"
    style="position: relative"
  >
    <p
      v-if="title"
      class="roboto-s-regular accent--text"
      style="margin-bottom: 10px"
      v-text="title"
    />
    <base-text-field
      v-mask="textMask"
      class="text-field__picker"
      :value="textFieldValue"
      readonly
      hide-details
      v-bind="[$attrs]"
      @focus="openPicker"
    >
      <template v-slot:append>
        <v-icon
          size="24"
          color="accent"
        >
          $icons_date
        </v-icon>
      </template>
    </base-text-field>
    <date-range-picker
      ref="picker"
      v-bind="[$attrs, propsPicker]"
      :date-range="dateRange"
      v-on="$listeners"
      @update="update"
      @finishSelection="finishSelection"
    >
      <template
        v-for="scopedSlot in Object.keys(scopedSlots)"
        #[scopedSlot]="props"
      >
        <slot
          :name="scopedSlot"
          v-bind="props"
        />
      </template>
      <template
        v-for="slot in Object.keys(slots)"
        #[slot]
      >
        <slot
          :name="slot"
        />
      </template>
    </date-range-picker>
    <ul
      v-if="textRanges"
      class="text-ranges__picker d-flex pa-0 secondary--text"
    >
      <li
        v-for="(drt, idx) in dateTextRangeList"
        :key="idx"
        @click="update(drt)"
      >
        <p class="roboto-s-regular text-href mb-0">
          {{ drt.text }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import { ClickOutside } from 'vuetify/lib/directives'
  import { VueMaskDirective as Mask } from 'v-mask'
  import BaseMixin from './baseMixin'
  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

  export default {
    components: { DateRangePicker },
    directives: { ClickOutside, Mask },
    mixins: [BaseMixin],
    inheritAttrs: false,
    model: {
      prop: 'dateRange',
      event: 'update',
    },
    props: {
      dateRange: {
        type: Object,
        default () {
          return {
            startDate: null,
            endDate: null,
          }
        },
      },
      dateFormat: {
        type: String,
        default: 'DD.MM.YYYY',
      },
      delimiter: {
        type: String,
        default: ' - ',
      },
      title: {
        type: String,
        default: '',
      },
      textRanges: Boolean,
    },
    data () {
      const current = this.$moment().toDate()

      return {
        textFieldValue: '',
        dateTextRangeList: [
          {
            text: 'Вчера',
            startDate: this.$moment().subtract(1, 'day').toDate(),
          },
          {
            text: 'Неделя',
            startDate: current,
            endDate: this.$moment().add(1, 'w').toDate(),
          },
          {
            text: 'Месяц',
            startDate: current,
            endDate: this.$moment().add(1, 'M').toDate(),
          },
          {
            text: 'Квартал',
            startDate: current,
            endDate: this.$moment().add(1, 'Q').toDate(),
          },
        ],
        defaultLocaleData: {
          firstDay: 1,
          applyLabel: 'Применить',
          cancelLabel: 'Отменить',
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          daysOfWeek: ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        },
      }
    },
    computed: {
      parentSlots () {
        return Object.keys(this.$scopedSlots)
      },
      propsPicker () {
        return {
          showDropdowns: false,
          localeData: Object.assign({}, this.defaultLocaleData),
          timePickerIncrement: 1,
          ranges: false,
        }
      },
      textMask () {
        let mask = this.dateFormat.replace(/[dmyhms]/gmi, '#')
        if (this.isRange) mask += this.delimiter + mask
        return mask
      },
      isRange () {
        return !!this.dateRange.endDate
      },
    },
    mounted () {
    },
    methods: {
      closePicker () {
        this.$refs.picker && this.$refs.picker.clickCancel()
      },
      openPicker () {
        this.$refs.picker.togglePicker(true, false)
        this.$nextTick(() => {
          this.$nextTick(() => {
            document.body.removeEventListener('click', this.$refs.picker.clickAway)
          })
        })
      },
      finishSelection () {
        this.$refs.picker.clickedApply()
      },
      update (v) {
        const startDate = this.$moment(v.startDate).format(this.dateFormat)
        const endDate = this.$moment(v.endDate).format(this.dateFormat)

        let text = startDate
        if (v.endDate) text += this.delimiter + endDate
        this.$set(this, 'textFieldValue', text)

        this.$emit('update', v)
      },
    },
  }
</script>

<style lang="scss">
.text-field__picker {
  .v-input__append-inner {
    margin-top: 13px !important;
  }
}

.text-ranges__picker {
  list-style: none;
  margin-top: 20px;
  li {
    margin-right: 20px;
  }
}

.vue-daterange-picker {
  position: absolute !important;
  left: 0;
  min-width: 785px !important;
  .reportrange-text {
    display: none;
  }
  .daterangepicker {
    border: none;
    box-shadow: $block-box-shadow;
    min-width: 0;
    .drp-buttons {
      display: none;
    }
    .drp-calendar {
      max-width: none;
      width: auto;
      padding-bottom: 11px !important;
      padding-bottom: 52px;
      &.left {
        .calendar-table {
          padding-right: 39px;
        }
      }
    }
    .calendars-container {
      .calendar-table {
        table {
          border-collapse: separate;
          border-spacing: 24px 24px;
        }
        thead {
          tr {
            position: relative;
          }
          th {
            color: #3F3B3B;
            &.month {
              @include roboto-l-regular;
              padding-bottom: 7px;
            }
            &.prev {
              left: 47px;
              background-image: url('~@/assets/icons/date-prev.svg');
            }
            &.next {
              right: 42px;
              background-image: url('~@/assets/icons/date-next.svg');
            }
            &.prev, &.next {
              position: absolute;
              margin-top: 9px;
              display: none;
              min-width: 24px;
              width: 24px;
              span {
                border: none;
                transform: none;
                width: 16px;
                height: 16px;
              }
              &.available {
                display: block;
              }
            }
          }
        }
        tbody {
          tr {
            td {
              @include roboto-s-regular;
              color: #3F3B3B;
              line-height: 19px;
              width: 24px;
              min-width: 24px;
              max-width: 24px;
              border: none;
              border-radius: 50%;
              &.disabled {
                opacity: 0;
              }
              &.off {
                color: var(--v-hidden-base);
              }
              &.active {
                position: relative;
                background-color: transparent !important;
                z-index: 1;
                color: var(--v-main-base);
                &:before {
                  position: absolute;
                  content: '';
                  background-color: var(--v-secondary-base);
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  z-index: -1;
                  top: -4px;
                  left: -4px;
                }
                &:after {
                  position: absolute;
                  content: '';
                  background-color: #FFDAE3;
                  width: 36px;
                  height: 32px;
                  z-index: -2;
                  top: -4px;
                }
                &.start-date.end-date {
                  &:after {
                    content: none;
                  }
                }
                &.start-date {
                  &:after {
                    left: 10px;
                  }
                }
                &.end-date {
                  &:after {
                    left: -20px;
                  }
                }
              }
              &.in-range:not(.active) {
                position: relative;
                background-color: transparent !important;
                z-index: 1;
                &:before {
                  position: absolute;
                  content: '';
                  background-color: #FFDAE3;
                  width: 32px;
                  height: 32px;
                  z-index: -1;
                  top: -4px;
                  left: -4px;
                }
                &:after {
                  position: absolute;
                  content: '';
                  background-color: #FFDAE3;
                  width: 32px;
                  height: 32px;
                  z-index: -1;
                  top: -4px;
                  left: 20px;
                }
              }
              &:last-child {
                &.active.start-date {
                  &:after {
                    content: none;
                  }
                }
                &.in-range:not(.active) {
                  &:before {
                    left: -12px;
                  }
                  &:after {
                    border-radius: 50%;
                    left: 4px;
                  }
                }
              }
              &:first-child {
                &.active.end-date {
                  &:after {
                    content: none;
                  }
                }
                &.in-range:not(.active) {
                  &:before {
                    border-radius: 50%;
                  }
                  &:after {
                    width: 38px;
                    left: 14px;
                  }
                }
              }
            }
          }
          tr > th {
            width: 24px;
            min-width: 24px;
            max-width: 24px;
            @include roboto-s-medium;
            line-height: 5px;
          }
        }
      }
    }
  }
}
</style>
