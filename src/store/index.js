import Vue from 'vue';
import Vuex from 'vuex';

import { pokemonStore } from '@/store/modules/pokemon';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pokemon: pokemonStore,
  },
});
