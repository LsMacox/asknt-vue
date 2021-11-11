<template>
  <v-responsive
    class="b-transport_map mx-auto"
    max-width="1108"
  >
    <div class="transport_map-search">
      <field-search
        v-model="search"
        class="field-search"
        label="Выберите машину"
      />
      <v-list class="transport_map-list">
        <v-list-item class="transport_map-item">
          <v-list-item-content class="transport_map-list__content">
            <v-checkbox
              v-model="checkbox1"
              label="У432АС 177"
              color="secondary"
              on-icon="$icons_checked"
              off-icon="$icons_checked-off"
              value="secondary"
              hide-details
            />
            <div class="b-info">
              <p class="roboto-s-regular info--text mb-0">
                789243
              </p>
              <p class="roboto-s-regular info--text mb-0">
                28.04.21
              </p>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="transport_map-item">
          <v-list-item-content class="transport_map-list__content">
            <v-checkbox
              v-model="checkbox2"
              label="К855СУ 799"
              color="secondary"
              on-icon="$icons_checked"
              off-icon="$icons_checked-off"
              value="secondary"
              hide-details
            />
            <div class="b-info">
              <p class="roboto-s-regular info--text mb-0">
                479624
              </p>
              <p class="roboto-s-regular info--text mb-0">
                28.04.21
              </p>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div class="transport_map-map">
      <yandex-map
        :coords="coords"
        class="yandex-map"
        @click="onClick"
      >
        <ymap-marker
          marker-id="123"
          :coords="coords"
          :balloon-template="balloonTemplate"
        />
      </yandex-map>
    </div>
  </v-responsive>
</template>

<script>
  import FieldSearch from '@/app/shared/components/general/SearchField'

  export default {
    components: { FieldSearch },
    data () {
      return {
        checkbox1: false,
        checkbox2: false,
        search: '',
        coords: [54, 39],
      }
    },
    computed: {
      balloonTemplate () {
        return `
          <h1 class="red">Hi, everyone!</h1>
          <p>I am here: ${this.coords}</p>
          <img src="http://via.placeholder.com/350x150">
        `
      },
    },
    methods: {
      onClick (e) {
        this.coords = e.get('coords')
      },
    },
  }
</script>

<style lang="scss" scoped>
.b-transport_map {
  overflow: visible !important;
  & ::v-deep {
    .v-responsive__content {
      display: flex;
    }
  }
  .transport_map-search {
    background-color: var(--v-main-base);
    box-shadow: $block-box-shadow;
    border-radius: $block-border-radius;
    padding-bottom: 10px;
    min-width: 340px;
    height: 830px;
    max-height: 830px;
    .transport_map-list {
      margin-top: 26px;
      .transport_map-item {
        padding: 0 14px;
        margin-top: 2px;
      }
      .transport_map-list__content {
        overflow: visible;
        padding: 8px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        & > * {
          flex: none;
        }
        .b-info {
          display: flex;
          p:first-child {
            margin-right: 40px;
          }
        }
      }
    }
  }
  .transport_map-map {
    max-width: 1050px;
    height: 100%;
    .yandex-map {
      height: 830px;
      width: 1050px;
      overflow: hidden;
      border-radius: $block-border-radius;
      margin-left: $block-indent-1;
    }
  }
}
</style>
