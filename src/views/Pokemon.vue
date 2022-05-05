<script>
  import { mapActions, mapGetters } from 'vuex';
  import { capitalize } from '@/utils/capitalize';

  import FormSearch from '@/components/form/Search.vue';
  import BaseLoading from '@/components/base/Loading.vue';
  import BaseContainer from '@/components/base/Container.vue';
  import PokemonCardBase from '@/components/pokemon/CardBase.vue';
  import PokemonFooter from '@/components/pokemon/Footer.vue';
  import PokemonList from '@/components/pokemon/List.vue';
  import BaseObserver from '@/components/base/Observer.vue';
  import PokemonModalDetails from '@/components/pokemon/ModalDetails.vue';

  export default {
    components: {
      FormSearch,
      BaseLoading,
      BaseContainer,
      PokemonCardBase,
      PokemonFooter,
      PokemonList,
      PokemonModalDetails,
      BaseObserver,
    },
    data: () => ({
      loading: false,
      page: 1,
      modalDetails: {},
      search: '',
      isFilterFavorite: false,
      error: null,
    }),
    mounted() {
      this.loading = true;
      this.findPokemonsPagination().then(() => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
    destroyed() {
      this.resetStatePokemos();
    },
    computed: {
      ...mapGetters({
        currentPokemon: 'pokemon/currentPokemon',
        pokemons: 'pokemon/pokemons',
      }),
      pokemonsFiltered() {
        return this.pokemons(this.isFilterFavorite);
      },
    },
    methods: {
      ...mapActions({
        findPokemons: 'pokemon/findPokemons',
        findOnePokemon: 'pokemon/findOnePokemon',
        toggleFavoritePokemon: 'pokemon/toggleFavoritePokemon',
        resetStatePokemos: 'pokemon/resetStatePokemos',
      }),
      capitalize,
      async showDetail({ name, isFavorite }) {
        await this.findOnePokemon({ name, isFavorite });
        this.$refs.modalDetails.open();
      },
      async findPokemonsPagination() {
        await this.findPokemons({ page: this.page });
        this.page += 1;
      },
      async searchPokemon() {
        const cleanSearch = this.search.trim().toLowerCase();
        const error = await this.findOnePokemon({
          name: cleanSearch,
          isFavorite: false,
        });
        if (error) {
          this.search = '';
          this.error = error;
        } else {
          this.$refs.modalDetails.open();
        }
      },
    },
  };
</script>

<template>
  <main class="min-h-screen bg-gray-100">
    <template v-if="loading">
      <div class="h-screen flex justify-center items-center">
        <base-loading></base-loading>
      </div>
    </template>
    <template v-else>
      <base-container>
        <form-search v-model="search" @search="searchPokemon"> </form-search>
      </base-container>
      <template v-if="error">
        <base-container>
          <div class="h-screen flex justify-center items-center">
            <pokemon-card-base
              title="Uh-oh!"
              message="You look lost on your journey!"
              label-button="Go back home"
              @action="error = null"></pokemon-card-base>
          </div>
        </base-container>
      </template>
      <template v-else>
        <base-container>
          <pokemon-list
            :pokemons="pokemonsFiltered"
            @on-show-details="showDetail"
            @on-toggle="toggleFavoritePokemon"></pokemon-list>
          <base-observer @intersect="findPokemonsPagination"></base-observer>
        </base-container>
        <pokemon-modal-details
          ref="modalDetails"
          :pokemon="currentPokemon"
          @on-toggle="toggleFavoritePokemon"></pokemon-modal-details>
        <pokemon-footer v-model="isFilterFavorite"> </pokemon-footer>
      </template>
    </template>
  </main>
</template>
