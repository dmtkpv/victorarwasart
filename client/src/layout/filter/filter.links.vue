<!--
    Styles
-->

<style lang="scss">

    .l-filter--links {

        @include md-xl {

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

        <filter-list :items="items" :options="options" v-slot="{ item, index }">

            <a :class="{ active: active(item) }" @click="open(item)">
                <svg-close class="hidden" />
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
