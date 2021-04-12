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
        'note',
        'additional_images.directus_files_id'
    ],

    'publications': [
        'id',
        'title',
        'year',
        'text',
        'size',
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
                        biography: item.note
                    }
                })
            }
        }
    },

    'filter/biography' (id) {
        return {
            url: '/items/artists/' + id,
            params: {
                fields: 'biography'
            }
        }
    },



    // ------------------
    // Collections
    // ------------------

    'home' () {
        return {
            url: '/items/home_artworks',
            params: {
                fields: [...fields['artworks/item'], 'homepage_cover'].map(field => `artworks_id.${field}`).join(','),
                'filter[artworks_id][id][_nnull]': true,
                'filter[home_id][_nnull]': true
            },
            transform (response) {
                const items = response.map(item => item.artworks_id);
                const index = Math.floor(Math.random() * items.length);
                const item = items[index];
                items.splice(index, 1);
                items.unshift(item);
                return items;
            }
        }
    },

    'artworks' ({ a1, a2, a3, sort, offset, limit } = {}) {
        let filter = { _and: [] };
        if (a1) filter._and.push({ _or: a1.map(_contains => ({ in_movements: { _contains } })) })
        if (a2) filter._and.push({ _or: a2.map(_contains => ({ in_types: { _contains } })) })
        if (a3) filter._and.push({ artist: { _in:  csv(a3) } })
        filter._and.push({ hidden_in_artworks: { _eq: false } });
        return {
            url: '/items/artworks',
            params: {
                fields: csv(fields['artworks']),
                filter, offset, limit, sort
            }
        }
    },

    'artworks/enabled' ({ a1, a2, a3 } = {}) {
        let params = {};
        if (a1) params.in_movements = { _or: a1.map(_contains => ({ in_movements: { _contains } })) }
        if (a2) params.in_types = { _or: a2.map(_contains => ({ in_types: { _contains } })) }
        if (a3) params.artist = { artist: { _in:  csv(a3) } }
        return {
            url: '/custom/enabled-filters',
            params,
            default: {
                in_movements: [],
                in_types: [],
                artist: []
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
                    'gallery.sort',
                    ...fields.screen.map(field => `gallery.screens_id.${field}`),
                    'gallery.screens_id.artworks.sort',
                    ...fields.artworks.map(field => `gallery.screens_id.artworks.artworks_id.${field}`),
                ].join(',')
            },
            transform (room) {
                const sort = (a, b) =>  a.sort - b.sort;
                room.gallery = room.gallery ? room.gallery.sort(sort).filter(item => item.screens_id).map(item => {
                    const screen = item.screens_id;
                    screen.artworks = screen.artworks ? screen.artworks.sort(sort).filter(item => item.artworks_id).map(item => item.artworks_id) : [];
                    return screen;
                }) : [];
                return room;
            },
            default: {}
        }
    },
    
    'publications' ({ p1, offset, limit } = {}) {
        let filter = { _or: [] };
        if (p1) filter._or = p1.map(_contains => ({ in_types: { _contains } }));
        return {
            url: '/items/publications',
            params: {
                fields: fields.publications.join(','),
                filter, limit, offset
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