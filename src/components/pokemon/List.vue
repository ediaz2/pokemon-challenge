<script>
  import { capitalize } from '@/utils/capitalize';

  import BaseButtonIcon from '@/components/base/ButtonIcon.vue';
  import IconStar from '@/components/icon/Star.vue';

  export default {
    components: {
      BaseButtonIcon,
      IconStar,
    },
    props: {
      pokemons: {
        type: Array,
        required: true,
      },
    },
    methods: {
      capitalize,
      async showDetail({ name, isFavorite }) {
        await this.$emit('on-show-details', { name, isFavorite });
      },
      async toggleFavoritePokemon({ name, isFavorite }) {
        await this.$emit('on-toggle', { name, isFavorite });
      },
    },
  };
</script>

<template>
  <ul class="space-y-3">
    <li
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      class="px-4 bg-white rounded-lg flex justify-between items-center shadow-md shadow-gray-200/40 hover:translate-y-0.5">
      <div class="w-full py-3 mr-2 cursor-pointer" @click="showDetail(pokemon)">
        <span>{{ capitalize(pokemon.name) }}</span>
      </div>
      <base-button-icon
        @click="
          toggleFavoritePokemon({
            name: pokemon.name,
            isFavorite: !pokemon.isFavorite,
          })
        ">
        <icon-star
          class="w-5 h-5 transition ease-out duration-200 transform hover:translate-y-0.5"
          :class="{
            'fill-gray': !pokemon.isFavorite,
            'fill-yellow': pokemon.isFavorite,
          }"></icon-star>
      </base-button-icon>
    </li>
  </ul>
</template>
