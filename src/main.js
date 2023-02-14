import { createApp, createVNode } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// global css
import './less/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import Directives from './directive'

// permission control
import './permission'

// import './test'

// utils
import { DateFormat } from '@/utils/util'

import Icon from './components/Icon.vue';

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// const { mockXHR } = require('../mock')
// mockXHR()

const app = createApp(App)

app
  .use(ElementPlus)
  .use(Directives)
  .use(router)
  .use(store)
  .provide('$DateFormat', DateFormat)
  .mount('#app');


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component('Icon', Icon);

export default app;
