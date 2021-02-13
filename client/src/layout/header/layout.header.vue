<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Head
    // --------------------




    // --------------------
    // Menu
    // --------------------

    .l-header-menu {

        @include sm {
            &:not(.active) { display: none }
        }

    }

</style>



<!--
    Template
-->

<template>
    <header class="l-header">


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
            :filters="filtersFlat"
            :menu.sync="menu"
        />


        <!-- menu -->

        <div class="l-header-menu" :class="{ active: menu }">
            <template v-for="item in filters">
                <div v-if="item.length" class="filter-wrapper">
                    <layout-filter class="filter-nested" v-for="(filter, i) in item" v-bind="filter" :key="i" />
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
            }

        },

        methods: {

            toggle (value = !this.menu) {
                this.menu = value;
            }

        }

    }

</script>
