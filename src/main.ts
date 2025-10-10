import { createApp } from "vue";
import App from "./app/App.vue";
import { router } from "./app/router";

import "@/app/assets/styles/tokens.css";
import "@/app/assets/styles/base.css";

createApp(App).use(router).mount("#app");
