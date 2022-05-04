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
</template>
