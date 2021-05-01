<!--
    Styles
-->

<style lang="scss">
    .l-filter--params .l-filter-head {

        .clear {
            display: none;
        }

        &.filtered {
            color: $red;
            .total { display: none }
            .clear { display: block }
        }

        @include md-xl {
            .clear svg { display: none }
        }

        @include sm {
            .clear span { display: none }
            &.filtered.opened .close { display: none }
        }

    }
</style>



<!--
    Template
-->

<template>
    <div class="l-filter--params">


        <!-- head -->

        <filter-head :head="head" :class="{ filtered: selected.length }" @opened="opened = $event">
            <a class="clear" @click.stop="clear">
                <svg-close />
                <span>Clear</span>
            </a>
        </filter-head>


        <!-- list -->

        <ui-accordion v-show="opened">
            <filter-list
                :items="items"
                :options="options"
                :active="active"
                @click="select($event)"
            />
        </ui-accordion>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import vars from 'unitless!$styles/abstract/vars'
    import $ from '$services/utils'
    import svgClose from '$svg/close'
    import uiAccordion from '$ui/accordion'
    import filterList from './filter.list'
    import filterHead from './filter.head'

    export default {

        components: {
            svgClose,
            filterList,
            filterHead,
            uiAccordion
        },

        props: [
            'id',
            'head',
            'items',
            'options'
        ],

        data () {
            return {
                opened: NODE ? true : this.options.opened || window.innerWidth > vars.smMax
            }
        },

        computed: {

            selected: {

                get () {
                    return $.filter({ id: this.id, items: this.items }, this.$route.query);
                },

                set (selected) {
                    this.$router.push({ query: { ...this.$route.query, [this.id]: selected }});
                }

            }

        },

        methods: {

            active (item) {

                return !$.array(item.id).some(id => !this.selected.includes(id));
            },

            clear () {
                this.selected = [];
            },

            select (item) {
                if (this.active(item)) this.selected = this.selected.filter(id => !$.array(item.id).includes(id));
                else this.selected = [...new Set([...this.selected, ...$.array(item.id)])];
            },

            resize () {
                if (this.options.opened) return;
                this.opened = window.innerWidth > vars.smMax;
            }

        },

        mounted () {
            // console.log(this.items)
            window.addEventListener('resize', this.resize);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>
