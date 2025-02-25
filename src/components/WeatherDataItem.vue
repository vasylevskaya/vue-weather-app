<script>
import sunIcon from '@/assets/icons/sun.png';
import humidityIcon from '@/assets/icons/humidity.png';
import windIcon from '@/assets/icons/wind.png';
import cloudIcon from '@/assets/icons/cloud.png';
import eyeIcon from '@/assets/icons/eye.png';
import dropIcon from '@/assets/icons/drop.png';
import pressureIcon from '@/assets/icons/pressure.png';

export default {
  props: {
    icon: String,
    title: String,
    value: [String, Number],
    description: String,
    customClass: String,
  },
  computed: {
    getIcon() {
      switch (this.icon) {
        case "sun":
          return sunIcon;
        case "humidity":
          return humidityIcon;
        case "wind":
          return windIcon;
        case "cloud":
          return cloudIcon;
        case "eye":
          return eyeIcon;
        case "drop":
          return dropIcon;
        case "pressure":
          return pressureIcon;
        default:
          return '';
      }
    }
  }
};
</script>

<template>
  <div class="info-group px-4 py-4 rounded-lg" :class="[ customClass ]">
    <div class="flex gap-2">
      <!-- Dynamically load the image using the computed icon -->
      <img v-if="icon" :src="getIcon" class="h-[20px] w-[20px]" alt="icon" />
      <p>{{ title }}</p>
    </div>
    <p class="text-3xl mt-2 mb-1">{{ value }}</p>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
