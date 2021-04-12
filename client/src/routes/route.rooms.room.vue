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
    // Column
    // --------------------

    .column {

        @extend %col;
        @extend %line;
        left: $column-width;
        &:before { margin-left: 0 }

        .note {
            @extend %padding;
            white-space: pre-line;
        }

        .toggle {
            @extend %u-row;
            @extend %padding;
            justify-content: flex-start;
            text-transform: uppercase;
            span:last-child { color: $red }
            @include sm { display: none }
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

</style>



<!--
    Template
-->

<template>
    <layout-section>
        <layout-header v-bind="header" />
        <div class="column">
            <div class="toggle">
                <a @click="gallery">Gallery view</a>
                <span>&nbsp;/&nbsp;</span>
                <span>Thumbnail view</span>
            </div>
            <div class="note">{{ room.note }}</div>
        </div>
        <layout-masonry :grid="grid">
            <tile-artwork v-for="item in artworks" v-if="item" v-bind="item" :key="item.id" @click="modal" />
        </layout-masonry>
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutHeader from '$layout/header/layout.header'
    import layoutSection from '$layout/layout.section'
    import layoutMasonry from '$layout/layout.masonry'
    import tileArtwork from '$tiles/tile.artwork'

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
                }
            }
        },

        computed: {

            header () {
                return {
                    mode: 'back',
                    filters: [],
                    breadcrumbs: [
                        { title: 'Viewing room', path: '/viewing-room' },
                        { title: this.room.title }
                    ]
                }
            },

            room () {
                return this.$store.getters['api/rooms/item'];
            },

            artworks () {
                if (!this.room.gallery) return [];
                return this.room.gallery
                    .map(screen => screen.screens_id.artworks)
                    .flat()
                    .filter(artwork => artwork)
                    .map(artwork => artwork.artworks_id);

            }

        },

        methods: {

            gallery () {
                this.$router.push({ params: { ...this.$route.params, thumbnails: undefined } });
            },

            modal (id) {
                this.$store.commit('storage/set', ['artwork', {
                    list: () => this.artworks
                }]);
                this.$router.push({ query: { ...this.$route.query, modal_artwork: id } })
            },

        },

        watch: {

            '$route.params.id' (id) {
                this.$store.commit('cancel', 'rooms/item');
                this.$store.dispatch('request', ['rooms/item', id])
            }

        },

        async beforeRouteEnter (to, from, next) {
            if ($.dehydrated) this.$store.commit('cancel', 'rooms/item');
            await this.$store.dispatch('request', ['rooms/item', to.params.id]);
            next();
        }

    }

</script>
