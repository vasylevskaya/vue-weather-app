<script>
export default {
  name: "Notification",
  props: {
    type: {
      type: String,
      default: 'success', // or 'success', 'warning', 'error'
    },
    message: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    notificationTitle() {
      if (this.type === 'success') return 'Success';
      if (this.type === 'warning') return 'Warning';
      if (this.type === 'error') return 'Error';
      return 'Info';
    },
  },
  methods: {
    onClose() {
      this.$emit('onClose');
    },
  },
  components: {
    Notification, // Register the Notification component here
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed top-12 right-4 rounded-lg overflow-hidden w-[300px] z-40"
    :class="`notification-${type}`"
  >
      <p class="font-semibold p-4" :class="`notification-title-${type}`">
        {{ notificationTitle }}
      </p>
      <button @click="onClose" class="absolute top-2 right-3 text-xl">
        ×
      </button>
      <p class="p-4">{{ message }}</p>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
