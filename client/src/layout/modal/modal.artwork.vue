<!--
    Styles
-->

<style lang="scss">

    .l-modal-artwork {

        @extend %u-stretch;
        position: fixed;
        background: $black;

        .l-modal-close {
            position: absolute;
            left: $indent-x;
            top: $indent-y;
            text-transform: uppercase;
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-modal-artwork">
        <layout-artwork v-bind="artwork" />
        <a class="l-modal-close" @click="close">Close</a>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import layoutArtwork from '$layout/layout.artwork'

    export default {

        props: [
            'id'
        ],

        components: {
            layoutArtwork
        },

        data () {
            return {
                artwork: {}
            }
        },

        methods: {

            close () {
                this.$router.push({ query: { ...this.$route.query, modal_artwork: undefined }});
            }

        },

        async serverPrefetch () {
            return this.artwork = await this.$store.dispatch('request', ['artworks/item', this.id]);
        },

        async beforeMount () {
            let artwork = this.$store.getters['api/artworks/item'];
            if (artwork.id === this.id) return (this.artwork = artwork);
            artwork = this.$store.getters['api/artworks'].find(artwork => artwork.id === this.id);
            if (artwork) this.artwork = artwork;
            await this.$store.commit('cancel', 'artworks/item');
            this.artwork = await this.$store.dispatch('request', ['artworks/item', this.id]);
        }

    }

</script>
