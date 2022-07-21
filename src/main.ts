import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/base.css";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
