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

            @extend %u-row;

            .title {
                @extend %row;
                text-transform: uppercase;
            }
            .total { display: none; }
            .clear { display: none; }

            &:hover {
                @extend %link-active;
            }

            @include sm {
                display: block;
            }

        }



        // --------------------
        // Modifiers
        // --------------------

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
    <div class="l-nav-item" :class="{ active, filtered }">

        <div class="l-nav-link">
            <router-link class="title" :to="path">{{ title }}</router-link>
            <p class="total">{{ total }}</p>
            <a class="clear" @click="clear">Clear</a>
        </div>

        <ui-accordion v-show="active">
            <layout-filter v-for="filter in filters" v-bind="filter" :key="filter.id" />
        </ui-accordion>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutFilter from '$layout/filter/layout.filter'
    import uiAccordion from '$ui/accordion'

    export default {

        components: {
            layoutFilter,
            uiAccordion
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
            },

            active () {
                return this.$route.path.startsWith(this.path)
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
