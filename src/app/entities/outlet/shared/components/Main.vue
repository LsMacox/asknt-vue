<template>
  <container
    title="Торговые точки"
    search
    search-label="Поиск торговой точки"
    :search-value.sync="search"
  >
    <v-responsive
      max-width="1390"
      class="table-field--positioning"
    >
      <!-- <v-form ref="form">
        <ul class="header__list pa-0">
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Название
            </p>
            <base-text-field
              v-model="form.name"
              :rules="rules.name"
              class="item-field details--absolute"
              label="Название ТТ"
              style="max-width: 250px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Код
            </p>
            <base-text-field
              v-model="form.code"
              :rules="rules.code"
              class="item-field details--absolute"
              label="Код ТТ"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Адрес ТТ
            </p>
            <base-text-field
              v-model="form.address"
              :rules="rules.address"
              class="item-field details--absolute"
              label="Адрес ТТ"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Долгота центра
            </p>
            <base-text-field
              v-model="form.lng"
              :rules="rules.lng"
              class="item-field details--absolute"
              label="Долгота"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Широта центра
            </p>
            <base-text-field
              v-model="form.lat"
              :rules="rules.lat"
              class="item-field details--absolute"
              label="Широта"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Радиус зоны, м
            </p>
            <base-text-field
              v-model="form.radius"
              :rules="rules.radius"
              class="item-field details--absolute"
              label="Радиус"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <base-btn
              class="btn-create"
              min-width="250"
              width="250"
              :loading="$wait.is('[outlet] create')"
              @click="onCreate"
            >
              Создать
            </base-btn>
          </li>
        </ul>
      </v-form> -->
      <table-fields
        :headers="tableHeaders"
        :items.sync="tableItems"
        :options.sync="tableOptions"
        :server-items-length="outletsTotal"
        :loading="$wait.is('[outlet] loading table')"
      >
        <template v-slot:[`item.action`]="{ item }">
          <div
            class="d-flex"
          >
            <base-btn
              min-width="140"
              width="140"
              class="btn-save"
              hide-details
              :disabled="!changedList[item.id]"
              :loading="$wait.is(`[outlet] save ${item.id}`)"
              @click="onSave(item)"
            >
              Сохранить
            </base-btn>
            <base-btn
              min-width="90"
              width="90"
              color="hidden"
              :loading="$wait.is(`[outlet] delete ${item.id}`)"
              @click="onDelete(item.id)"
            >
              <v-icon
                class="mr-0"
                size="24"
                color="main"
              >
                $icons_trash
              </v-icon>
            </base-btn>
          </div>
        </template>
      </table-fields>
    </v-responsive>
  </container>
</template>

