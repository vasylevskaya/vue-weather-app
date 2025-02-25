<template>
  <div class="rounded-lg overflow-hidden">
    <div id="map" ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  watch: {
    latitude(newLat) {
      this.updateMap();
    },
    longitude(newLon) {
      this.updateMap();
    },
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.mapContainer).setView(
        [this.latitude, this.longitude],
        13
      );

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(this.map);

      // Initialize the marker and save a reference to it
      this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
    },
    updateMap() {
      if (this.map) {
        this.map.setView([this.latitude, this.longitude], 13);
        if (this.marker) {
          this.marker.setLatLng([this.latitude, this.longitude]);
        }
      }
    },
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>
