export default () => ({
    getters: {



        // ------------------
        // Artworks
        // ------------------

        'filter/artworks' (state, getters) {

            const filters = getters['api/filter/artworks'];
            const enabled = getters['api/artworks/enabled'];

            const isDisabled = (item, id) => {
                if (!enabled[id]) return false;
                if (Array.isArray(item.id)) return item.id.some(i => !enabled[id].includes(i));
                return !enabled[id].includes(item.id);
            }

            return filters.map(({ id, title, total, items }) => {
                return {
                    id,
                    mode: 'params',
                    head: { title, total },
                    items: items.map(item => ({ ...item, disabled: isDisabled(item, id) }))
                }
            })
        },

        'filter/artists' (state, getters) {

            const data = getters['api/filter/artists'];
            const enabled = getters['api/artworks/enabled'].artist;
            const items = data.filter(item => item.total);

            return {
                id: 'artist',
                mode: 'params',
                items: items.map(item => ({
                    ...item,
                    disabled: enabled && !enabled.includes(item.id),
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
                id: 'p',
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
                options: {
                    opened: true,
                },
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