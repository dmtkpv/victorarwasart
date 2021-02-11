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

    .l-section {

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
    <div>
        <layout-header v-if="header" v-bind="header" />
        <layout-section>
            <layout-grid :grid="grid" @more="more">
                <tile-artwork v-for="item in artworks" v-bind="item" :key="item.id" />
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
    import tileArtwork from '$tiles/artwork'

    function getParams (route) {
        return Object.assign({ limit: 50, offset: 0 }, route.query)
    }

    export default {

        components: {
            layoutHeader,
            layoutSection,
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
                return this.$store.getters['layout/artworks/header'];
            },

            artworks () {
                return this.$store.state.api.response['artworks'];
            }

        },

        methods: {

            update () {
                this.params = getParams(this.$route);
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

        beforeRouteEnter (to, from, next) {
            if (this.artworks) this.$store.commit('cancel', 'artworks');
            if (!NODE) this.artworks = true;
            Promise.all([
                this.$store.dispatch('request', 'filter/movements'),
                this.$store.dispatch('request', 'filter/types'),
                this.$store.dispatch('request', 'filter/artists'),
                this.$store.dispatch('request', ['artworks', getParams(to)])
            ]).then(next);
        },

        _beforeRouteEnter (to, from, next) {
            if (this.artworks) this.$store.commit('cancel', 'artworks');
            if (!NODE) this.artworks = true;
            Promise.all([
                this.$store.dispatch('filter/movements'),
                this.$store.dispatch('filter/types'),
                this.$store.dispatch('filter/artists'),
                this.$store.dispatch('artworks', getParams(to))
            ]).then(next);
        },

        created () {
            this.params = getParams(this.$route);
        }

    }

</script>
