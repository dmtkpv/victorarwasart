<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Head
    // --------------------

    .l-header-head {

        @extend %row;

        .breadcrumbs {

            @extend %u-row;
            color: $red;
            text-transform: uppercase;

            svg {
                width: 12px;
                margin: 0 8px;
                &:last-child { display: none }
            }

        }

        @include md-xl {
            .breadcrumbs { display: none }
            .refine { display: none }
        }


    }



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

        <div class="l-header-head">

            <div class="breadcrumbs">
                <template v-for="item in breadcrumbs">
                    <router-link :to="item.path" v-text="item.name" />
                    <svg-right />
                </template>
            </div>

            <header-sort v-if="sortable" v-show="!menu" />

            <div class="refine" v-if="mode === 'refine'">
                <a v-show="!menu && !activeFilters.length" @click="toggle(true)">Refine</a>
                <a v-show="menu" @click="toggle(false)">Close</a>
            </div>

            <a v-if="mode === 'back'">Close</a>

        </div>


        <!-- filters -->

        <header-filters
            v-model:menu="menu"
            :filters="flatFilters"
            :active="activeFilters"
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
    import headerSort from './header.sort'
    import headerFilters from './header.filters'

    export default {

        components: {
            svgRight,
            layoutFilter,
            headerSort,
            headerFilters
        },

        props: [
            'mode',
            'sortable',
            'breadcrumbs',
            'filters'
        ],

        data () {
            return {
                menu: this.mode === 'menu'
            }
        },

        computed: {

            flatFilters () {
                return this.filters.reduce((result, filter) => {
                    if (Array.isArray(filter)) result = result.concat(filter);
                    else result.push(filter);
                    return result;
                }, []);
            },

            activeFilters () {
                return this.flatFilters.reduce((result, filter) => {
                    if (filter.mode !== 'params') return result;
                    let active = this.$route.query[filter.options.param] || [];
                    if (!Array.isArray(active)) active = [active];
                    active = active.filter(name => filter.items.find(item => item.name === name));
                    return result.concat(active);
                }, []);
            }

        },

        methods: {

            toggle (value = !this.menu) {
                this.menu = value;
            }

        }

    }

</script>
