// ------------------
// Imports
// ------------------

import Axios from 'axios';
import $ from '$services/utils';
import APIs from '$config/config.api';



// ------------------
// Helpers
// ------------------

const defaults = {
    transform: $.noop,
    default: []
}

const keys = Object.keys(APIs).reduce((result, key) => {
    result[key] = null;
    return result;
}, {});

const getters = Object.keys(APIs).reduce((result, key) => {
    result[`api/${key}`] = state => state.response[key] || APIs[key]().default || defaults.default
    return result;
}, {});



// ------------------
// Store
// ------------------

export default () => ({

    state: {
        cancels: { ...keys },
        pending: { ...keys },
        loaded: { ...keys },
        response: { ...keys, ...__INITIAL_STATE__ },
        cached: { ...keys, ...__INITIAL_STATE__ },
    },

    getters: {
        ...getters
    },

    mutations: {

        cancel (state, key) {
            if (state.cancels[key]) state.cancels[key].cancel();
            state.cancels[key] = null;
            state.pending[key] = null;
            state.cached[key] = null;
            state.loaded[key] = null;
        }

    },

    actions: {

        load ({ state }, options) {
            const [ key, params ] = $.array(options);
            const config = Object.assign({}, defaults, APIs[key](params));
            return this.axios(config).then(response => {
                if (response.error) response = config.default;
                else response = config.transform(response);
                return response;
            });
        },

        request ({ state }, options) {

            const [ key, params ] = $.array(options);
            if (state.cached[key]) return Promise.resolve(state.response[key]);
            if (state.pending[key]) return state.pending[key];

            const config = Object.assign({}, defaults, APIs[key](params));
            state.cancels[key] = Axios.CancelToken.source();
            config.cancelToken = state.cancels[key].token;

            return state.pending[key] = this.axios(config).then(response => {
                if (response.cancelled) return config.default;
                if (response.error) response = config.default;
                else response = config.transform(response);
                state.cached[key] = true;
                state.pending[key] = null;
                state.response[key] = response;
                return response;
            });

        },

        append ({ state }, options) {

            const [ key, params ] = $.array(options);
            if (state.loaded[key]) return Promise.resolve(state.response[key]);
            if (state.pending[key]) return state.pending[key];
            params.offset += params.limit;

            const config = Object.assign({}, defaults, APIs[key](params));
            state.cancels[key] = Axios.CancelToken.source();
            config.cancelToken = state.cancels[key].token;

            return state.pending[key] = this.axios(config).then(response => {
                if (response.cancelled) return config.default;
                if (response.error) response = config.default;
                else response = config.transform(response);
                state.pending[key] = null;
                state.loaded[key] = !response.length;
                state.response[key] = [...state.response[key], ...response];
            });

        }

    }
})