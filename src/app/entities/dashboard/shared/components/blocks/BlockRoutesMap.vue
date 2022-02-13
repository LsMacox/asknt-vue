<template>
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
            @click="toggleShow(rmap.uuid)"
            v-text="rmap.name"
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
          v-if="itemShowList[rmap.uuid]"
          class="info__list"
          style="margin-left: 65px"
        >
          <li
            v-for="(info, infoIdx) in rmap.info_items"
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
</template>

<script>
  import { gettersTypes } from '@/app/entities/dashboard/shared/state/dashboard'
  import { mapGetters } from 'vuex'
  import { v4 as uuidv4 } from 'uuid'
  import Block from '@/app/shared/components/general/Block'

  export default {
    components: { Block },
    data () {
      return {
        itemShowList: {},
      }
    },
    computed: {
      ...mapGetters({
        detailByShipment: 'dashboard/dashboard/' + gettersTypes.DETAIL_BY_SHIPMENT,
      }),
      routesMap () {
        const routes = []
        const points = []

        this.detailByShipment.retail_outlets.forEach(r => {
          points.push({
            uuid: uuidv4(),
            name: r.name + ' (' + r.code + ')',
            order_name: r.shipment_orders.map(order => order.product).join(', '),
            info_items: [
              { title: 'Приезд план', text: '09:00 - 10:30' },
              { title: 'Приезд факт', text: '10:34' },
              { title: 't°', text: '+5°' },
              { title: 'Выезд факт', text: '10:46' },
              { title: 't°', text: '+5°' },
              { title: 'Время на ТТ', text: '12 мин' },
              { title: 'Открытие двери', text: '9 мин' },
            ],
          })
        })

        routes.push({
          uuid: uuidv4(),
          name: this.detailByShipment.loading_zone.name,
          info_items: [
            { title: 'Приезд план', text: '09:00 - 10:30' },
            { title: 'Приезд факт', text: '10:34' },
            { title: 't°', text: '+5°' },
            { title: 'Выезд факт', text: '10:46' },
            { title: 't°', text: '+5°' },
            { title: 'Время на ТТ', text: '12 мин' },
            { title: 'Открытие двери', text: '9 мин' },
          ],
          points,
        })

        return routes
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
    },
  }
</script>

<style lang="scss" scoped>
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
  .info__list {
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .info__item {
      margin-bottom: 0;
      &:not(:last-child) {
        margin-right: 40px;
      }
      .item-info_title {
        margin-bottom: 5px;
      }
      p {
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }
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
        }
        &.item--error {
          &:after {
            border: none;
            background: var(--v-error-base);
          }
        }
        &.item--success {
          &:after {
            border: none;
            background: var(--v-success-base);
          }
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
              background: var(--v-error-base);
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
        }
      }
    }
  }
}
</style>
