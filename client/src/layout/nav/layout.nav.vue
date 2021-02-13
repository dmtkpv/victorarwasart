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
        background: $black;

        @include sm {
            position: absolute;
            top: 0;
            width: 100%;
        }

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

        <nav-head primary @toggle="toggle(true)" />

        <div class="l-nav-menu" v-show="opened">
            <nav-head @toggle="toggle(false)" />
            <nav-item v-for="(link, i) in nav" v-bind="link" :key="i" />
            <nav-search />
        </div>

    </nav>
</template>



<!--
    Scripts
-->

<script>

    import { fix } from '$services/mixins'
    import navHead from './nav.head'
    import navItem from './nav.item'
    import navSearch from './nav.search'

    export default {

        components: {
            navHead,
            navItem,
            navSearch
        },

        mixins: [
            fix({
                minTop () {
                    return -this.height('$nav') - this.height('$header')
                },
                maxTop () {
                    return 0
                }
            })
        ],

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
                // nav -> true
            }

        },

        watch: {

            '$route.path' () {
                this.opened = false;
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
