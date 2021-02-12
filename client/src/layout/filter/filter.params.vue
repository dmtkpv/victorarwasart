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

        <filter-head :head="head" :class="{ filtered: selected.length }">
            <a class="clear" @click.stop="clear">
                <svg-close />
                <span>Clear</span>
            </a>
        </filter-head>


        <!-- list -->

        <filter-list :items="items" :options="options" v-slot="{ item, index }">

            <a :class="{ active: selected.includes(item.id) }" @click="select(item.id)">
                <svg-close class="hidden" />
                <p class="title">{{ item.title }}</p>
                <p class="total">{{ item.total }}</p>
            </a>

        </filter-list>


    </div>
</template>



<!--
    Scripts
-->

<script>
    
    import svgClose from '$svg/close'
    import filterList from './filter.list'
    import filterHead from './filter.head'

    export default {

        components: {
            svgClose,
            filterList,
            filterHead
        },

        props: [
            'id',
            'head',
            'items',
            'options'
        ],

        computed: {

            selected: {

                get () {
                    return this.$store.getters['filter/values'](this.id);
                },

                set (value) {
                    this.$router.push({ query: { ...this.$route.query, [this.options.param]: value }});
                }

            }

        },

        methods: {

            clear () {
                this.selected = [];
            },

            select (id) {
                let selected = [...this.selected];
                const index = selected.indexOf(id);
                if (index === -1) selected.push(id);
                else selected.splice(index, 1);
                this.selected = selected;
            }

        }


    }

</script>
