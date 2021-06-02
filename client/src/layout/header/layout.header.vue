<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Head
    // --------------------

    .l-header {

        @include sm {

            position: absolute;
            top: 60px;
            width: 100%;

            .l-header-head,
            .l-header-filters {
                position: relative;
                z-index: 1;
            }

            .l-header-menu {
                position: fixed;
                top: 120px;
                left: 0;
                bottom: 0;
                width: 100%;
                padding-bottom: 60px;
                overflow: auto;
                background: $black;
                visibility: hidden;
                transform: translateY(-100%);
                transition: transform .3s, visibility .3s 0s;
            }

            &.filtered {
                .l-header-menu { top: 180px }
            }

            &.opened {
                .l-header-menu {
                    visibility: visible;
                    transform: translateY(0);
                    transition: transform .3s, visibility 0s;
                }
            }

            & + * { padding-top: 60px; }
            &.filtered + * { padding-top: 120px; }

        }
    }

    .data-server-rendered .l-header-menu { transition: none !important }



</style>



<!--
    Template
-->

<template>
    <header class="l-header" :class="{ opened: menu || mode === 'menu', filtered }">


        <!-- head -->

        <header-head
            :mode="mode"
            :sort="sort"
            :breadcrumbs="breadcrumbs"
            :filters="filtersFlat"
            :menu.sync="menu"
        />


        <!-- filters -->

        <header-filters
            v-show="filtered"
            :filters="filtersFlat"
            :menu.sync="menu"
        />


        <!-- menu -->

        <header-menu :filters="filters" />


    </header>
</template>



<!--
    Scripts
-->

<script>


    import $ from '$services/utils'
    import fix from '$mixins/mixin.fix'
    import scrollSet from '$mixins/mixin.scroll.set'
    import svgRight from '$svg/right'
    import headerHead from './header.head'
    import headerFilters from './header.filters'
    import headerMenu from './header.menu'

    export default {

        components: {
            svgRight,
            headerHead,
            headerFilters,
            headerMenu
        },

        mixins: [
            scrollSet('header', 'menu'),
            fix({
                minTop () { return -this.getHeight('$header') },
                maxTop () { return this.getHeight('$nav') }
            })
        ],

        props: [
            'mode',
            'sort',
            'breadcrumbs',
            'filters'
        ],

        data () {
            return {
                menu: false
            }
        },

        computed: {

            filtersFlat () {
                return this.filters.flat();
            },

            filtered () {
                return Object.values($.filters(this.filtersFlat, this.$route.query)).flat().length;
            }

        },

        watch: {

            menu () {
                this.fixNormalize();
            }

        },

        methods: {

            toggle (value = !this.menu) {
                this.menu = value;
            }

        }

    }

</script>
