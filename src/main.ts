import 'bootstrap';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

// Auto Register Components Globally
const requireComponent = require.context('./components', true, /.*\.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');
  app.component(baseComponentName, baseComponentConfig);
});
app.use(store).use(router).mount('body');
