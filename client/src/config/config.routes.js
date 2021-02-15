// ------------------
// Imports
// ------------------

import home from '$routes/route.home'
import artworks from '$routes/route.artworks'
import rooms from '$routes/route.rooms'
import room from '$routes/route.rooms.room'
import publications from '$routes/route.publications'
import writings from '$routes/route.writings'
import essay from '$routes/route.writings.essay'
import poem from '$routes/route.writings.poem'
import biography from '$routes/route.writings.biography'
import exhibitions from '$routes/route.exhibitions'
import about from '$routes/route.about'
import search from '$routes/route.search'



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
    {
        path: '/viewing-room',
        component: rooms,
        meta: {
            footer: true
        }
    },
    {
        path: '/viewing-room/:id',
        component: room,
        meta: {
            footer: true
        }
    },
    {
        path: '/publications',
        component: publications,
        meta: {
            footer: true
        }
    },
    {
        path: '/writings',
        component: writings
    },
    {
        path: '/writings/essay/:id',
        component: essay,
        meta: {
            footer: true
        }
    },
    {
        path: '/writings/poem/:id',
        component: poem,
        meta: {
            footer: true
        }
    },
    {
        path: '/writings/biography/:id',
        component: biography,
        meta: {
            footer: true
        }
    },
    {
        path: '/exhibitions',
        component: exhibitions,
        meta: {
            footer: true
        }
    },
    {
        path: '/about-us',
        component: about
    },
    {
        path: '/search',
        component: search,
        meta: {
            footer: true
        }
    }
]