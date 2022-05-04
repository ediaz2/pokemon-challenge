<script>
  export default {
    props: {
      color: {
        type: String,
        default: 'red',
        validate: (value) => ['red', 'gray'].includes(value),
      },
    },
    computed: {
      classColors() {
        return `bg-${this.color} hover:bg-${this.color}-600 focus:${this.color}-red-600`;
      },
    },
  };
</script>

<template>
  <button
    type="button"
    v-bind="$attrs"
    v-on="$listeners"
    class="text-white focus:outline-none font-bold rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
    :class="classColors">
    <slot> </slot>
  </button>
</template>
