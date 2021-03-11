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

        <filter-list
            :items="items"
            :options="options"
            :active="active"
            @click="open"
        />


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

            active (item) {
                return decodeURI(this.$route.fullPath) === this.options.path + item.id;
            },

            open (item) {
                const link = this.active(item) ? this.options.back : this.options.path + item.id;
                this.$router.push(link);
            }

        }


    }

</script>
