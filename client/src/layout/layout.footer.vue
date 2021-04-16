<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Footer
    // --------------------

    .l-footer {


        // common

        position: relative;
        display: grid;
        background: $cream;
        color: $black;


        // height

        @include md-xl {
            height: 438px;
            padding-bottom: $indent-y;
        }

        @include sm {
            height: var(--windowHeight);
            min-height: 600px;
        }


        // template

        @include xl {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        @include lg {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        @include md {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr auto;
            .l-footer-item:nth-child(1) { grid-row: 1 / 3; }
            .l-footer-item:nth-child(3) { grid-row: 1 / 3; }
        }
        @include sm {
            grid-template-rows: 1fr 3fr 1fr auto;
        }

    }



    // --------------------
    // Item
    // --------------------

    .l-footer-item {


        // common

        @extend %padding-hor;
        display: flex;
        flex-flow: column nowrap;


        // response

        @include md-xl {
            justify-content: flex-end;
            border-left: 1px solid $black-transparent;
        }

        @include sm {
            justify-content: flex-start;
            border-top: 1px solid $black-transparent;
            padding-top: $indent-y;
            padding-bottom: $indent-y;
        }


        // items

        &:nth-child(1) {
            border: none;
            svg { width: 70px }
        }

        &:nth-child(2) {
            @include sm-lg {  display: none }
        }

        &:nth-child(4) {
            @include sm { justify-content: flex-end }
        }


    }

</style>



<!--
    Template
-->

<template>
    <footer class="l-footer">

        <div class="l-footer-item">
            <svg-logo />
        </div>

        <div class="l-footer-item"></div>

        <div class="l-footer-item">
            <ui-link v-for="item in contacts" :key="item.id" :href="item.link">{{ item.title }}</ui-link>
        </div>

        <div class="l-footer-item">
            © Victor Arwas Gallery
        </div>

        <div class="l-footer-item">
            <ui-link href="https://www.gymnasiumdesignoffice.com">Site by Gymnasium</ui-link>
        </div>

    </footer>
</template>



<!--
    Scripts
-->

<script>

    import uiLink from '$ui/link'
    import svgLogo from '$svg/logo'

    export default {

        components: {
            uiLink,
            svgLogo
        },

        computed: {

            contacts () {
                return this.$store.getters['api/contacts'];
            }

        }

    }

</script>
