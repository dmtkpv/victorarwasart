export default () => ({

    namespaced: true,
    state: {},

    mutations: {

        set (state, value) {
            if (NODE) return;
            Object.assign(state, value);
            const disabled = Object.values(state).find(value => value);
            document.body.style.overflow = disabled ? 'hidden' : '';
        }

    }

})