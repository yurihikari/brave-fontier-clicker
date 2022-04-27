import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import mitt from "mitt";

const eventBus = mitt();
const app = createApp(App);

//Make eventBus accessible anywhere
app.config.globalProperties.eventBus = eventBus;
app.use(createPinia());
app.use(router);

app.mount("#app");
