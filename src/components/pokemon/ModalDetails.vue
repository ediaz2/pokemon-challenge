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
        // TODO: Disable text separated by comma
        // const text = Object.values(payload).join(', ');
        const text = Object.entries(payload)
          .map(([key, value]) => `${capitalize(key)}: ${value}`)
          .join('\n');
        await navigator.clipboard.writeText(text);
        this.$snotify.success('Copy attributes', null, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
        this.close();
      },
      async toggleFavoritePokemon() {
        await this.$emit('on-toggle', {
          name: this.pokemon.attributes.name.toLowerCase(),
          isFavorite: !this.pokemon.isFavorite,
        });
      },
      open() {
        this.isModalOpen = true;
      },
      close() {
        this.isModalOpen = false;
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
        <base-button
          @click="copyClipboard(pokemon.attributes)"
          class="transition ease-out duration-200 transform hover:translate-y-0.5">
          Share to my friends
        </base-button>
        <base-button-icon @click="toggleFavoritePokemon">
          <icon-star
            class="w-5 h-5 transition ease-out duration-200 transform hover:scale-110"
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
