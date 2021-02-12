export default () => ({
    getters: {



        // ------------------
        // Configuration
        // ------------------

        filters (state, getters) {
            return [


                // artworks

                {
                    id: 'movements',
                    items: getters['api/filter/movements'],
                    mode: 'params',
                    options: {
                        param: 'movement'
                    },
                    head: {
                        title: 'Movements',
                        total: getters['api/filter/movements'].length
                    }
                },

                {
                    id: 'types',
                    items: getters['api/filter/types'],
                    mode: 'params',
                    options: {
                        param: 'type'
                    },
                    head: {
                        title: 'Type',
                        total: getters['api/filter/types'].length
                    }
                },

                {
                    id: 'artists',
                    items: getters['api/filter/artists'],
                    mode: 'params',
                    options: {
                        param: 'artist',
                        alphabetic: true
                    },
                    head: {
                        title: 'Artists',
                        total: getters['api/filter/artists'].length
                    }
                },


                // publications

                {
                    id: 'publications',
                    items: getters['api/filter/publications'],
                    mode: 'params',
                    options: {
                        param: 'type'
                    }
                },


                // search

                {
                    id: 'search',
                    mode: 'params',
                    options: {
                        param: 'type'
                    },
                    items: [{
                        id: 'artworks',
                        title: 'Artwork',
                        total: getters['api/search/count'].artworks || 0
                    }, {
                        id: 'rooms',
                        title: 'Viewing room',
                        total: getters['api/search/count'].rooms || 0
                    }, {
                        id: 'publications',
                        title: 'Publications',
                        total: getters['api/search/count'].publications || 0
                    }, {
                        id: 'writings',
                        title: 'Writing',
                        total: (getters['api/search/count'].essays + getters['api/search/count'].poems + getters['api/search/count'].artists) || 0
                    }]
                },


                // writings

                {
                    id: 'biographies',
                    mode: 'links',
                    options: {
                        alphabetic: true,
                        path: '/writings?biography='
                    },
                    head: {
                        title: 'Biographies',
                        total: getters['api/filter/artists'].length
                    },
                    items: getters['api/filter/artists']
                },

                {
                    id: 'essays',
                    mode: 'links',
                    options: {
                        numeric: true,
                        path: '/writings/essay/'
                    },
                    head: {
                        title: 'Essays',
                        total: getters['api/essays'].length
                    },
                    items: getters['api/essays']
                },

                {
                    id: 'poems',
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

            ]
        },



        // ------------------
        // Helpers
        // ------------------

        'filter/config' (state, getters) {
            return id => getters.filters.find(filter => filter.id === id);
        },

        'filters/config' (state, getters) {
            return ids => ids.map(id => getters['filter/config'](id));
        },

        'filter/values' (state, getters, rootState) {
            return (id, query = rootState.route.query) => {
                // console.log(id, query)
                const config = getters['filter/config'](id);
                const param = config.options.param;
                let values = query[param];
                if (!Array.isArray(values)) values = [values];
                values = values.map(id => isNaN(id) ? id : +id);
                values = values.filter((value, i, self) => self.indexOf(value) === i);
                values = values.filter(value => config.items.find(item => item.id === value));
                return values;
            }
        },

        'filters/values' (state, getters) {
            return (ids, query) => ids.reduce((result, id) => {
                result[id] = getters['filter/values'](id, query);
                return result;
            }, {});
        }



    }
});