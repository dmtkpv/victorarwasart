import $ from '$services/utils';

const fields = {

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
        'additional_images.directus_files_id'
    ]

}

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
                fields: 'id,name,artworks,note'
            },
            transform (items) {
                return items.filter(item => item.artworks).map(item => {
                    return {
                        id: item.id,
                        title: item.name,
                        total: item.artworks.length,
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
                return response.artworks.map(item => item.artworks_id);
            }
        }
    },

    'artworks' ({ types, movements, artists, sort, offset, limit }) {
        return {
            url: '/items/artworks',
            params: {
                fields: fields['artworks'].join(','),
                'filter[types][artwork_types_id][_in]': $.filter(types),
                'filter[movements][artwork_movements_id][_in]': $.filter(movements),
                'filter[artist][id][_in]': $.filter(artists),
                offset, limit, sort
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
            url: '/items/viewing_room'
        }
    },

    'rooms/item' (id) {
        return {
            url: '/items/viewing_room/' + id
        }
    },

    'publications' ({ type, offset, limit }) {
        return {
            url: '/items/publications',
            params: {
                fields: '*,image.id,image.width,image.height',
                'filter[types][publication_types_id][_in]': $.filter(type),
                limit, offset
            }
        }
    },

    'essays' () {
        return {
            url: '/items/essays',
            params: {
                fields: 'id,title',
                limit: -1
            },
            // transform (items) {
            //     return items.map(item => {
            //         return {
            //             id: item.id,
            //             title: item.name,
            //             total: item.artworks.length,
            //             note: item.note
            //         }
            //     })
            // }
        }
    },

    'essays/item' (id) {
        return {
            url: '/items/essays/' + id
        }
    },

    'poems' () {
        return {
            url: '/items/poems',
            params: {
                fields: 'id,title',
                limit: -1
            }
        }
    },

    'poems/item' (id) {
        return {
            url: '/items/poems/' + id
        }
    },

    'biographies' () {
        return {
            url: '/items/biographies'
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
    // Helpers
    // ------------------

    'count' () {
        return {
            url: '/custom/count'
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