<script>
  import IconSearch from '@/components/icon/Search.vue';

  export default {
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'Search',
      },
    },
    components: { IconSearch },
    computed: {
      computedValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
    methods: {
      onInput(event) {
        this.computedValue = event.target.value;
      },
      onSearch() {
        this.$emit('search');
      },
    },
  };
</script>

<template>
  <form class="flex items-center mb-6" role="search" @submit.prevent="onSearch">
    <label for="search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <icon-search class="h-5 w-5 text-gray-500"></icon-search>
      </div>
      <input
        type="text"
        :value="computedValue"
        id="search"
        name="search"
        v-bind="$attrs"
        class="bg-white bg-light-700text-sm rounded-lg focus:outline outline-offset-2 outline-2 outline-gray block w-full pl-10 p-2.5"
        :placeholder="placeholder"
        @input="onInput"
        required />
    </div>
  </form>
</template>
