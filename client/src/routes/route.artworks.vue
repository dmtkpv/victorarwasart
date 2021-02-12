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
        left: $column-width;

        @include md-xl {
            padding: $indent-y $indent-x;
            ::v-deep .l-filter:not(:last-child) { display: none }
        }

    }



    // --------------------
    // Section
    // --------------------

    .l-grid {

        @extend %line;
        &:before { margin-left: 0 }

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
        <layout-grid :grid="grid" @more="more">
            <tile-artwork v-for="item in artworks" v-bind="item" :key="item.id" />
        </layout-grid>
    </section>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutHeader from '$layout/header/layout.header'
    import layoutGrid from '$layout/grid'
    import tileArtwork from '$tiles/tile.artwork'

    const filters = [
        'movements',
        'types',
        'artists'
    ]

    function getParams (ctx, route = ctx.$route) {
        const values = ctx.$store.getters['filters/values'](filters, route.query);
        const params = { sort: route.query.sort, ...values };
        return Object.assign({ limit: 50, offset: 0 }, params);
    }

    export default {

        components: {
            layoutHeader,
            layoutGrid,
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
                    filters: this.$store.getters['filters/config']([
                        'movements',
                        'types',
                        'artists'
                    ]),
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

            artworks () {
                return this.$store.state.api.response['artworks'];
            }

        },

        methods: {

            update () {
                this.params = getParams(this);
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
            await this.$store.dispatch('request', ['artworks', getParams(this, to)]);
            next();
        },

        created () {
            this.params = getParams(this);
        }

    }

</script>
