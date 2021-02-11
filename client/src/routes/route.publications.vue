<!--
    Styles
-->

<style lang="scss" scoped>

    .l-header {
        @include md-xl {
            display: none;
        }
    }

    .l-section {

        display: flex;
        flex-wrap: wrap;

        @extend %line;
        &:before { margin-left: 0 }



        @include md-xl {
            padding-left: $column-width;
        }

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

</style>



<!--
    Template
-->

<template>
    <div>
        <layout-header v-bind="header" />
        <layout-section>
            <layout-grid :grid="grid" @more="more">
                <tile-publication v-for="item in publications" v-bind="item" />
            </layout-grid>
        </layout-section>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import layoutHeader from '$layout/header'
    import layoutSection from '$layout/section'
    import layoutGrid from '$layout/grid'
    import tilePublication from '$tiles/publication'

    function getParams (route) {
        return Object.assign({ limit: 50, offset: 0 }, route.query)
    }

    export default {

        components: {
            layoutHeader,
            layoutSection,
            layoutGrid,
            tilePublication
        },

        data () {
            return {
                grid: {
                    xl: 2,
                    lg: 2,
                    md: 1
                },
            }
        },

        computed: {

            header () {
                return this.$store.getters['layout/publications/header']
            },

            publications () {
                return this.$store.state.api.response['publications'];
            }

        },

        methods: {

            update () {
                this.params = getParams(this.$route);
                this.$store.commit('cancel', 'publications');
                this.$store.dispatch('request', ['publications', this.params]);
            },

            more () {
                this.$store.dispatch('append', ['publications', this.params]);
            }

        },

        watch: {

            $route () {
                this.update();
            }

        },

        beforeRouteEnter (to, from, next) {
            if (this.publications) this.$store.commit('cancel', 'publications');
            if (!NODE) this.publications = true;
            Promise.all([
                this.$store.dispatch('request', 'filter/publications'),
                this.$store.dispatch('request', ['publications', getParams(to)])
            ]).then(next);
        },

        created () {
            this.params = getParams(this.$route);
        }

    }

</script>
