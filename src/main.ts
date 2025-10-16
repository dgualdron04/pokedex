import { createApp } from "vue";
import App from "./app/App.vue";
import { router } from "./app/router";
import { createPinia } from "pinia";

import "@/app/assets/styles/tokens.css";
import "@/app/assets/styles/base.css";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
