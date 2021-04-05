export default () => ({

    namespaced: true,
    state: {
        data: {}
    },

    getters: {

        disabled (state) {
            return !!Object.values(state.data).find(value => value);
        }

    },

    mutations: {

        set (state, data) {
            if (NODE) return;
            state.data = { ...state.data, ...data }
        }

    }

})