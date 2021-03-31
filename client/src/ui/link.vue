<!--
    Styles
-->

<style lang="scss">
    .ui-link {

        svg {
            width: 12px;
            height: 12px;
            margin-left: 2px;
            display: inline-block;
            vertical-align: middle;
        }

        &.disabled {
            pointer-events: none;
            svg { display: none }
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
    <a class="ui-link" :href="href" target="_blank" :class="{ disabled: !href }">
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
