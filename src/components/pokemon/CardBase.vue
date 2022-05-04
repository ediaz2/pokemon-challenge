<script>
  import BaseButton from '@/components/base/Button.vue';

  export default {
    components: {
      BaseButton,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      labelButton: {
        type: String,
        required: true,
      },
    },
  };
</script>

<template>
  <div>
    <h2 class="text-center font-bold text-2xl mb-2">{{ title }}</h2>
    <p class="text-center">
      {{ message }}
    </p>
    <div class="flex justify-center mt-4">
      <base-button @click="$emit('action')">{{ labelButton }}</base-button>
    </div>
  </div>
</template>
