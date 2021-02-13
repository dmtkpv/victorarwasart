<!--
    Styles
-->

<style lang="scss" scoped>



    // --------------------
    // Filters
    // --------------------

    ::v-deep .filter-wrapper {
        @include md {
            left: $column-width;
            padding: $indent-y $indent-x;
            @include column;
            &:before { @include line };
        }
    }

    ::v-deep .filter-nested {
        @include lg-xl {
            padding: $indent-y $indent-x;
            @include column;
            &:before { @include line };
            &:nth-child(1) { left: $column-width }
            &:nth-child(2) { left: calc(#{$column-width} * 2) }
        }
        @include md {
            &:not(:first-child) {
                margin-top: 64px;
            }
        }
    }

    ::v-deep .filter-direct {
        @extend %col;
        @extend %line;
        @include lg-xl { left: calc(#{$column-width} * 3) }
        @include md { left: calc(#{$column-width} * 2) }
        @include md-xl { padding: $indent-y $indent-x }
    }



    // --------------------
    // Notes
    // --------------------

    .notes {
        @extend %col;
        @extend %line;
        @extend %padding;
        left: calc(#{$column-width} * 4);
        text-transform: uppercase;
        @include sm-lg { display: none }
    }

</style>



<!--
    Template
-->

<template>
    <layout-section>
        <layout-header v-bind="header" />
        <div class="notes">Notes</div>
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import layoutHeader from '$layout/header/layout.header'
    import layoutSection from '$layout/layout.section'

    export default {

        components: {
            layoutHeader,
            layoutSection
        },

        data () {
            return {

            }
        },

        computed: {

            header () {
                return {
                    mode: 'menu',
                    filters: [
                        [
                            this.$store.getters['filter/essays'],
                            this.$store.getters['filter/poems']
                        ],
                        this.$store.getters['filter/biographies']
                    ],
                    breadcrumbs: [
                        { title: 'Writings', path: '/writings' }
                    ]
                }
            }

        },

        beforeRouteEnter (to, from, next) {
            Promise.all([
                this.$store.dispatch('request', 'filter/artists'),
                this.$store.dispatch('request', 'essays'),
                this.$store.dispatch('request', 'poems')
            ]).then(next);
        },

    }

</script>
