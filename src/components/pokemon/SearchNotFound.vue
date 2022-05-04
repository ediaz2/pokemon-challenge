<script>
  import PokemonCardBase from '@/components/pokemon/CardBase.vue';

  export default {
    components: {
      PokemonCardBase,
    },
  };
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <pokemon-card-base
      title="Uh-oh!"
      message="You look lost on your journey!"
      label-button="Go back home"
      @action="$router.go(-1)"></pokemon-card-base>
  </div>
</template>
