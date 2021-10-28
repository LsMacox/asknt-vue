import Vue from 'vue'
import { _ } from 'vue-underscore'

var STORAGE = window.localStorage
var VueSession = {
    key: 'vue-session-key',
    flash_key: 'vue-session-flash-key',
    setAll: function (all) {
        STORAGE.setItem(VueSession.key, JSON.stringify(all))
    },
}

export const session = {
  flash: {
    get: function (key) {
      var all = this.parent().getAll()
      var allFlash = all[VueSession.flash_key] || {}

      var flashValue = allFlash[key]

      this.remove(key)

      return flashValue
    },
    set: function (key, value) {
      var all = this.parent().getAll()
      var allFlash = all[VueSession.flash_key] || {}

      allFlash[key] = value
      all[VueSession.flash_key] = allFlash

      VueSession.setAll(all)
    },
    remove: function (key) {
      var all = this.parent().getAll()
      var allFlash = all[VueSession.flash_key] || {}

      delete allFlash[key]

      all[VueSession.flash_key] = allFlash
      VueSession.setAll(all)
    },
  },
  getAll: function () {
    var all = JSON.parse(STORAGE.getItem(VueSession.key))
    return all || {}
  },
  set: function (key, value) {
    if (key === 'session-id') return false
    var all = this.getAll()

    if (!('session-id' in all)) {
        this.start()
        all = this.getAll()
    }

    all[key] = value

    VueSession.setAll(all)
  },
  get: function (key) {
    var all = this.getAll()
    return all[key]
  },
  start: function () {
    var all = this.getAll()
    all['session-id'] = 'sess:' + Date.now()

    VueSession.setAll(all)
  },
  renew: function (sessionId) {
    var all = this.getAll()
    all['session-id'] = 'sess:' + sessionId
    VueSession.setAll(all)
  },
  exists: function () {
    var all = this.getAll()
    return 'session-id' in all
  },
  has: function (key) {
    var all = this.getAll()
    return key in all
  },
  remove: function (key) {
    var all = this.getAll()
    delete all[key]

    VueSession.setAll(all)
  },
  clear: function () {
    var all = this.getAll()

    VueSession.setAll({ 'session-id': all['session-id'] })
  },
  destroy: function () {
    VueSession.setAll({})
  },
  id: function () {
    return this.get('session-id')
  },
}

VueSession.install = function (Vue) {
  const $session = _.clone(session)
  $session.flash = _.extend($session.flash, {
    parent: () => {
      return Vue.prototype.$session
    },
  })
  Vue.prototype.$session = $session
}

Vue.use(VueSession)
