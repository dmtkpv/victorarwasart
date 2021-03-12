<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Main
    // --------------------

    .ui-cut {
        @extend %u-row;
        overflow: hidden;
    }



    // --------------------
    // Content
    // --------------------

    .ui-cut-content {

        @extend %u-row;
        flex: 1;
        white-space: nowrap;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        &:after {
            content: '\00a0';
            flex-basis: $indent-x;
            flex-shrink: 0;
        }
    }



    // --------------------
    // Slash
    // --------------------

    .ui-cut-slash {

        position: relative;
        background: $black;
        width: $indent-x;

        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: -2px;
            width: 100%;
            height: calc(100% + 4px);
            transform-origin: 0 0;
            transform: skew(-20deg);
            background: $black;
            border-left: 1px solid $white-transparent;
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="ui-cut">
        <div class="ui-cut-content" ref="content"><slot /></div>
        <div class="ui-cut-slash" v-show="cut">&nbsp;</div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        data () {
            return {
                cut: false
            }
        },

        methods: {

            setCut () {
                this.cut = this.$refs.content.offsetWidth < this.$refs.content.scrollWidth;
            }

        },

        mounted () {
            this.setCut();
            window.addEventListener('resize', this.setCut);
        },

        destroyed () {
            window.removeEventListener('resize', this.setCut);
        }

    }

</script>
