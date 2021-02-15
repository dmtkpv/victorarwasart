<!--
    Styles
-->

<style lang="scss">

    .t-room {

        .image {
            position: relative;
            img {
                @extend %u-stretch;
                position: absolute;
            }
        }

        p {
            @extend %padding;
        }

    }

</style>



<!--
    Template
-->

<template>
    <router-link :to="`/viewing-room/${id}`" class="t-room">

        <div class="image" :style="{paddingTop: image.height / image.width * 100 + '%'}">
            <img class="u-stretch" :src="`${baseURL}/assets/${image.id}`">
        </div>

        <p>{{ title }}</p>

    </router-link>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'id',
            'title',
            'image'
        ]

    }

</script>
