export default () => ({

    namespaced: true,
    state: {},

    mutations: {

        set (state, data) {
            Object.assign(state, data);
        }

    }

})