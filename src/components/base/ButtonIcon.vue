<template>
  <button
    type="button"
    v-bind="$attrs"
    v-on="$listeners"
    class="p-2 bg-gray-200 rounded-full">
    <slot> </slot>
  </button>
</template>
