<!--
    Styles
-->

<style lang="scss" scoped>

    .l-header {
        @include md-xl {
            display: none;
        }
    }


    .grid {
        @extend %line;
        display: flex;
        flex-wrap: wrap;
        &:before { margin-left: 0 }

        @include md-xl {
            padding-left: $column-width;
        }

    }

    .t-publication {

        height: calc(var(--windowHeight) * 0.7);
        min-height: 300px;
        padding: 10%;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        @include lg-xl {
            flex-basis: 50%;
        }


        ::v-deep .text {

            @extend %u-stretch;
            position: absolute;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            text-align: center;
            background: $black-overlay;

            /*display: none;*/
        }

    }


    /*
    .l-section {

        display: flex;
        flex-wrap: wrap;

        @extend %line;
        &:before { margin-left: 0 }





    }

    .line {
        @extend %line;
        &:before {
            margin-left: 0;
            right: calc((100% - #{$column-width}) / 2);
        }
        @include md {
            display: none;
        }

    }

    .t-publication {

        height: 70vh;
        border-bottom: 1px solid $white-transparent;



    }
    */

    /*
       .image, .text {
           @extend %u-stretch;
           padding: 10%;
       }

       .image img {
           object-fit: contain;
           width: 100%;
           height: 100%;
       }



       .text {
           position: absolute;
           display: flex;
           flex-flow: column nowrap;
           justify-content: center;
           text-align: center;
           background: $black-overlay;
           a { display: inline-block }
       }


        */


</style>



<!--
    Template
-->

<template>
    <layout-section>
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

    function getFilters (ctx) {
        return [
            ctx.$store.getters['filter/publications']
        ]
    }

    function getParams (filters, query) {
        return {
            ...$.filters(filters, query),
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

        data () {
            return {
                grid: {
                    xl: 2,
                    lg: 2,
                    md: 1
                },
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

            filters () {
                return getFilters(this);
            },

            publications () {
                return this.$store.getters['api/publications'];
            }

        },

        methods: {

            update () {
                this.params = getParams(this.filters, this.$route.query);
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

            $route () {
                this.update();
            }

        },

        async beforeRouteEnter (to, from, next) {
            if ($.dehydrated) this.$store.commit('cancel', 'publications');
            await this.$store.dispatch('request', 'filter/publications');
            const filters = getFilters(this);
            const params = getParams(filters, to.query)
            await this.$store.dispatch('request', ['publications', params]);
            next();
        },

        created () {
            this.params = getParams(this.filters, this.$route.query);
        }

    }

</script>
