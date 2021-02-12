// ------------------
// Imports
// ------------------

import '$styles/base'
import '$styles/vars'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import Axios from '$services/axios'
import Store from '$services/store'
import Router from '$services/router'
import Index from './index.vue'



// ------------------
// Constants
// ------------------

const baseURL = 'http://93.188.166.42:49012'



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

    sync(store, router);

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