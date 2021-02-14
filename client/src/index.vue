<!--
    Styles
-->

<style lang="scss">
    #app {

        @include md-xl {
            .l-nav     { z-index: 1 }
            .l-header  { z-index: 2 }
            .l-section { z-index: 3 }
            .l-footer  { z-index: 4 }
            .l-modal   { z-index: 5 }
        }

        @include sm {
            .l-nav     { z-index: 4 }
            .l-header  { z-index: 3 }
            .l-section { z-index: 1 }
            .l-footer  { z-index: 2 }
            .l-modal   { z-index: 5 }
        }

    }
</style>



<!--
    Template
-->

<template>
    <div id="app">
        <layout-nav :class="meta.nav" />
        <router-view />
        <layout-modal />
        <layout-footer v-if="meta.footer" />
    </div>
</template>



<!--
    Scripts
-->

<script>

    import layoutNav from '$layout/nav/layout.nav'
    import layoutFooter from '$layout/layout.footer'
    import layoutModal from '$layout/modal/layout.modal'

    export default {

        components: {
            layoutNav,
            layoutFooter,
            layoutModal
        },

        computed: {

            meta () {
                return this.$route.meta
            }

        }

    }

</script>
