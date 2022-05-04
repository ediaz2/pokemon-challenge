<script>
  import { mapActions, mapGetters } from 'vuex';
  import { capitalize } from '@/utils/capitalize';

  import FormSearch from '@/components/form/Search.vue';
  import BaseButtonIcon from '@/components/base/ButtonIcon.vue';
  import BaseButton from '@/components/base/Button.vue';
  import IconStar from '@/components/icon/Star.vue';
  import IconList from '@/components/icon/List.vue';
  import BaseLoading from '@/components/base/Loading.vue';
  import BaseModal from '@/components/base/Modal.vue';
  import BaseObserver from '@/components/base/Observer.vue';
  import BaseContainer from '@/components/base/Container.vue';
  import PokemonCardBase from '@/components/pokemon/CardBase.vue';

  export default {
    components: {
      FormSearch,
      BaseButtonIcon,
      BaseButton,
      IconStar,
      IconList,
      BaseLoading,
      BaseModal,
      BaseObserver,
      BaseContainer,
      PokemonCardBase,
    },
    data: () => ({
      loading: false,
      page: 1,
      isModalOpen: false,
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
      }),
      capitalize,
      async showDetail({ name, isFavorite }) {
        await this.findOnePokemon({ name, isFavorite });
        this.isModalOpen = true;
      },
      async findPokemonsPagination() {
        await this.findPokemons({ page: this.page });
        this.page += 1;
      },
      async copyClipboard(payload) {
        const text = Object.values(payload).join(', ');
        await navigator.clipboard.writeText(text);
      },
      async searchPokemon() {
        const error = await this.findOnePokemon({
          name: this.search,
          isFavorite: false,
        });
        if (error) {
          this.search = '';
          this.error = error;
        } else {
          this.isModalOpen = true;
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
    <template v-else-if="error">
      <base-container>
        <form-search v-model="search" @search="searchPokemon"> </form-search>
        <div class="h-screen flex justify-center items-center">
          <pokemon-card-base
            title="Uh-oh!"
            message="You look lost on your journey!"
            label-button="Go back home"
            @action="$router.go(-1)"></pokemon-card-base>
        </div>
      </base-container>
    </template>
    <template v-else>
      <base-container>
        <form-search v-model="search" @search="searchPokemon"> </form-search>
        <ul class="space-y-3">
          <li
            v-for="pokemon in pokemonsFiltered"
            :key="pokemon.name"
            class="px-4 py-3 bg-white rounded-lg flex justify-between items-center shadow-md shadow-gray-200/40 hover:translate-y-0.5">
            <span @click="showDetail(pokemon)" class="cursor-pointer">{{
              capitalize(pokemon.name)
            }}</span>
            <base-button-icon
              @click="
                toggleFavoritePokemon({
                  name: pokemon.name,
                  isFavorite: !pokemon.isFavorite,
                })
              ">
              <icon-star
                class="w-5 h-5"
                :class="{
                  'fill-gray': !pokemon.isFavorite,
                  'fill-yellow': pokemon.isFavorite,
                }"></icon-star>
            </base-button-icon>
          </li>
        </ul>
      </base-container>
      <base-observer @intersect="findPokemonsPagination"></base-observer>
      <base-modal v-model="isModalOpen">
        <div
          class="w-80 h-48 rounded-t-lg bg-center bg-pokemon flex justify-center items-center">
          <img
            class="h-36 mt-4 w-auto transform duration-700 ease-in-out hover:scale-105"
            :src="currentPokemon.sprite"
            :alt="currentPokemon.attributes.name" />
        </div>

        <div class="p-5">
          <ul class="divide-y divide-gray-100 text-gray-600">
            <li
              v-for="(value, name) in currentPokemon.attributes"
              :key="name"
              class="py-2">
              <span class="font-semibold"> {{ capitalize(`${name}:`) }}</span>
              {{ value }}
            </li>
          </ul>
          <div class="mt-2 flex justify-between">
            <base-button @click="copyClipboard(currentPokemon.attributes)">
              Share to my friends
            </base-button>
            <base-button-icon
              @click="
                toggleFavoritePokemon({
                  name: currentPokemon.attributes.name.toLowerCase(),
                  isFavorite: !currentPokemon.isFavorite,
                })
              ">
              <icon-star
                class="w-5 h-5"
                :class="{
                  'fill-gray': !currentPokemon.isFavorite,
                  'fill-yellow': currentPokemon.isFavorite,
                }">
              </icon-star>
            </base-button-icon>
          </div>
        </div>
      </base-modal>
      <footer class="fixed bottom-0 w-full shadow-lg bg-white">
        <base-container class="flex justify-between items-center gap-4">
          <base-button class="w-full" @click="isFilterFavorite = false">
            <icon-list class="w-5 h-5 mr-3 fill-white"></icon-list> All
          </base-button>
          <base-button
            color="gray"
            class="w-full"
            @click="isFilterFavorite = true">
            <icon-star class="w-5 h-5 mr-3 fill-white"></icon-star>
            Favorites
          </base-button>
        </base-container>
      </footer>
    </template>
  </main>
</template>
