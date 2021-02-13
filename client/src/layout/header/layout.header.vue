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
                bottom: 0;
                display: flex;
                flex-flow: column nowrap;
                .l-header-menu { display: block }
            }

        }
    }



</style>



<!--
    Template
-->

<template>
    <header class="l-header" :class="{ opened: menu }">


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

    import { fix } from '$services/mixins'
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
            fix({
                minTop () {
                    return -this.height('$header')
                },
                maxTop () {
                    return this.height('$nav')
                }
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
            }

        },

        methods: {

            toggle (value = !this.menu) {
                this.menu = value;
            }

        }

    }

</script>
