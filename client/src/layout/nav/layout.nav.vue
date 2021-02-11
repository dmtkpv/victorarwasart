<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Nav
    // --------------------

    .l-nav {
        @extend %col;
        @include md-xl { padding: $indent-y $indent-x; }
    }



    // --------------------
    // Menu
    // --------------------

    .l-nav-menu {

        @include md-xl {
            display: block !important;
        }

        @include sm {
            @include stretch;
            position: fixed;
            background: $black;
        }

    }


</style>



<!--
    Template
-->

<template>
    <nav class="l-nav">

        <layout-nav-head primary @toggle="toggle(true)" />

        <div class="l-nav-menu" v-show="opened">
            <layout-nav-head @toggle="toggle(false)" />
            <layout-nav-item v-for="(link, i) in nav" v-bind="link" :key="i" />
            <layout-nav-search />
        </div>

    </nav>
</template>



<!--
    Scripts
-->

<script>

    import layoutNavHead from './nav.head'
    import layoutNavItem from './nav.item'
    import layoutNavSearch from './nav.search'

    export default {

        components: {
            layoutNavHead,
            layoutNavItem,
            layoutNavSearch
        },

        data () {
            return {
                opened: false
            }
        },

        computed: {

            nav () {
                return this.$store.getters['layout/nav']
            }

        },

        methods: {

            toggle (value) {
                this.opened = value;
            }

        },

        async serverPrefetch () {
            return Promise.all([
                this.$store.dispatch('request', 'count'),
                this.$store.dispatch('request', 'filter/movements'),
                this.$store.dispatch('request', 'filter/types'),
                this.$store.dispatch('request', 'filter/publications')
            ])
        }

    }

</script>
