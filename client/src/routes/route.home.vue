<!--
    Styles
-->

<style lang="scss" scoped>

    section {

        height: 100vh;

        @extend %line;
        &:before { margin-left: 0 }

        @include md-xl {
            padding-left: $column-width;
        }

    }

    .l-artwork {
        height: 100%;
    }

</style>



<!--
    Template
-->

<template>
    <section>
        <layout-artwork v-bind="artwork" />
    </section>
</template>



<!--
    Scripts
-->

<script>

    import layoutArtwork from '$layout/layout.artwork'

    export default {

        components: {
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
