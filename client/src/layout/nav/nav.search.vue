<!--
    Styles
-->

<style lang="scss">

    .l-nav-search {

        form {

            @extend %row;
            position: relative;

            input[type=text] {
                padding-right: $indent-x;
                transition: opacity .3s ease;
            }

            input[type=submit] {
                position: relative;
                right: 0;
                text-transform: uppercase;
                transition: right .3s ease, transform .3s ease;
            }

            &.disabled input[type=text] {
                opacity: 0;
                pointer-events: none;
            }

            &.disabled input[type=submit] {
                right: 100%;
                transform: translateX(100%);
            }

            @include md-xl {
                input[type=submit]:hover  { color: $red }
                &:not(.disabled) { color: $red }
            }

        }

        .result {
            @extend %u-row;
            color: $red;
            text-transform: uppercase;
            justify-content: space-between;
            svg { width: 12px }
        }

        .l-filter {
            .total { opacity: 1 }
        }

        @include md-xl {
            &.routed form { display: none }
            &:not(.routed) .result { display: none }
            &:not(.routed) .l-filter { display: none }
        }

        @include sm {
            .result { display: none }
            .l-filter { display: none }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-nav-search" :class="{ routed }">

        <form :class="{ disabled: !active }" @submit.prevent="start">
            <input type="text" v-model="text" ref="input" @blur="toggle(false)" @focus="toggle(true)">
            <input type="submit" value="Search" @mousedown.prevent>
        </form>

        <div class="result">
            <p>Search results:</p>
            <a @click="end"><svg-close /></a>
        </div>

        <layout-filter v-bind="filter" />

    </div>
</template>



<!--
    Scripts
-->

<script>

    import svgClose from '$svg/close'
    import layoutFilter from '$layout/filter/layout.filter'

    export default {

        components: {
            svgClose,
            layoutFilter
        },

        data () {
            return {
                active: false,
                text: '',
                back: '/'
            }
        },

        computed: {

            routed () {
                return this.$route.path === '/search';
            },

            filter () {
                return this.$store.getters['filter/search']
            }

        },

        methods: {

            toggle (value) {
                this.active = value;
            },

            start () {
                if (!this.active) return this.$refs.input.focus();
                if (!this.text) return;
                this.back = this.$route.fullPath;
                this.$router.push(`/search?text=${this.text}`);
            },

            end () {
                this.$router.push(this.back);
            }

        }

    }

</script>
