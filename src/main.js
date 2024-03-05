import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from './router';
import store from './store';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueQrcode from '@chenfengyuan/vue-qrcode';

const app = createApp(App).use(store).use(router).use(Toast);

app.mount("#app");
app.component(VueQrcode.name, VueQrcode)
