<!--
    Styles
-->

<style lang="scss">

    .l-filter--links {

        .numeric {

            .l-filter-item:not(:last-child) { margin-bottom: $indent-x }
            a { align-items: flex-start }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-filter--links">


        <!-- head -->

        <layout-filter-head :head="head" />


        <!-- list -->

        <layout-filter-list :class="{ numeric: options.numeric }" :items="items" :options="options" v-slot="{ item, index }">

            <a :class="{ active: active(item) }" @click="open(item)">
                <p class="hidden" v-if="options.numeric">{{ number(index) }}</p>
                <p class="title">{{ item.title }}</p>
                <p class="total" v-if="item.total">{{ item.total }}</p>
            </a>

        </layout-filter-list>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import svgDown from '$svg/down'
    import layoutFilterList from './filter.list'
    import layoutFilterHead from './filter.head'

    export default {

        components: {
            svgDown,
            layoutFilterList,
            layoutFilterHead
        },

        props: [
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
