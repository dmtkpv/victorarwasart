import Vue from 'vue'

export default () => ({

    namespaced: true,
    state: {},

    mutations: {

        set (state, [key, value]) {
            Vue.set(state, key, value);
        }

    }

})