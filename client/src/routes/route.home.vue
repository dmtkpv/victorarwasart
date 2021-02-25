<!--
    Styles
-->

<style lang="scss" scoped>

    .l-section {

        height: var(--windowHeight);

        @extend %line;
        &:before { margin-left: 0 }

        @include md-xl {
            padding-left: $column-width;
        }

    }

</style>



<!--
    Template
-->

<template>
    <layout-section>
        <layout-artwork v-bind="artwork" />
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutSection from '$layout/layout.section'
    import layoutArtwork from '$layout/layout.artwork'

    export default {

        components: {
            layoutSection,
            layoutArtwork
        },

        data () {
            return {
                index: 0
            }
        },

        computed: {

            artwork () {
                return this.$store.getters['api/home'][this.index];
            }

        },

        async beforeRouteEnter (to, from, next) {
            await this.$store.dispatch('request', 'home').then(next);
            if ($.dehydrated) next(vm =>  vm.index = Math.floor(Math.random() * this.$store.getters['api/home'].length));
            else next();
        }

    }

</script>
