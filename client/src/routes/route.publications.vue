<!--
    Styles
-->

<style lang="scss" scoped>



    // --------------------
    // Header
    // --------------------

    .l-header {
        @include md-xl {
            display: none;
        }
    }



    // --------------------
    // Line
    // --------------------

    .line {

        @extend %line;

        &:before {
            margin-left: 0;
            @include xl { left: calc(#{$column-width} * 3) }
            @include lg { left: calc(#{$column-width} * 2.5) }
        }

        @include sm-md {
            display: none;
        }

    }



    // --------------------
    // Grid
    // --------------------

    .grid {
        @extend %line;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: $indent-bottom;
        &:before { margin-left: 0 }

        @include md-xl {
            padding-left: $column-width;
        }

    }



    // --------------------
    // Tile
    // --------------------

    .t-publication {


        // extends

        %flex {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
        }


        // main

        position: relative;
        height: calc(var(--windowHeight) * 0.7);
        min-height: 300px;
        border-bottom: 1px solid $white-transparent;


        // image

        ::v-deep .image {

            @extend %flex;
            height: 100%;

            img {
                position: relative;
                object-fit: contain;
            }
        }


        // text

        ::v-deep .text {
            @extend %u-stretch;
            @extend %flex;
            position: absolute;
            display: none;
            text-align: center;
            padding-left: 10%;
            padding-right: 10%;
            background: $black-overlay;
        }


        // modifiers

        &.active ::v-deep .text {
            display: flex;
        }

        @include lg-xl {
            flex-basis: 50%;
        }

        @include sm-md {
            flex-basis: 100%;
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
        <div class="grid">
            <tile-publications
                v-for="item in publications"
                v-bind="item"
                :key="item.id"
                :class="{ active: active === item.id }"
                @click.native="toggle(item.id)"
            />
        </div>
        <div class="line" />
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutHeader from '$layout/header/layout.header'
    import layoutSection from '$layout/layout.section'
    import tilePublications from '$tiles/tile.publication'
    import more from '$mixins/mixin.more'

    function getFilters (ctx) {
        return [
            ctx.$store.getters['filter/publications']
        ]
    }

    function getQuery (filters, query) {
        return $.filters(filters, query)
    }

    function getParams (query) {
        return {
            ...query,
            limit: 20,
            offset: 0
        }
    }

    export default {

        components: {
            layoutHeader,
            layoutSection,
            tilePublications
        },

        mixins: [
            more
        ],

        data () {
            return {
                active: 0
            }
        },

        computed: {

            header () {
                return {
                    mode: 'refine',
                    filters: this.filters,
                    breadcrumbs: [
                        { title: 'Publications' }
                    ]
                }
            },

            loaded () {
                return this.$store.state.api.loaded['publications'];
            },

            publications () {
                return this.$store.getters['api/publications'];
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
                this.$store.commit('cancel', 'publications');
                this.$store.dispatch('request', ['publications', this.params]);
            },

            more () {
                this.$store.dispatch('append', ['publications', this.params]);
            },

            toggle (id) {
                if (this.active === id) this.active = 0;
                else this.active = id;
            }

        },

        watch: {

            queryString () {
                this.update();
            },

            publications: {
                immediate: true,
                handler () {
                    !NODE && this.$nextTick(this.scrollMore);
                }
            }

        },

        async beforeRouteEnter (to, from, next) {
            if ($.dehydrated) this.$store.commit('cancel', 'publications');
            await this.$store.dispatch('request', 'filter/publications');
            const filters = getFilters(this);
            const query = getQuery(filters, to.query);
            const params = getParams(query);
            await this.$store.dispatch('request', ['publications', params]);
            next();
        },

        created () {
            this.params = getParams(this.query);
            this.$on('more', this.more);
        }

    }

</script>
