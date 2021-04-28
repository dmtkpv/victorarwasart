export default () => ({
    getters: {



        // ------------------
        // Artworks
        // ------------------

        'filter/artworks' (state, getters) {
            return getters['api/filter/artworks'].map(filter => {
                return {
                    id: filter.field,
                    mode: 'params',
                    items: filter.filters,
                    head: {
                        title: filter.title,
                        total: filter.filters.length
                    }
                }
            })
        },

        // 'filter/movements' (state, getters) {
        //     const items = getters['api/filter/movements'];
        //     const enabled = getters['api/artworks/enabled'].in_movements;
        //     return {
        //         id: 'a1',
        //         mode: 'params',
        //         items: items.map(item => ({
        //             ...item,
        //             disabled: !enabled.find(id => item.id === id)
        //         })),
        //         head: {
        //             title: 'Movements',
        //             total: items.length
        //         }
        //     }
        // },

        // 'filter/types' (state, getters) {
        //     const items = getters['api/filter/types'];
        //     const enabled = getters['api/artworks/enabled'].in_types;
        //     return {
        //         id: 'a2',
        //         mode: 'params',
        //         items: items.map(item => ({
        //             ...item,
        //             disabled: !enabled.find(id => item.id === id)
        //         })),
        //         head: {
        //             title: 'Type',
        //             total: items.length
        //         }
        //     }
        // },

        'filter/artists' (state, getters) {
            const data = getters['api/filter/artists'];
            const enabled = getters['api/artworks/enabled'].artist;
            const items = data.filter(item => item.total);
            return {
                id: 'artist',
                mode: 'params',
                items: items.map(item => ({
                    ...item,
                    value: [item.value]
                    // disabled: !enabled.find(id => item.id === id)
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
            return getters['api/filter/publications'].map(filter => {
                return {
                    id: 'p' + filter.title,
                    mode: 'params',
                    items: filter.filters,
                    head: {
                        title: filter.title,
                        total: filter.filters.length
                    }
                }
            })
            // return {
            //     id: 'p1',
            //     mode: 'params',
            //     options: {
            //         opened: true,
            //     },
            //     items: getters['api/filter/publications']
            // }
        },



        // ------------------
        // Search
        // ------------------

        'filter/search' (state, getters) {
            const count = getters['api/search/count'];
            return {
                id: 's',
                mode: 'params',
                options: {
                    opened: true,
                },
                items: [{
                    value: ['artworks'],
                    title: 'Artwork',
                    total: count.artworks || 0
                }, {
                    value: ['viewing_room'],
                    title: 'Viewing room',
                    total: count.viewing_room || 0
                }, {
                    value: ['publications'],
                    title: 'Publications',
                    total: count.publications || 0
                }, {
                    value: ['writings'],
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