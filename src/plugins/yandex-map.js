import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'
import { yandexMapApiKey } from '@/environment'

Vue.use(YmapPlugin, {
  apiKey: yandexMapApiKey,
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
})
