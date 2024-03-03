// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  actions: {
    login({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        // You may want to verify the token here
        commit('setLoggedIn', true);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('setLoggedIn', false);
    },
  },
});

export default store;