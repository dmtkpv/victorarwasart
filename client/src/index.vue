<!--
    Styles
-->

<style lang="scss">

    @include md-xl {
        .l-nav     { z-index: 1 }
        .l-header  { z-index: 2 }
        .l-section { z-index: 3 }
        .l-footer  { z-index: 4 }
    }

    @include sm {
        .l-nav     { z-index: 3 }
        .l-header  { z-index: 4 }
        .l-section { z-index: 1 }
        .l-footer  { z-index: 2 }
    }

</style>



<!--
    Template
-->

<template>
    <div id="app">
        <layout-nav />
<!--        <router-view />-->
<!--        <layout-footer v-if="footer" />-->
    </div>
</template>



<!--
    Scripts
-->

<script>

    import layoutNav from '$layout/nav/layout.nav'
    import layoutFooter from '$layout/footer/layout.footer'

    export default {

        components: {
            layoutNav,
            layoutFooter
        },

        

        computed: {

            footer () {
                return this.$route.meta.footer
            }

        }

    }

</script>
