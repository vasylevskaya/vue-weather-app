<script>
import WeatherDataItem from './WeatherDataItem.vue';


export default {
  props: {
    weatherData: Object,
  },
  computed: {
    currentData() {
      return this.weatherData.current;
    },
    localTime() {
      return this.weatherData.location.localtime.split(" ")[1];
    },
    uvLevel() {
      const uv = this.currentData.uv;
      if (!uv && uv !== 0) return '';
      if (uv < 3) return 'Low';
      if (uv < 8) return 'Medium';
      return 'High';
    },
    cloudDescription() {
      const cloud = this.currentData.cloud;
      if (cloud < 20) return "Clear skies";
      if (cloud < 50) return "Partly cloudy";
      if (cloud < 80) return "Mostly cloudy";
      return "Overcast";
    },
    visibilityDescription() {
      const visibility = this.currentData.vis_km;
      if (visibility > 10) return "Excellent visibility";
      if (visibility > 5) return "Good visibility";
      if (visibility > 2) return "Moderate visibility";
      return "Poor visibility";
    },
  },
};
</script>

<template>
  <div class="grid grid-cols-2 gap-3 w-[100%]">
    <WeatherDataItem
      title="Local time"
      :value=localTime
      customClass="col-span-2"
    />
    <WeatherDataItem
      icon="sun"
      title="UV Index"
      :value=currentData.uv
      :description=uvLevel
    />
     <WeatherDataItem
      icon="humidity"
      title="Humidity"
      :value="`${currentData.humidity}%`"
      :description="`Dew point: ${currentData.dewpoint_c}º`"
    />
     <WeatherDataItem
      icon="wind"
      title="Wind"
      :value="`${currentData.wind_kph} km / hour`"
      customClass="col-span-2"
    />
     <WeatherDataItem
      icon="cloud"
      title="Cloud Cover"
      :value="`${currentData.cloud}%`"
      :description="cloudDescription"
    />
     <WeatherDataItem
      icon="eye"
      title="Visibility"
      :value="`${currentData.vis_km} km`"
      :description="visibilityDescription"
    />
    <WeatherDataItem
      icon="drop"
      title="Precipitation"
      :value="`${currentData.precip_mm} mm`"
    />
    <WeatherDataItem
      icon="pressure"
      title="Pressure"
      :value="`${currentData.pressure_mb} mb`"
      :description="visibilityDescription"
    />
  </div>
</template>
