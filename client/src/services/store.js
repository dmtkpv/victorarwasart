// ------------------
// Modules
// ------------------

import Vuex from 'vuex'
import api from '$store/store.api'
import filter from '$store/store.filters'
import layout from '$store/store.layout'



// ------------------
// Exports
// ------------------

export default function (context) {
    return new Vuex.Store({
        modules: {
            api,
            filter,
            layout
        },
        plugins: [
            store => Object.assign(store, context)
        ]
    })
}