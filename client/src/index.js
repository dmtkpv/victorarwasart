// ------------------
// Imports
// ------------------

import '$styles/base'
import '$styles/vars'
import '$services/scripts'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Axios from '$services/axios'
import Store from '$services/store'
import Router from '$services/router'
import Index from './index.vue'



// ------------------
// Constants
// ------------------

const baseURL = 'https://api.victorarwas.com'
// const baseURL = 'http://localhost:49012'



// ------------------
// Vue config
// ------------------

Vue.config.devtools = false;
Vue.config.productionTip = false;
Vue.prototype.baseURL = baseURL;
Vue.use(Vuex);
Vue.use(VueRouter);



// ------------------
// Initialization
// ------------------

export default function init () {

    const axios = Axios({ baseURL });
    const store = Store({ axios });
    const router = Router({ $store: store });

    const app = new Vue({
        store,
        router,
        render: h => h(Index),
    });

    return { app, store, router }

}



// ------------------
// Mounter
// ------------------

if (!NODE) {
    const { app, router } = init();
    router.onReady(() => app.$mount('#app'));
}