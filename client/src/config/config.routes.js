// ------------------
// Imports
// ------------------

import home from '$routes/route.home'
import artworks from '$routes/route.artworks'
// import Router from "vue-router";
// import room from '@/components/routes/room/route.room.vue'
// import publications from '$routes/publications'
// import writings from '$routes/writings'
// import essay from '$routes/writings/essay'
// import search from '$routes/search'
// import exhibitions from '@/components/routes/exhibitions/route.exhibitions.vue'
// import about from '@/components/routes/about/route.about.vue'
// import search from '@/components/routes/search/route.search.vue'





// ------------------
// Config
// ------------------

export default [
    {
        path: '/',
        component: home
    },
    {
        path: '/artwork',
        component: artworks,
        meta: {
            footer: true
        }
    },
    // // {
    // //     path: '/viewing-room',
    // //     component: { }
    // // },
    // {
    //     path: '/publications',
    //     component: publications
    // },
    // {
    //     path: '/writings',
    //     component: writings
    // },
    // {
    //     path: '/writings/essay/:id',
    //     component: essay
    // },
    // // {
    // //     path: '/exhibitions',
    // //     component: { }
    // // },
    // // {
    // //     path: '/about-us',
    // //     component: { }
    // // },
    // {
    //     path: '/search',
    //     component: search
    // }
]