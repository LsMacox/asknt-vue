import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@/styles/index.sass'
import { LoadSvgIcons, CUSTOM_ICONS } from './icons'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    values: {
      ...LoadSvgIcons(CUSTOM_ICONS),
    },
  },
  theme: {
    options: {
      customProperties: true,
      // Не включать при разработке
      // themeCache: {
      //   get: key => localStorage.getItem(key),
      //   set: (key, value) => localStorage.setItem(key, value),
      // },
    },
    themes: {
      light: {
        primary: '#FAFAFB',
        secondary: '#D50037',
        accent: '#373737',
        info: '#5D6F88',
        warning: '#F2994A',
        success: '#27AE60',
        error: '#D50037',

        // custom colors
        main: '#FFFFFF',
        hidden: '#A6ABBD',
        black: '#3F3B3B',
        grey: '#959393',
        'grey-2': '#F5F5F5',
        active: '#9B0028',
        border: '#EBECF0',
      },
    },
  },
})
