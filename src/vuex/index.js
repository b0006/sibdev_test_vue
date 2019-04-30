import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import index from './actions';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions: index,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store;
