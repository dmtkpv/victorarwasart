export default () => ({
    getters: {



        // ------------------
        // Artworks
        // ------------------

        'filter/movements' (state, getters) {
            const items = getters['api/filter/movements'];
            const enabled = getters['api/artworks/enabled'].in_movements;
            return {
                id: 'a1',
                mode: 'params',
                items: items.map(item => ({
                    ...item,
                    disabled: !enabled.find(id => item.id === id)
                })),
                head: {
                    title: 'Movements',
                    total: items.length
                }
            }
        },

        'filter/types' (state, getters) {
            const items = getters['api/filter/types'];
            const enabled = getters['api/artworks/enabled'].in_types;
            return {
                id: 'a2',
                mode: 'params',
                items: items.map(item => ({
                    ...item,
                    disabled: !enabled.find(id => item.id === id)
                })),
                head: {
                    title: 'Type',
                    total: items.length
                }
            }
        },

        'filter/artists' (state, getters) {
            const data = getters['api/filter/artists'];
            const enabled = getters['api/artworks/enabled'].artist;
            const items = data.filter(item => item.total);
            return {
                id: 'a3',
                mode: 'params',
                items: items.map(item => ({
                    ...item,
                    disabled: !enabled.find(id => item.id === id)
                })),
                options: {
                    alphabetic: true
                },
                head: {
                    title: 'Artists',
                    total: items.length
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
                options: {
                    opened: true,
                },
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
                items: getters['api/filter/artists'].filter(item => item.biography).map(({ id, title }) => ({ id, title })),
                options: {
                    alphabetic: true,
                    back: '/writings',
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
                    back: '/writings',
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
                    back: '/writings',
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