<script>
  import BaseButton from '@/components/base/Button.vue';
  import IconStar from '@/components/icon/Star.vue';
  import IconList from '@/components/icon/List.vue';
  import BaseContainer from '@/components/base/Container.vue';

  export default {
    components: {
      BaseButton,
      IconStar,
      IconList,
      BaseContainer,
    },
    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>

<template>
  <footer class="fixed bottom-0 w-full shadow-lg bg-white">
    <base-container class="flex justify-between items-center gap-4">
      <base-button class="w-full" @click="$emit('input', false)">
        <icon-list class="w-5 h-5 mr-3 fill-white"></icon-list>All
      </base-button>
      <base-button color="gray" class="w-full" @click="$emit('input', true)">
        <icon-star class="w-5 h-5 mr-3 fill-white"></icon-star>
        Favorites
      </base-button>
    </base-container>
  </footer>
</template>
