<!--
    Styles
-->

<style lang="scss" scoped>



    // --------------------
    // Header
    // --------------------

    .l-header {

        @extend %col;
        @extend %line;

        @include md-xl {

            left: $column-width;
            padding: $indent-y $indent-x;

            ::v-deep .l-filter:not(:last-child) {
                display: none;
            }

            ::v-deep .l-filter-head .total {
                display: block;
                opacity: 0;
            }

            &:hover ::v-deep .l-filter-head:not(.filtered) {
                color: $red;
                .total { opacity: 1 }
            }

        }

        ::v-deep .l-filter:last-child .l-filter-list {
            margin-bottom: $indent-bottom;
        }

    }



    // --------------------
    // Masonry
    // --------------------

    .l-masonry {

        margin-bottom: $indent-bottom;

        ::v-deep .l-masonry-line {
            &:nth-child(1):before { left: calc(#{$column-width} * 2); }
            &:nth-child(2):before { left: calc(#{$column-width} * 3); }
            &:nth-child(3):before { left: calc(#{$column-width} * 4); }
        }

        @include md-xl {
            padding-left: calc(#{$column-width} * 2);
        }

    }



    // --------------------
    // Footer
    // --------------------

    .l-section:not(.loaded) ~ ::v-deep .l-footer {
        display: none;
    }



</style>



<!--
    Template
-->

<template>
    <layout-section :class="{ loaded }">
        <layout-header v-bind="header" />
        <layout-masonry :grid="grid" @more="more">
            <tile-artwork v-for="item in artworks" v-bind="item" :key="item.id" @click="modal" />
        </layout-masonry>
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutSection from '$layout/layout.section'
    import layoutHeader from '$layout/header/layout.header'
    import layoutMasonry from '$layout/layout.masonry'
    import tileArtwork from '$tiles/tile.artwork'

    function getFilters (ctx) {
        return [
            ctx.$store.getters['filter/movements'],
            ctx.$store.getters['filter/types'],
            ctx.$store.getters['filter/artists']
        ]
    }

    function getQuery (filters, query) {
        return {
            ...$.filters(filters, query),
            sort: query.sort
        }
    }

    function getParams (query) {
        return {
            ...query,
            limit: 50,
            offset: 0
        }
    }

    export default {

        components: {
            layoutSection,
            layoutHeader,
            layoutMasonry,
            tileArtwork
        },

        data () {

            return {
                grid: {
                    xl: 3,
                    lg: 2,
                    md: 1
                },
                params: {}
            }
        },

        computed: {

            header () {
                return {
                    mode: 'refine',
                    filters: this.filters,
                    sort: [
                        { title: 'New' },
                        { title: 'A-Z', value: 'title' },
                        { title: 'Year', value: '-year'}
                    ],
                    breadcrumbs: [
                        { title: 'Artwork' }
                    ]
                }
            },

            loaded () {
                return this.$store.state.api.loaded['artworks'];
            },

            artworks () {
                return this.$store.getters['api/artworks'];
            },

            filters () {
                return getFilters(this);
            },

            query () {
                return getQuery(this.filters, this.$route.query);
            },

            queryString () {
                return JSON.stringify(this.query);
            }

        },

        methods: {

            update () {
                this.params = getParams(this.query);
                this.$store.commit('cancel', 'artworks');
                this.$store.commit('cancel', 'artworks/enabled');
                this.$store.dispatch('request', ['artworks', this.params]);
                this.$store.dispatch('request', ['artworks/enabled', this.params]);
            },

            more () {
                this.$store.dispatch('append', ['artworks', this.params]);
            },

            modal (id) {
                this.$store.commit('storage/set', ['artwork', {
                    list: () => this.artworks,
                    more: this.more
                }]);
                this.$router.push({ query: { ...this.$route.query, modal_artwork: id } })
            },

        },

        watch: {

            queryString () {
                this.update();
            }

        },

        async beforeRouteEnter (to, from, next) {
            if ($.dehydrated) {
                this.$store.commit('cancel', 'artworks');
                this.$store.commit('cancel', 'artworks/enabled');
            }
            await Promise.all([
                this.$store.dispatch('request', 'filter/movements'),
                this.$store.dispatch('request', 'filter/types'),
                this.$store.dispatch('request', 'filter/artists')
            ]);
            const filters = getFilters(this);
            const query = getQuery(filters, to.query);
            const params = getParams(query);
            await Promise.all([
                this.$store.dispatch('request', ['artworks', params]),
                this.$store.dispatch('request', ['artworks/enabled', params]),
            ]);
            next();
        },

        created () {
            this.params = getParams(this.query);
        }

    }

</script>
