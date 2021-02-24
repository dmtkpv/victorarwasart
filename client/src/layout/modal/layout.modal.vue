<!--
    Styles
-->

<style lang="scss">

    .l-modal {
        position: relative;
    }

</style>



<!--
    Template
-->

<template>
    <aside class="l-modal">
        <modal-room v-if="modal.room" />
        <modal-artwork v-if="modal.artwork" :id="modal.artwork" />
        <modal-inquire v-if="modal.inquire" :subject="modal.inquire" />
    </aside>
</template>



<!--
    Scripts
-->

<script>

    import modalArtwork from './modal.artwork'
    import modalRoom from './modal.room'
    import modalInquire from './modal.inquire'

    export default {

        components: {
            modalArtwork,
            modalRoom,
            modalInquire
        },

        computed: {

            modal () {
                return {
                    artwork: +this.$route.query.modal_artwork,
                    room: this.$route.name === 'room' && !this.$route.params.thumbnails,
                    inquire: this.$store.state.storage.inquire
                }
            }

        },

        watch: {

            modal: {
                immediate: true,
                handler (value) {
                    this.$store.commit('scroll/set', value);
                }
            }

        }

    }

</script>
