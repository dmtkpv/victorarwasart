export default () => ({
    getters: {

        'layout/nav' (state, getters) {

            return [
                {
                    title: 'Artwork',
                    path: '/artwork',
                    total: getters['api/count'].artworks,
                    filters: getters['filters/config']([
                        'movements',
                        'types'
                    ]),
                },
                {
                    title: 'Viewing room',
                    path: '/viewing-room',
                    total: getters['api/count'].viewing_room
                },
                {
                    title: 'Publications',
                    path: '/publications',
                    total: getters['api/count'].publications,
                    filters: getters['filters/config']([
                        'publications'
                    ])
                },
                {
                    title: 'Writings',
                    path: '/writings',
                    total: getters['api/count'].artists + getters['api/count'].essays + getters['api/count'].poems
                },
                {
                    title: 'Exhibitions',
                    path: '/exhibitions',
                    total: getters['api/count'].exhibitions
                },
                {
                    title: 'About us',
                    path: '/about-us',
                    total: 'Since 1986'
                }
            ]
        }

    }
})