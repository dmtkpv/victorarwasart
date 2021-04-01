<!--
    Styles
-->

<style lang="scss">
    .l-filter-head {

        @extend %row;
        svg { width: 12px }

        .toggle {
            @extend %u-row;
            flex: 1;
        }

        .title {
            flex: 1;
            text-transform: uppercase;
        }

        .total {
            display: none
        }

        .close {
            display: none;
            width: 12px;
        }

        @include md-xl {
            .toggle { pointer-events: none }
            margin-bottom: calc(#{$indent-y} * 2);
        }

        @include sm {
            padding-top: 60px;
            .title { font-size: 30px }
            &:not(.opened) .total { display: block }
            &.opened .close { display: block }
        }

    }
</style>



<!--
    Template
-->

<template>
    <div class="l-filter-head" v-if="head" :class="{ opened }">
        <a class="toggle" @click="toggle()">
            <p class="title">{{ head.title }}</p>
            <p class="total">{{ head.total }}</p>
            <svg-down class="close" />
        </a>
        <slot />
    </div>
</template>



<!--
    Scripts
-->

<script>

    import svgDown from '$svg/down'

    export default {

        components: {
            svgDown
        },

        props: [
            'head'
        ],

        data () {
            return {
                opened: false
            }
        },

        methods: {

            toggle (value = !this.opened) {
                this.opened = value;
                this.$emit('opened', this.opened)
            }

        }


    }

</script>
