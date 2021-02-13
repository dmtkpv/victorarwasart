// ------------------
// Modules
// ------------------

import Vuex from 'vuex'
import api from '$store/store.api'
import filter from '$store/store.filters'
import layout from '$store/store.layout'
import scroll from '$store/store.scroll'



// ------------------
// Exports
// ------------------

export default function (context) {
    return new Vuex.Store({
        modules: {
            api: api(),
            filter: filter(),
            layout: layout(),
            scroll: scroll()
        },
        plugins: [
            store => Object.assign(store, context)
        ]
    })
}