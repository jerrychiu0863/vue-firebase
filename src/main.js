import { createApp } from "vue";
import Toast from "vue-toastification";
// Styles
import "./style.css";
import "primeicons/primeicons.css";
import "vue-toastification/dist/index.css";
// Component
import App from "./App.vue";
// Router
import { router } from "./router";

const app = createApp(App);
app.use(router);
app.use(Toast);
app.mount("#app");
