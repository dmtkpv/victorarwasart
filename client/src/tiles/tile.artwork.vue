<!--
    Styles
-->

<style lang="scss">

    .t-artwork {

        .image {
            position: relative;
            img {
                @extend %u-stretch;
                position: absolute;
            }
        }

        @include md-xl {
            .text { padding: $indent-x $indent-x 140px $indent-x; }
        }

        @include sm {
            padding: $indent-y $indent-x 140px $indent-x;
            .text { padding-top: $indent-y; }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="t-artwork">

        <a class="image" :style="{paddingTop: image.height / image.width * 100 + '%'}" @click="modal">
            <img class="u-stretch" :src="`${baseURL}/assets/${image.id}`">
        </a>

        <div class="text">
            <p v-if="artist">{{ artist.name }}, {{ artist.lifetime }}</p>
            <p>{{ title }}, {{ year }}</p>
            <p>{{ technique }}</p>
            <p>{{ dimensions }}</p>
            <p>{{ note }}</p>
            <p>Reference No. {{ reference }} | Inquire </p>
        </div>

    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        inheritAttrs: false,

        props: [
            'id',
            'title',
            'artist',
            'image',
            'year',
            'technique',
            'dimensions',
            'reference',
            'note'
        ],

        methods: {

            modal () {
                this.$router.push({ query: { ...this.$route.query, modal_artwork: this.id } })
            }

        }

    }

</script>
