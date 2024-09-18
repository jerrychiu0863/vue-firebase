import { createApp } from "vue";
import Toast from "vue-toastification";
// Styles
import "primeicons/primeicons.css";
import "vue-toastification/dist/index.css";
import "./style.css";
// Component
import App from "./App.vue";
// Router
import { router } from "./router";

const app = createApp(App);
app.use(router);
app.use(Toast);
app.mount("#app");
