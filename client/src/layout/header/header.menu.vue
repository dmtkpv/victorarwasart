<!--
    Styles
-->

<style lang="scss">


</style>



<!--
    Template
-->

<template>
    <div class="l-header-menu">
        <template v-for="item in filters">
            <div v-if="item.length" class="filter-wrapper">
                <layout-filter class="filter-nested" v-for="filter in item" v-bind="filter" :key="filter.id" />
            </div>
            <layout-filter class="filter-direct" v-else v-bind="item" />
        </template>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import vars from 'unitless!$styles/abstract/vars'
    import Animation from '$services/animation'
    import layoutFilter from '$layout/filter/layout.filter'

    export default {

        components: {
            layoutFilter
        },

        props: [
            'filters'
        ],

        data () {
            return {
                scroll: new Animation({
                    update: value => this.$el.scrollTop = value
                })
            }
        },

        methods: {

            scrollToFilter (event) {
                if (window.innerWidth > vars.smMax) return;
                const from = this.$el.scrollTop;
                const to = event.detail.offsetTop;
                this.scroll.from(from).to(to).play();
            }

        },

        mounted () {
            window.addEventListener('filter:opened', this.scrollToFilter);
        },

        destroyed () {
            window.removeEventListener('filter:opened', this.scrollToFilter);
        }

    }

</script>
