// ------------------
// Modules
// ------------------

import VueRouter from 'vue-router'
import Routes from '$config/config.routes'



// ------------------
// Bind
// ------------------

function bind (context) {
    return Routes.map(route => {
        const component = { ...route.component };
        const hook = component.beforeRouteEnter;
        if (hook) component.beforeRouteEnter = hook.bind(context);
        return { ...route, component };
    })
}



// ------------------
// Exports
// ------------------

export default function (context) {
    return new VueRouter({
        mode: 'history',
        routes: bind(context)
    })
}