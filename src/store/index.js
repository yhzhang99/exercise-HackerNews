import Vue from 'vue';
import Vuex from 'vuex';
import request from '../api/agent';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: 'top',
    id: [],
    nowId: 0,
    newsData: [],
    loading: false,
    busy: false,
  },
  mutations: {
    addNews(state, response) {
      state.newsData.push(response);
    },
    changeTopic(state, topic) {
      state.topic = topic;
    },
    changeLoading(state, bull) {
      state.loading = bull;
    },
    changeBusy(state, bull) {
      state.busy = bull;
    },

    clearData(state) {
      state.loading = true;
      state.newsData.splice(0, state.newsData.length);
      state.id.splice(0, state.id.length);
    },
  },
  actions: {
    getIdList({ dispatch, commit }) {
      return request
        .get({
          url: `${this.state.topic}stories.json?limitToFirst=10&orderBy="$key"`,
        })
        .then((response) => {
          this.state.id = response;
          for (let i = 0; i < this.state.id.length; i++) {
            dispatch('getNews', i);
          }
          commit('changeLoading', false);
          commit('changeBusy', false);
        });
    },
    getNews({ commit }, i) {
      return request
        .get({
          url: `item/${this.state.id[i]}.json?print=pretty`,
        })
        .then((response) => {
          commit('addNews', response);
        });
    },
  },
  modules: {},
});
