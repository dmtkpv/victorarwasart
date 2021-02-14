// ------------------
// Imports
// ------------------

import home from '$routes/route.home'
import artworks from '$routes/route.artworks'
// import room from '@/components/routes/room/route.room.vue'
// import publications from '$routes/publications'
import writings from '$routes/route.writings'
import essay from '$routes/route.writings.essay'
import poem from '$routes/route.writings.poem'
import biography from '$routes/route.writings.biography'
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
        component: home,
        meta: {
            nav: 'transparent'
        }
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
    {
        path: '/writings',
        component: writings
    },
    {
        path: '/writings/essay/:id',
        component: essay
    },
    {
        path: '/writings/poem/:id',
        component: poem
    },
    {
        path: '/writings/biography/:id',
        component: biography
    },
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