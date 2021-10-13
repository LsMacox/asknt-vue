import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
      themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
    themes: {
      light: {
        primary: '#E5E5E5',
        secondary: '#D50037',
        accent: '#373737',
        info: '#5D6F88',
        warning: '#F2994A',
        success: '#27AE60',
        error: '#D50037',

        // custom colors
        hidden: '#A6ABBD',
        active: '#9B0028',
      },
    },
  },
})
