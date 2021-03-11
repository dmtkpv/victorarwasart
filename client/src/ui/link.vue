<!--
    Styles
-->

<style lang="scss">
    .ui-link {

        @extend %u-row;
        justify-content: flex-start;

        svg {
            width: 12px;
            margin-left: 8px;
            flex-shrink: 0;
        }

        @include md-xl {
            &:not(:hover) svg { opacity: 0 }
        }

    }
</style>



<!--
    Template
-->

<template>
    <a class="ui-link" :href="href" target="_blank">
        <slot />
        <svg-open />
    </a>
</template>



<!--
    Scripts
-->

<script>

    import svgOpen from '$svg/open'

    export default {

        props: [
            'href'
        ],

        components: {
            svgOpen
        }

    }

</script>
