<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Head
    // --------------------

    .l-header {

        background: $black;

        @include sm {

            position: absolute;
            top: 60px;
            width: 100%;

            .l-header-menu {
                display: none;
                flex: 1;
                overflow: auto;
            }

            &.opened {
                height: calc(var(--windowHeight) - 60px);
                display: flex;
                flex-flow: column nowrap;
                .l-header-menu { display: block }
            }

            & + * { padding-top: 60px; }
            &.filtered + * { padding-top: 120px; }

        }
    }



</style>



<!--
    Template
-->

<template>
    <header class="l-header" :class="{ opened: menu, filtered }">


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
            v-if="filtered"
            :filters="filtersFlat"
            :menu.sync="menu"
        />


        <!-- menu -->

        <div class="l-header-menu">
            <template v-for="item in filters">
                <div v-if="item.length" class="filter-wrapper">
                    <layout-filter class="filter-nested" v-for="filter in item" v-bind="filter" :key="filter.id" />
                </div>
                <layout-filter class="filter-direct" v-else v-bind="item" />
            </template>
        </div>


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
    import layoutFilter from '$layout/filter/layout.filter'
    import headerHead from './header.head'
    import headerSort from './header.sort'
    import headerFilters from './header.filters'

    export default {

        components: {
            svgRight,
            layoutFilter,
            headerHead,
            headerSort,
            headerFilters
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
                menu: this.mode === 'menu'
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
