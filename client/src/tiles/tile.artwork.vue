<!--
    Styles
-->

<style lang="scss">

    .t-artwork {

        .image {
            position: relative;
            background: #F00;
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

        <div class="image" :style="{paddingTop: image.height / image.width * 100 + '%'}">
            <img class="u-stretch" :src="`${baseURL}/assets/${image.id}`">
        </div>

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
        ]

    }

</script>
