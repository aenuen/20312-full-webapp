// noinspection JSUnresolvedFunction

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => { // 动态加载vuex
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  modules
})
