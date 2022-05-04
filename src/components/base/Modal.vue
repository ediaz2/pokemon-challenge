<script>
  import IconClose from '@/components/icon/Close.vue';

  export default {
    inheritAttrs: false,
    components: {
      IconClose,
    },
    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit('input', false);
      },
    },
  };
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-200 transform"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-show="value" class="fixed z-10 inset-0 overflow-y-auto bg-black/50">
      <div class="flex items-start justify-center min-h-screen pt-24">
        <transition
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95">
          <div
            v-show="value"
            class="relative max-w-sm bg-white rounded-lg shadow-md"
            :class="$attrs.class"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline">
            <button
              class="absolute rounded-full top-3.5 right-3.5"
              @click.prevent="close">
              <icon-close> </icon-close>
            </button>
            <slot></slot>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
