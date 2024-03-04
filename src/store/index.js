// store/index.js
import { createStore } from 'vuex';
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ueoydyhdhwahrlgjsnxd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb3lkeWhkaHdhaHJsZ2pzbnhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTQ2NDEzNSwiZXhwIjoyMDI1MDQwMTM1fQ.2RxH7ZHE9pFOBicJNZuJ9gUzyXobmPYX72SqaDfspvw";
const supabase = createClient(supabaseUrl, supabaseKey);

const store = createStore({
  state: {
    isLoggedIn: false,
    database: supabase 
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
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