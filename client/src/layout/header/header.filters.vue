<!--
    Styles
-->

<style lang="scss">
    .l-header-filters {

        @extend %row;



        // --------------------
        // Heading
        // --------------------

        .heading {
            flex: 1;
            white-space: nowrap;
            overflow-x: scroll;
            padding-right: $indent-x;
            &::-webkit-scrollbar { display: none }
        }



        // --------------------
        // Heading
        // --------------------

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



        // --------------------
        // Modifiers
        // --------------------

        @include md-xl {
            display: none;
        }



    }
</style>



<!--
    Template
-->

<template>
    <div class="l-header-filters" v-show="titles.length">
        <div class="heading" ref="heading">{{ heading }}</div>
        <div class="cut" v-show="cut">&nbsp;</div>
        <a v-show="!menu" @click="$emit('update:menu', true)">Refine</a>
        <a v-show="menu && !apply" @click="clear()">Clear</a>
        <a v-show="menu && apply" @click="$emit('update:menu', false)">Apply</a>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'menu',
            'filters'
        ],

        data () {
            return {
                apply: false,
                cut: false
            }
        },

        computed: {

            titles () {
                return this.filters.map(filter => {
                    const values = this.$store.getters['filter/values'](filter.id);
                    return values.map(id => filter.items.find(item => item.id === id).title);
                }).flat();
            },

            heading () {
                return this.titles.join(' + ');
            }

        },

        watch: {

            titles () {
                if (this.menu) this.apply = true;
                this.$nextTick(this.setCut);
            },

            menu () {
                if (!this.menu) this.apply = false;
            }

        },

        methods: {

            setCut () {
                this.cut = this.$refs.heading.offsetWidth < this.$refs.heading.scrollWidth;
            },

            clear () {
                const query = { ...this.$route.query };
                const params = this.filters.map(filter => filter.options.param);
                params.forEach(param => delete query[param]);
                this.$router.push({ query });
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
