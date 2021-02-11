<!--
    Styles
-->

<style lang="scss">

    %link-active {
        @include md-xl {
            color: $red;
            .total { display: block; }
        }
    }

    .l-nav-link {
        @extend %row;
        text-transform: uppercase;
        .total { display: none; }
        &:hover { @extend %link-active }
    }

    .l-nav-item {

        .l-filter-head {
            margin-top: 42px;
        }
        .l-filter:last-child {
            margin-bottom: 118px;
        }
        &:not(.active) {
            .l-filter { display: none }
        }
        &.active {
            .l-nav-link { @extend %link-active }
        }
        @include  sm {
            .l-filter { display: none }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-nav-item" :class="{ active: $route.path === path }">

        <router-link class="l-nav-link" :to="path">
            <p class="title">{{ title }}</p>
            <p class="total">{{ total }}</p>
        </router-link>

        <layout-filter v-for="(filter, i) in filters" v-bind="filter" :key="i" />

    </div>
</template>



<!--
    Scripts
-->

<script>

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
        ]

    }

</script>
