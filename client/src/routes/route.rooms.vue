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
        &:before { margin-left: 0 }

        @include md-xl {
            padding-left: $column-width;
        }

    }



    // --------------------
    // Tile
    // --------------------

    .t-room {

        margin-bottom: 120px;

        ::v-deep .image {
            padding-top: 0 !important;
            height: calc(var(--windowHeight) * 0.4);
            min-height: 300px;
            img { object-fit: cover }
        }

        @include lg-xl {
            flex-basis: 50%;
        }

        @include sm-md {
            flex-basis: 100%;
        }

        @include sm {
            padding: 0;
            ::v-deep .text {
                padding-left: $indent-x;
                padding-right: $indent-x;
            }
        }

    }



</style>



<!--
    Template
-->

<template>
    <layout-section>
        <layout-header v-bind="header" />
        <div class="grid">
            <tile-room
                v-for="item in rooms"
                v-bind="item"
                :key="item.id"
            />
        </div>
        <div class="line" />
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import layoutHeader from '$layout/header/layout.header'
    import layoutSection from '$layout/layout.section'
    import tileRoom from '$tiles/tile.room'

    export default {

        components: {
            layoutHeader,
            layoutSection,
            tileRoom
        },

        data () {
            return {
            }
        },

        computed: {

            header () {
                return {
                    mode: 'none',
                    filters: [],
                    breadcrumbs: [
                        { title: 'Viewing room' }
                    ]
                }
            },

            rooms () {
                return this.$store.getters['api/rooms'];
            }

        },

        async beforeRouteEnter (to, from, next) {
            await this.$store.dispatch('request', 'rooms');
            next();
        }

    }

</script>
