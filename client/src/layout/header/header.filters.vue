<!--
    Styles
-->

<style lang="scss">

    .l-header-filters {

        @extend %row;

        .list {
            flex: 1;
            white-space: nowrap;
            overflow-x: scroll;
            padding-right: $indent-x;
            &::-webkit-scrollbar { display: none }
        }

        .cut {

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

        @include md-xl {
            display: none;
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-header-filters" v-show="active.length">
        <div class="list" ref="list">{{ list }}</div>
        <div class="cut" v-show="cut">&nbsp;</div>
        <a v-show="!menu" @click="toggle(true)">Refine</a>
        <a v-show="menu && !apply" @click="clear()">Clear</a>
        <a v-show="menu && apply" @click="toggle(false)">APPLY</a>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'menu',
            'filters',
            'active'
        ],

        data () {
            return {
                apply: false,
                cut: false
            }
        },

        computed: {

            list () {
                return this.active.join(' + ');
            }

        },

        watch: {

            active () {
                if (this.menu) this.apply = true;
                this.$nextTick(this.setCut);

            },

            menu () {
                if (!this.menu) this.apply = false;
            }

        },

        methods: {

            setCut () {
                this.cut = this.$refs.list.offsetWidth < this.$refs.list.scrollWidth;
            },

            toggle (value) {
                this.$emit('update:menu', value);
            },

            clear () {
                this.$router.push({ query: {
                    ...this.$route.query,
                    ...this.filters.reduce((query, filter) => {
                        if (filter.mode === 'params') query[filter.options.param] = [];
                        return query;
                    }, {})
                }});
            }

        },

        mounted () {
            this.setCut();
            window.addEventListener('resize', this.setCut);
        },

        unmounted () {
            window.removeEventListener('resize', this.setCut);
        }

    }

</script>
