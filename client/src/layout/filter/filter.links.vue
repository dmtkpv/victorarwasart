<!--
    Styles
-->

<style lang="scss">

    .l-filter--links {

        @include md-xl {
            .numeric .l-filter-item {
                a { align-items: flex-start }
                &:not(:last-child) a { margin-bottom: $indent-x }
            }
        }
    }

</style>



<!--
    Template
-->

<template>
    <div class="l-filter--links">


        <!-- head -->

        <filter-head :head="head" />


        <!-- list -->

        <filter-list :class="{ numeric: options.numeric }" :items="items" :options="options" v-slot="{ item, index }">

            <a :class="{ active: active(item) }" @click="open(item)">
                <p class="hidden" v-if="options.numeric">{{ number(index) }}</p>
                <p class="title">{{ item.title }}</p>
                <p class="total" v-if="item.total">{{ item.total }}</p>
            </a>

        </filter-list>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import svgDown from '$svg/down'
    import filterList from './filter.list'
    import filterHead from './filter.head'

    export default {

        components: {
            svgDown,
            filterList,
            filterHead
        },

        props: [
            'id',
            'head',
            'items',
            'options'
        ],

        methods: {

            number (index) {
                return ('0' + (index + 1)).slice(-2);
            },

            link (item) {
                return this.options.path + item.id;
            },

            active (item) {
                return decodeURI(this.$route.fullPath) === this.link(item);
            },

            open (item) {
                this.$router.push(this.link(item));
            }

        }


    }

</script>
