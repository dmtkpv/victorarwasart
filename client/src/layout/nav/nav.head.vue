<!--
    Styles
-->

<style lang="scss">

    .l-nav-head {

        @extend %row;

        .logo svg {
            height: 13px;
        }

        .toggle {
            transform-origin: 100% 50%;
            svg { width: 24px }
            @include md-xl { display: none }
        }

        &.secondary {
            .logo { visibility: hidden }
            .toggle { transform: translate(-50%, 50%) rotate(90deg); }
        }

        @include md-xl {
            &.primary { margin-bottom: 56px; }
            &.secondary { display: none }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-nav-head" :class="type">

        <router-link class="logo" to="/">
            <svg-logo />
        </router-link>

        <a class="toggle" @click="$emit('toggle')">
            <svg-menu />
        </a>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import svgLogo from '$svg/wordmark'
    import svgMenu from '$svg/menu'

    export default {

        components: {
            svgLogo,
            svgMenu
        },

        props: {
            primary: Boolean
        },

        computed: {

            type () {
                return this.primary ? 'primary' : 'secondary'
            }

        }

    }

</script>
