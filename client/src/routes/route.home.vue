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

    import layoutSection from '$layout/layout.section'
    import layoutArtwork from '$layout/layout.artwork'

    export default {

        components: {
            layoutSection,
            layoutArtwork
        },

        computed: {

            artworks () {
                return this.$store.getters['api/home'];
            },

            artwork () {
                return this.artworks[Math.floor(Math.random() * this.artworks.length)];
            }

        },

        beforeRouteEnter (to, from, next) {
            this.$store.dispatch('request', 'home').then(next);
        }

    }

</script>