<script>
  import { actionsTypes, gettersTypes } from '@/app/entities/outlet/shared/state/outlet'
  import { mapActions, mapGetters } from 'vuex'
  import Container from '@/app/shared/components/general/Container'
  import TableFields from '@/app/shared/components/general/TableFields'
  const { required, minLength, maxLength, numeric, decimal } = require('vuelidate/lib/validators')

  export default {
    components: { Container, TableFields },
    data () {
      return {
        search: '',
        form: {},
        rules: {
          name: [
            v => required(v) || this.$t('validation.required'),
            v => minLength(2)(v) || this.$t('validation.minLength', { count: 2 }),
            v => maxLength(255)(v) || this.$t('validation.maxLength', { count: 255 }),
          ],
          code: [
            v => required(v) || this.$t('validation.required'),
            v => maxLength(50)(v) || this.$t('validation.maxLength', { count: 50 }),
            v => numeric(v) || this.$t('validation.numeric'),
          ],
          address: [
            v => required(v) || this.$t('validation.required'),
            v => maxLength(255)(v) || this.$t('validation.maxLength', { count: 255 }),
          ],
          lng: [
            v => required(v) || this.$t('validation.required'),
            v => decimal(v) || this.$t('validation.decimal'),
          ],
          lat: [
            v => required(v) || this.$t('validation.required'),
            v => decimal(v) || this.$t('validation.decimal'),
          ],
          radius: [
            v => numeric(v) || this.$t('validation.numeric'),
            v => maxLength(50)(v) || this.$t('validation.maxLength', { count: 50 }),
          ],
        },
        tableOptions: {
          page: 1,
          itemsPerPage: 10,
          sortBy: 'id',
        },
        tableHeaders: [
          { text: 'Название ТТ', value: 'name', maxWidth: 250 },
          { text: 'Код ТТ', value: 'code', maxWidth: 150, readonly: true },
          { text: 'Адрес ТТ', value: 'address', maxWidth: 150 },
          { text: 'Долгота', value: 'lng', maxWidth: 150 },
          { text: 'Широта', value: 'lat', maxWidth: 150 },
          { text: 'Радиус', value: 'radius', maxWidth: 150 },
          { text: '', value: 'action' },
        ],
        tableItems: [],
        changedList: {},
      }
    },
    computed: {
      ...mapGetters({
        outlets: 'outlet/outlet/' + gettersTypes.OUTLETS,
        outletsTotal: 'outlet/outlet/' + gettersTypes.OUTLETS_TOTAL,
      }),
      pagOffset () {
        return (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage
      },
    },
    watch: {
      outlets: {
        deep: true,
        handler (v) {
          this.tableItems = JSON.parse(JSON.stringify(v))
        },
      },
      'tableOptions.page' (v) {
        if (v) this.fetchData()
      },
      'tableOptions.itemsPerPage' (v) {
        if (v) this.fetchData()
      },
      search () {
        this.$_.debounce(() => {
          this.fetchData()
        }, 300)()
      },
      tableItems: {
        deep: true,
        handler (v) {
          v.forEach(el => {
            const outlet = this.$_.findWhere(this.outlets, { id: el.id })

            outlet.code = String(outlet.code)
            outlet.radius = String(outlet.radius)

            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(outlet)) {
              if (value === null) {
                outlet[key] = ''
              }
            }
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(el)) {
              if (value === null) {
                el[key] = ''
              }
            }

            this.changedList[el.id] =
              JSON.stringify(el) !== JSON.stringify(outlet)
          })
        },
      },
    },
    async mounted () {
      await this.fetchData()
    },
    methods: {
      ...mapActions({
        fetchList: 'outlet/outlet/' + actionsTypes.LIST,
        fetchCreate: 'outlet/outlet/' + actionsTypes.CREATE,
        fetchUpdate: 'outlet/outlet/' + actionsTypes.UPDATE,
        fetchDelete: 'outlet/outlet/' + actionsTypes.DELETE,
      }),
      async fetchData () {
        this.$wait.start('[outlet] loading table')
        const payload = {
          offset: this.pagOffset,
          sortBy: this.tableOptions.sortBy,
          sortByDesk: true,
          limit: this.tableOptions.itemsPerPage,
        }

        if (this.search) {
          payload.search = this.search.trim()
        }

        await this.fetchList(payload)
        this.$wait.end('[outlet] loading table')
      },
      async onCreate () {
        if (this.$refs.form.validate()) {
          try {
            this.$wait.start('[outlet] create')
            await this.fetchCreate(this.form)
          } finally {
            this.$wait.end('[outlet] create')
          }
          this.$refs.form.reset()
          await this.fetchData()
        }
      },
      async onSave (item) {
        try {
          this.$wait.start(`[outlet] save ${item.id}`)
          await this.fetchUpdate(item)
        } finally {
          this.$wait.end(`[outlet] save ${item.id}`)
        }
      },
      async onDelete (id) {
        try {
          this.$wait.start(`[outlet] delete ${id}`)
          await this.fetchDelete(id)
          await this.fetchData()
        } finally {
          this.$wait.end(`[outlet] delete ${id}`)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.btn-save {
  margin-right: 20px;
}
.header__list {
  display: table;
  list-style: none;
  margin-bottom: 40px;
  width: 100%;
  .header__item {
    display: table-cell;
    vertical-align: bottom;
    &:not(:first-child) {
      padding-left: 20px !important;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
    .item-title {
      margin-bottom: 10px;
    }
    .item-field {
      width: 100%;
      & ::v-deep {
        .v-input__slot {
          background: var(--v-main-base);
        }
      }
    }
  }
}
</style>
