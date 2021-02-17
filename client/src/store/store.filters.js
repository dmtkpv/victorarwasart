export default () => ({
    getters: {



        // ------------------
        // Artworks
        // ------------------

        'filter/movements' (state, getters) {
            return {
                id: 'a1',
                mode: 'params',
                items: getters['api/filter/movements'],
                head: {
                    title: 'Movements',
                    total: getters['api/filter/movements'].length
                }
            }
        },

        'filter/types' (state, getters) {
            return {
                id: 'a2',
                mode: 'params',
                items: getters['api/filter/types'],
                head: {
                    title: 'Type',
                    total: getters['api/filter/types'].length
                }
            }
        },

        'filter/artists' (state, getters) {
            return {
                id: 'a3',
                mode: 'params',
                items: getters['api/filter/artists'].filter(item => item.total),
                options: {
                    alphabetic: true
                },
                head: {
                    title: 'Artists',
                    total: getters['api/filter/artists'].length
                }
            }
        },



        // ------------------
        // Publications
        // ------------------

        'filter/publications' (state, getters) {
            return {
                id: 'p1',
                mode: 'params',
                items: getters['api/filter/publications']
            }
        },



        // ------------------
        // Search
        // ------------------

        'filter/search' (state, getters) {
            const count = getters['api/search/count'];
            return {
                id: 's',
                mode: 'params',
                items: [{
                    id: 'artworks',
                    title: 'Artwork',
                    total: count.artworks || 0
                }, {
                    id: 'viewing_room',
                    title: 'Viewing room',
                    total: count.viewing_room || 0
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
                id: 'w1',
                mode: 'links',
                items: getters['api/filter/artists'].map(({ id, title }) => ({ id, title })),
                options: {
                    alphabetic: true,
                    path: '/writings/biography/',
                },
                head: {
                    title: 'Biographies',
                    total: getters['api/filter/artists'].length
                }
            }
        },

        'filter/essays' (state, getters) {
            return {
                id: 'w2',
                mode: 'links',
                items: getters['api/essays'],
                options: {
                    numeric: true,
                    path: '/writings/essay/',
                },
                head: {
                    title: 'Essays',
                    total: getters['api/essays'].length
                }
            }
        },

        'filter/poems' (state, getters) {
            return {
                id: 'w3',
                mode: 'links',
                items: getters['api/poems'],
                options: {
                    numeric: true,
                    path: '/writings/poem/',
                },
                head: {
                    title: 'Poems',
                    total: getters['api/poems'].length
                }
            }
        }



    }
});