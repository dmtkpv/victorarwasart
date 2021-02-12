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
        <modal-room v-if="room" />
        <modal-artwork v-if="artwork" :id="artwork" />
        <modal-inquire v-if="inquire" />
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

            artwork () {
                return +this.$route.query.modal_artwork;
            },

            room () {

            },

            inquire () {

            }

        }

    }

</script>
