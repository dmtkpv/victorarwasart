<!--
    Styles
-->

<style lang="scss">
    .l-nav-item {



        // --------------------
        // Helpers
        // --------------------

        %link-active {
            @include md-xl {
                color: $red;
                .total { display: block; }
            }
        }



        // --------------------
        // Filter
        // --------------------

        .l-filter {

            .l-filter-head {
                margin-top: 42px;
                .clear { display: none }
                &.filtered { color: $white; }
            }

            &:last-child {
                margin-bottom: 118px;
            }

        }



        // --------------------
        // Link
        // --------------------

        .l-nav-link {
            @extend %row;
            .title { text-transform: uppercase; }
            .total { display: none; }
            .clear { display: none; }
            &:hover { @extend %link-active }
        }



        // --------------------
        // Modifiers
        // --------------------

        &:not(.active) {
            .l-filter { display: none }
        }
        &.active {
            .l-nav-link { @extend %link-active }
        }
        @include md-xl {
            &.active.filtered {
                .l-nav-link .total { display: none };
                .l-nav-link .clear { display: block };
            }
        }
        @include sm {
            .l-filter { display: none }
        }



    }
</style>



<!--
    Template
-->

<template>
    <div class="l-nav-item" :class="{ active: $route.path === path, filtered }">

        <div class="l-nav-link">
            <router-link :to="path" class="title">{{ title }}</router-link>
            <p class="total">{{ total }}</p>
            <a class="clear" @click="clear">Clear</a>
        </div>

        <layout-filter v-for="filter in filters" v-bind="filter" :key="filter.id" />

    </div>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutFilter from '$layout/filter/layout.filter'

    export default {

        components: {
            layoutFilter
        },

        props: [
            'path',
            'title',
            'total',
            'filters'
        ],

        computed: {

            filtered () {
                return Object.values($.filters(this.filters, this.$route.query)).flat().length;
            }

        },

        methods: {

            clear () {
                const query = { ...this.$route.query };
                this.filters.forEach(config => delete query[config.id]);
                this.$router.push({ query });
            }

        }

    }

</script>
