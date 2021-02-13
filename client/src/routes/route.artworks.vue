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
            ::v-deep .l-filter:not(:last-child) { display: none }
        }

    }



    // --------------------
    // Section
    // --------------------

    .l-masonry {

        ::v-deep .l-masonry-line {
            &:nth-child(1):before { left: calc(#{$column-width} * 2); }
            &:nth-child(2):before { left: calc(#{$column-width} * 3); }
            &:nth-child(3):before { left: calc(#{$column-width} * 4); }
        }

        @include md-xl {
            padding-left: calc(#{$column-width} * 2);
        }

    }



</style>



<!--
    Template
-->

<template>
    <section>
        <layout-header v-bind="header" />
        <layout-masonry :grid="grid" @more="more">
            <tile-artwork v-for="item in artworks" v-bind="item" :key="item.id" />
        </layout-masonry>
    </section>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
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

    function getParams (filters, query) {
        return {
            ...$.filters(filters, query),
            sort: query.sort,
            limit: 50,
            offset: 0
        }
    }

    export default {

        components: {
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
                    sortable: true,
                    filters: this.filters,
                    sort: [
                        { title: 'New' },
                        { title: 'A-Z', value: 'title' },
                        { title: 'Year', value: '-year'}
                    ],
                    breadcrumbs: [
                        { title: 'Artwork', path: '/artwork' }
                    ]
                }
            },

            filters () {
                return getFilters(this);
            },

            artworks () {
                return this.$store.state.api.response['artworks'];
            }

        },

        methods: {

            update () {
                this.params = getParams(this.filters, this.$route.query);
                this.$store.commit('cancel', 'artworks');
                this.$store.dispatch('request', ['artworks', this.params]);
            },

            more () {
                this.$store.dispatch('append', ['artworks', this.params]);
            }

        },

        watch: {

            $route () {
                this.update();
            }

        },

        async beforeRouteEnter (to, from, next) {
            if ($.dehydrated) this.$store.commit('cancel', 'artworks');
            await Promise.all([
                this.$store.dispatch('request', 'filter/movements'),
                this.$store.dispatch('request', 'filter/types'),
                this.$store.dispatch('request', 'filter/artists')
            ]);
            const filters = getFilters(this);
            const params = getParams(filters, to.query)
            await this.$store.dispatch('request', ['artworks', params]);
            next();
        },

        created () {
            this.params = getParams(this.filters, this.$route.query);
        }

    }

</script>
