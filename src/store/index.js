import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: 'top',
    data: [],
    id: [],
  },
  mutations: {
    changeTopic(state, topic) {
      state.topic = topic;
    },
    clearData(state) {
      state.data.splice(0, state.data.length);
      state.id.splice(0, state.id.length);
    },
    changeCh(state, bull) {
      state.isChanged = bull;
    },
    addId(state, response) {
      state.id = response;
    },
    addData(state, res) {
      state.data = state.data.concat(res);
    },
  },
  actions: {},
  modules: {},
});
