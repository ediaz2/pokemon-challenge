import * as types from '@/store/mutation-types';
import { capitalize } from '@/utils/capitalize';
import { findPokemons, findOnePokemon } from '@/services/pokemon';

export const pokemonStore = {
  namespaced: true,
  state: {
    pokemons: [],
    pokemon: {
      sprites: {
        other: {
          dream_world: {
            front_default: '',
          },
        },
      },
      name: '',
      weight: 0,
      height: 0,
      types: [],
      isFavorite: false,
    },
  },

  getters: {
    pokemons: (state) => (filterFavorites) => {
      if (filterFavorites === false) return state.pokemons;
      return state.pokemons.filter((pokemon) => pokemon.isFavorite === true);
    },
    currentPokemon: (state) => ({
      sprite: state.pokemon.sprites.other.dream_world.front_default,
      isFavorite: state.pokemon.isFavorite,
      attributes: {
        name: capitalize(state.pokemon.name),
        weight: state.pokemon.weight,
        height: state.pokemon.height,
        types: state.pokemon.types
          .map(({ type }) => capitalize(type.name))
          .join(', '),
      },
    }),
  },

  mutations: {
    [types.SET_POKEMONS](state, pokemons) {
      state.pokemons = pokemons;
    },
    [types.SET_CURRENT_POKEMON](state, pokemon) {
      state.pokemon = pokemon;
    },
  },

  actions: {
    async findPokemons({ state, commit }, { page, limit = 20 }) {
      try {
        const { results } = await findPokemons({ page, limit });
        const data = state.pokemons.concat(results);
        commit(types.SET_POKEMONS, data);
      } catch (error) {
        console.error(error);
      }
    },

    async findOnePokemon({ commit }, { name, isFavorite }) {
      try {
        const response = await findOnePokemon(name);
        commit(types.SET_CURRENT_POKEMON, { ...response, isFavorite });
      } catch (error) {
        return error;
      }
    },

    toggleFavoritePokemon({ state, commit }, { name, isFavorite }) {
      const pokemons = [...state.pokemons].map((pokemon) => {
        if (pokemon.name === name) pokemon.isFavorite = isFavorite;
        return pokemon;
      });
      commit(types.SET_POKEMONS, pokemons);
      if (state.pokemon.name === name) {
        commit(types.SET_CURRENT_POKEMON, {
          ...state.pokemon,
          isFavorite,
        });
      }
    },
  },
};
