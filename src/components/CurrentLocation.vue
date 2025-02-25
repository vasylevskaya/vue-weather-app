<script>
import { getRealtimeWeatherByQuery } from '@/api/weather';
import Notification from './Notification.vue';
import WeatherData from './WeatherData.vue';
import Map from './Map.vue';

export default {
  data() {
    return {
      locationQuery: '', // To bind the input value
      error: '',
      isVisible: false, // Initially hidden
      //loading: true, // Show loader initially
      loading: true,
      weatherData: null,
    };
  },
  methods: {
    async getLocation() {
      this.loading = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const coordinatesQuery = `${latitude},${longitude}`
              const response = await getRealtimeWeatherByQuery(coordinatesQuery);
              this.weatherData = response;
            } catch (error) {
              this.error = error.message;
              this.isVisible = true;
            } finally {
              this.loading = false;
            }
          },
          (err) => {
            this.error = err.message;
            this.isVisible = true; // Show the notification on error
            this.loading = false;
          }
        );
      } else {
        this.error = 'Geolocation is not supported by this browser.';
        this.isVisible = true; // Show the notification if geolocation is unsupported
        this.loading = false; // Stop loading
      }
    },
    createStars() {
      const starsElement = document.querySelector('#stars');
      for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.classList.add('star');

        let size = Math.random() * 2.6 + 1;
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        let delayValue = Math.random() * 4;
        star.style.animationDelay = delayValue + 's';

        starsElement.appendChild(star);
      }
    },
    async submitForm(event) {
      event.preventDefault();

      if (this.locationQuery) {
        try {
          const response = await getRealtimeWeatherByQuery(this.locationQuery);
          console.log(response)
          this.weatherData = response;
        } catch (error) {
          this.error = error.message;
          this.isVisible = true;
        }
      } else {
        this.error = "Input can't be empty. Enter your city, country, or postal code.";
        this.isVisible = true;
      }
    },
  },
  mounted() {
    this.getLocation(); // Call getLocation when the page loads
    this.createStars();
  },
};
</script>

<template>
  <div
    class="weather-app is-day"
    :class="{
      'is-night': weatherData?.current?.is_day === 0
    }"
  >
    <div id="stars"></div>
    <div class="cloud">
    <img
      v-if="weatherData?.current?.cloud > 80"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhtiwNp_GGXVBTIBHgwcU1iQfvBwGcNpEWws17jURxLgsTocyKGMzAWZK5-mNe3XprsjDz36yis19PmnSKvpEtg_Lbwto3pgFoOSTxCqcwp_v5OsNqRl23bzqssv8epDnNQazhL2AB1OuITxdhlqfv_YsXirU0W_mbfLYisiFPYgR1G0cpo9RumyNMq5M/s1600/cloud-03.png"
      alt="cloud"
      class="cloud-1"
    >
    <img
      v-if="weatherData?.current?.cloud > 50"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjgpQUDtHjzt5ERnQ41HOOChn4ruWGjmY72CqEtryfk_IOvHn9rrcf_JNlvREpx0tLcc2vPbThJfuKRcDDE1sVBVism3kDKSL3EqPoPqy3z09gCfjcw3UzCpoeGCHj5O397FDzu-4tVI7R36f-zd73bFw_C3k4N_2bR5wRl-D-Ae1_wJZMMe2aPp3qmWLk/s1600/cloud-01.png"
      alt="cloud"
      class="cloud-2"
    >
    <img
      v-if="weatherData?.current?.cloud > 50"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisGYgS3dB3vT_wI4DB4anTvu5KWnSpvx5QkkPtLkWZ2LGm64TkWFQs8nqevH5KeFi3bfE7BO4Cny8hwr_9jiBycBsoQq7T1qS_2WuCI0uYbjE0Kn7y5PxtapKiaf4VQHBoVeLrxjjm78Cx8CpiZG16IkJ6Skd17BD0J-IpgWo_MT8TE3qiQCxsQAdWJ6U/s1600/cloud-02.png"
      alt="cloud"
      class="cloud-3"
    >
    <img
      v-if="weatherData?.current?.cloud > 20"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtF2ldV1Z-0zEQa0NUSzO7bLUVRXyaAXBiWGcXQrl4dQC2fCoMHaxSblPg57hTZlR5j16VEVpvmAA0k_hmo45uSdDu5q1bL7jQOaJqFJjeb_B62tgepM6Rig8uQNey1WojLy4zvbUKmPlDbcL_hzhHiX0nhIwJEefJ1XLfRNi1_yuMI08XzDPVOa_ds0U/s1600/cloud-04.png"
      alt="cloud"
      class="cloud-4"
    >
</div>
    <!-- Loader -->
    <p v-if="loading" class="m-2 text-white text-center">
      Loading...
    </p>

    <!-- Weather Content -->
    <div v-else class="weather-content">
      <div>
        <form
          @submit="submitForm"
          class="search-form flex gap-4 mb-10"
        >
          <input
            v-model="locationQuery"
            type="text"
            placeholder="Enter city, country, or postal code"
            class="info-group px-4 py-2 w-[300px] placeholder-white focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            class="btn px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        <div v-if="weatherData" class="info-group p-5">
          <div class="text-center text-white">
            <p v-if="weatherData.location?.name" class="text-4xl mb-3">
              {{ weatherData.location.name }}
            </p>
            <p v-if="weatherData.location?.country" class="text-l opacity-60">
              {{ weatherData.location.country }}
            </p>
            <p v-if="weatherData.current?.temp_c" class="text-7xl mt-7 mb-3">
              {{ weatherData.current.temp_c }}º
            </p>
            <p v-if="weatherData.current?.feelslike_c" class="text-xl mb-10">
             {{ weatherData.current.condition.text }}
            </p>
          </div>
  
          <Map
            v-if="weatherData?.location?.lat && weatherData?.location?.lon"
            :latitude="weatherData.location.lat"
            :longitude="weatherData.location.lon"
          />
        </div>
  
      </div>

      <WeatherData v-if="weatherData" :weatherData="weatherData" />

    </div>

    <!-- Notification Component -->
    <Notification
      type="error"
      :isVisible="isVisible"
      :message="error"
      @onClose="isVisible = false"
    />
  </div>
</template>
