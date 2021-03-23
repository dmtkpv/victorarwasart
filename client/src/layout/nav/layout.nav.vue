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

        @include sm {

            position: absolute;
            top: 0;
            width: 100%;

            &:not(.transparent) { background: $black; }
            &:not(.transparent) + * { padding-top: 60px; }
            &.transparent .l-nav-head.primary { border-bottom: none }

        }


    }



    // --------------------
    // Menu
    // --------------------

    .l-nav-menu {

        @include sm {
            @include stretch;
            position: fixed;
            display: flex;
            flex-flow: column nowrap;
            background: $black;
            transform: translateX(100%);
            transition: transform .4s ease-in-out;
            &.opened { transform: translateX(0) }

            .l-nav-items {
                flex: 1;
                overflow: auto;
                transition: transform .3s;
                &.searching { transform: translateY(-360px) }
            }

        }

        .l-nav-head {
            position: relative;
            background: $black;
            z-index: 1;
        }




    }

    .data-server-rendered .l-nav-menu { transition: none !important }


</style>



<!--
    Template
-->

<template>
    <nav class="l-nav">

        <nav-head primary @toggle="toggle(true)" />

        <div class="l-nav-menu" :class="{ opened }">
            <nav-head @toggle="toggle(false)" />
            <div class="l-nav-items" :class="{ searching }">
                <nav-item v-for="(link, i) in nav" v-bind="link" :key="i" @click.native="toggle(false)" />
                <nav-search @focus="searching = $event" />
            </div>
        </div>

    </nav>
</template>



<!--
    Scripts
-->

<script>

    import fix from '$mixins/mixin.fix'
    import scrollSet from '$mixins/mixin.scroll.set'
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
            scrollSet('nav', 'opened'),
            fix({
                minTop () { return -this.getHeight('$nav') - this.getHeight('$header') },
                maxTop () { return 0 }
            })
        ],

        data () {
            return {
                opened: false,
                searching: false
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

        watch: {

            '$route.path' () {
                this.opened = false;
            },

            opened () {
                this.fixNormalize();
            }

        },

        serverPrefetch () {
            return Promise.all([
                this.$store.dispatch('request', 'count'),
                this.$store.dispatch('request', 'filter/movements'),
                this.$store.dispatch('request', 'filter/types'),
                this.$store.dispatch('request', 'filter/publications')
            ])
        }

    }

</script>
