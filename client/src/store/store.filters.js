export default {
    getters: {



        // ------------------
        // Artworks
        // ------------------

        'filter/movements' (state, getters) {
            return {
                items: getters['api/filter/movements'],
                mode: 'params',
                options: {
                    param: 'movement'
                },
                head: {
                    name: 'Movements',
                    total: getters['api/filter/movements'].length
                }
            }
        },

        'filter/types' (state, getters) {
            return {
                items: getters['api/filter/types'],
                mode: 'params',
                options: {
                    param: 'type'
                },
                head: {
                    name: 'Type',
                    total: getters['api/filter/types'].length
                }
            }
        },

        'filter/artists' (state, getters) {
            return {
                items: getters['api/filter/artists'],
                mode: 'params',
                options: {
                    param: 'artist',
                    alphabetic: true
                },
                head: {
                    name: 'Artists',
                    total: getters['api/filter/artists'].length
                }
            }
        },



        // ------------------
        // Publications
        // ------------------

        'filter/publications' (state, getters) {
            return {
                items: getters['api/filter/publications'],
                mode: 'params',
                options: {
                    param: 'type'
                }
            }
        },



        // ------------------
        // Search
        // ------------------

        'filter/search' (state, getters) {
            const count = getters['api/search/count'];
            return {
                mode: 'params',
                options: {
                    param: 'type'
                },
                items: [{
                    id: 'artworks',
                    title: 'Artwork',
                    total: count.artworks || 0
                }, {
                    id: 'rooms',
                    title: 'Viewing room',
                    total: count.rooms || 0
                }, {
                    id: 'publications',
                    title: 'Publications',
                    total: count.publications || 0
                }, {
                    id: 'writings',
                    title: 'Writing',
                    total: (count.essays + count.poems + count.artists) || 0
                }]
            }
        },



        // ------------------
        // Writings
        // ------------------

        'filter/biographies' (state, getters) {
            return {
                mode: 'links',
                options: {
                    alphabetic: true,
                    path: '/writings?biography='
                },
                head: {
                    name: 'Biographies',
                    total: getters['api/filter/artists'].length
                },
                items: getters['api/filter/artists']
            }
        },

        'filter/essays' (state, getters) {
            return {
                mode: 'links',
                options: {
                    numeric: true,
                    path: '/writings/essay/'
                },
                head: {
                    name: 'Essays',
                    total: getters['api/essays'].length
                },
                items: getters['api/essays']
            }
        },

        'filter/poems' (state, getters) {
            return {
                mode: 'links',
                options: {
                    numeric: true,
                    path: '/writings?poem='
                },
                head: {
                    name: 'Poems',
                    total: getters['api/poems'].length
                },
                items: getters['api/poems']
            }
        }



    }
}