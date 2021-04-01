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
            &.filtered.active .close { display: none }
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
                @click="select($event.id)"
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
                opened: false
            }
        },

        computed: {

            selected: {

                get () {
                    return $.filter({ id: this.id, items: this.items }, this.$route.query);
                },

                set (value) {
                    this.$router.push({ query: { ...this.$route.query, [this.id]: value }});
                }

            }

        },

        methods: {

            active (item) {
                return this.selected.includes(item.id);
            },

            clear () {
                this.selected = [];
            },

            select (id) {
                let selected = [...this.selected];
                const index = selected.indexOf(id);
                if (index === -1) selected.push(id);
                else selected.splice(index, 1);
                this.selected = selected;
            },

            resize () {
                this.opened = window.innerWidth > vars.smMax;

            }

        },

        watch: {

            opened: {
                immediate: true,
                handler (value) {
                    console.log(value)
                }
            }

        },

        beforeMount () {
            this.resize();
            window.addEventListener('resize', this.resize);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>
