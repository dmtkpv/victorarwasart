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

        <filter-head :head="head" @opened="opened = $event" />


        <!-- list -->

        <ui-accordion v-show="opened">
            <filter-list
                :items="items"
                :options="options"
                :active="active"
                @click="open"
            />
        </ui-accordion>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import vars from 'unitless!$styles/abstract/vars'
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
                opened: NODE ? true : window.innerWidth > vars.smMax
            }
        },

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
            },

            resize () {
                this.opened = window.innerWidth > vars.smMax;
            }

        },

        mounted () {
            window.addEventListener('resize', this.resize);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }


    }

</script>
