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
                this.$router.replace({ query: { ...this.$route.query, modal_artwork: undefined }});
            }

        },

        async serverPrefetch () {
            return this.artwork = await this.$store.dispatch('request', ['artworks/item', this.id]);
        },

        async beforeMount () {
            const data = this.$store.getters['api/artworks/item'];
            if (data.id === this.id) return (this.artwork = data);
            const temp = this.$store.state.storage['artwork'];
            if (temp.id === this.id) this.artwork = temp;
            await this.$store.commit('cancel', 'artworks/item');
            this.artwork = await this.$store.dispatch('request', ['artworks/item', this.id]);
        }

    }

</script>
