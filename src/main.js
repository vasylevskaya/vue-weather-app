import './assets/main.css'
import 'font-awesome/css/font-awesome.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notification from './components/Notification.vue';
import WeatherData from './components/WeatherData.vue';
import WeatherDataItem from './components/WeatherDataItem.vue';
import Map from './components/Map.vue';

const app = createApp(App)

app.component('Notification', Notification); // Global registration
app.component('WeatherData', WeatherData); // Global registration
app.component('WeatherDataItem', WeatherDataItem); // Global registration
app.component('Map', Map); // Global registration

app.use(router)

app.mount('#app')
