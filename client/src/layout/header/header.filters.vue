<!--
    Styles
-->

<style lang="scss">
    .l-header-filters {

        @extend %row;

        .ui-cut {
            flex: 1
        }

        @include md-xl {
            display: none;
        }

        @include sm {
            background: $black;
        }

    }
</style>



<!--
    Template
-->

<template>
    <div class="l-header-filters">
        <ui-cut ref="cut">{{ heading }}</ui-cut>
        <a v-show="!menu" @click="$emit('update:menu', true)">Refine</a>
        <a v-show="menu && !apply" @click="clear()">Clear</a>
        <a v-show="menu && apply" @click="$emit('update:menu', false)">APPLY</a>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import uiCut from '$ui/cut'

    export default {

        components: {
            uiCut
        },

        props: [
            'menu',
            'filters'
        ],

        data () {
            return {
                apply: false
            }
        },

        computed: {

            heading () {
                return this.filters.map(config => {
                    const values = $.filter(config, this.$route.query);
                    return values.map(id => config.items.find(item => item.id === id).title);
                }).flat().join(' + ');
            }

        },

        watch: {

            heading () {
                if (this.menu) this.apply = true;
                this.$nextTick(this.$refs.cut.setCut);
            },

            menu () {
                if (!this.menu) this.apply = false;
            }

        },

        methods: {

            clear () {
                const query = { ...this.$route.query };
                this.filters.forEach(config => delete query[config.id]);
                this.$router.push({ query });
            }

        }

    }

</script>
