<script>
  import { capitalize } from '@/utils/capitalize';

  import BaseButtonIcon from '@/components/base/ButtonIcon.vue';
  import BaseButton from '@/components/base/Button.vue';
  import IconStar from '@/components/icon/Star.vue';
  import BaseModal from '@/components/base/Modal.vue';

  export default {
    components: {
      BaseButtonIcon,
      BaseButton,
      IconStar,
      BaseModal,
    },
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      pokemon: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      isModalOpen: false,
    }),
    methods: {
      capitalize,
      async copyClipboard(payload) {
        const text = Object.values(payload).join(', ');
        await navigator.clipboard.writeText(text);
        this.$snotify.success('Copy attributes', null, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
      },
      async toggleFavoritePokemon() {
        await this.$emit('on-toggle', {
          name: this.pokemon.attributes.name.toLowerCase(),
          isFavorite: !this.pokemon.isFavorite,
        });
      },
    },
    watch: {
      isModalOpen(value) {
        this.$emit('input', value);
      },
      value(value) {
        this.isModalOpen = value;
      },
    },
  };
</script>

<template>
  <base-modal v-model="isModalOpen">
    <div
      class="w-80 h-48 rounded-t-lg bg-center bg-pokemon flex justify-center items-center">
      <img
        class="h-36 mt-4 w-auto transform duration-700 ease-in-out hover:scale-105"
        :src="pokemon.sprite"
        :alt="pokemon.attributes.name" />
    </div>

    <div class="p-5">
      <ul class="divide-y divide-gray-100 text-gray-600">
        <li
          v-for="(value, name) in pokemon.attributes"
          :key="name"
          class="py-2">
          <span class="font-semibold"> {{ capitalize(`${name}:`) }}</span>
          {{ value }}
        </li>
      </ul>
      <div class="mt-2 flex justify-between">
        <base-button @click="copyClipboard(pokemon.attributes)">
          Share to my friends
        </base-button>
        <base-button-icon @click="toggleFavoritePokemon">
          <icon-star
            class="w-5 h-5"
            :class="{
              'fill-gray': !pokemon.isFavorite,
              'fill-yellow': pokemon.isFavorite,
            }">
          </icon-star>
        </base-button-icon>
      </div>
    </div>
  </base-modal>
</template>
