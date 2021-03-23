// ------------------
// Helpers
// ------------------

function csv (val) {
    if (Array.isArray(val)) return val.join(',');
    return val;
}



// ------------------
// Fields
// ------------------

export const fields = {

    'artworks': [
        'id',
        'title',
        'artist.name',
        'artist.lifetime',
        'image.id',
        'image.width',
        'image.height',
        'year',
        'technique',
        'dimensions',
        'reference',
        'note'
    ],

    'artworks/item': [
        'id',
        'title',
        'artist.name',
        'artist.lifetime',
        'image.id',
        'year',
        'technique',
        'dimensions',
        'reference',
        'note',
        'cover',
        'additional_images.directus_files_id'
    ],

    'publications': [
        'id',
        'title',
        'year',
        'text',
        'reference',
        'image.id',
        'image.width',
        'image.height'
    ],

    essays: [
        'id',
        'title'
    ],

    poems: [
        'id',
        'title'
    ],

    artists: [
        'id',
        'name'
    ],

    rooms: [
        'id',
        'title',
        'image.id',
        'image.width',
        'image.height'
    ],

    screen: [
        'id',
        'align',
        'height',
        'container',
        'text'
    ]

}



// ------------------
// Endpoints
// ------------------

export default {



    // ------------------
    // Filters
    // ------------------

    'filter/movements' () {
        return {
            url: '/custom/filter/artwork_movements'
        }
    },

    'filter/types' () {
        return {
            url: '/custom/filter/artwork_types'
        }
    },

    'filter/publications' () {
        return {
            url: '/custom/filter/publication_types'
        }
    },

    'filter/artists' () {
        return {
            url: '/items/artists',
            params: {
                fields: 'id,name,artworks,note',
                limit: -1
            },
            transform (items) {
                return items.map(item => {
                    return {
                        id: item.id,
                        title: item.name,
                        total: item.artworks && item.artworks.length,
                        note: item.note
                    }
                })
            }
        }
    },



    // ------------------
    // Collections
    // ------------------

    'home' () {
        return {
            url: '/items/home',
            params: {
                fields: fields['artworks/item'].map(field => `artworks.artworks_id.${field}`).join(',')
            },
            transform (response) {
                const items = response.artworks.map(item => item.artworks_id);
                const index = Math.floor(Math.random() * items.length);
                const item = items[index];
                items.splice(index, 1);
                items.unshift(item);
                return items;
            }
        }
    },

    'artworks' ({ a1, a2, a3, sort, offset, limit } = {}) {
        return {
            url: '/items/artworks',
            params: {
                fields: csv(fields['artworks']),
                'filter[movements][artwork_movements_id][_in]': csv(a1),
                'filter[types][artwork_types_id][_in]': csv(a2),
                'filter[artist][id][_in]': csv(a3),
                offset, limit, sort
            }
        }
    },

    'artworks/enabled' ({ a1, a2, a3 } = {}) {
        return {
            url: '/custom/enabled-filters',
            params: {
                'filter[movements][artwork_movements_id][_in]': csv(a1),
                'filter[types][artwork_types_id][_in]': csv(a2),
                'filter[artist][id][_in]': csv(a3),
            },
            default: {
                movements: [],
                types: [],
                artists: []
            }
        }
    },

    'artworks/item' (id) {
        return {
            url: '/items/artworks/' + id,
            params: {
                fields: fields['artworks/item'].join(','),
            },
            default: {}
        }
    },

    'rooms' () {
        return {
            url: '/items/viewing_room',
            params: {
                fields: fields.rooms.join(','),
                limit: -1,
                sort: 'sort'
            }
        }
    },

    'rooms/item' (id) {
        return {
            url: '/items/viewing_room/' + id,
            params: {
                fields: [
                    'title',
                    'note',
                    ...fields.screen.map(field => `gallery.screens_id.${field}`),
                    ...fields.artworks.map(field => `gallery.screens_id.artworks.artworks_id.${field}`),
                ].join(',')
            },
            default: {}
        }
    },

    'publications' ({ p1, offset, limit } = {}) {
        return {
            url: '/items/publications',
            params: {
                fields: fields.publications.join(','),
                'filter[types][publication_types_id][_in]': csv(p1),
                limit, offset
            }
        }
    },

    'essays' () {
        return {
            url: '/items/essays',
            params: {
                fields: fields.essays.join(','),
                limit: -1
            }
        }
    },

    'essays/item' (id) {
        return {
            url: '/items/essays/' + id,
            default: {}
        }
    },

    'poems' () {
        return {
            url: '/items/poems',
            params: {
                fields: fields.poems.join(','),
                limit: -1
            }
        }
    },

    'poems/item' (id) {
        return {
            url: '/items/poems/' + id,
            default: {}
        }
    },

    'artists/item' (id) {
        return {
            url: '/items/artists/' + id,
            params: {
                fields: 'id,name,biography'
            },
            default: {}
        }
    },

    'exhibitions' () {
        return {
            url: '/items/exhibitions',
            params: {
                limit: -1,
                sort: 'sort'
            }
        }
    },



    // ------------------
    // Search
    // ------------------

    'search' (params) {
        return {
            url: '/custom/search',
            params
        }
    },

    'search/count' (params) {
        return {
            url: '/custom/search/count',
            params,
            default: {}
        }
    },



    // ------------------
    // About
    // ------------------

    'contacts' () {
        return {
            url: '/items/contacts',
            params: {
                fields: 'id,title,link'
            }
        }
    },

    'about' () {
        return {
            url: '/items/about_us',
            params: {
                fields: '*,gallery.directus_files_id.title,gallery.directus_files_id.id'
            },
            default: {}
        }
    },



    // ------------------
    // Helpers
    // ------------------

    'count' () {
        return {
            url: '/custom/count'
        }
    },

    'email' (data) {
        return {
            method: 'POST',
            url: '/custom/email',
            data
        }
    },

    'timeout' () {
        return {
            url: '/custom/timeout',
            params: {
                ms: 1000
            }
        }
    },

}