<script>
  import BaseContainer from '@/components/base/Container.vue';
  import PokemonCardBase from '@/components/pokemon/CardBase.vue';

  export default {
    components: {
      BaseContainer,
      PokemonCardBase,
    },
  };
</script>

<template>
  <main class="min-h-screen bg-light-100 flex items-center">
    <base-container>
      <div class="flex justify-center">
        <img src="@/assets/pikachu.png" alt="pikachu" class="pb-8 md:pb-16" />
      </div>
      <pokemon-card-base
        title="Welcome to Pokédex"
        message="The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world."
        label-button="Get started"
        @action="$router.push('/pokemon')"></pokemon-card-base>
    </base-container>
  </main>
</template>
