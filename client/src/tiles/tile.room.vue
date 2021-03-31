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

        .text {
            padding: $indent-x;
        }

        @include sm {
            padding: $indent-y $indent-x;
        }

    }

</style>



<!--
    Template
-->

<template>
    <a class="t-room" @click="open">

        <div class="image" :style="{paddingTop: image.height / image.width * 100 + '%'}">
            <img class="u-stretch" :src="`${baseURL}/assets/${image.id}`">
        </div>

        <p class="text">{{ title }}</p>

    </a>
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
        ],

        methods: {

            open () {
                this.$store.commit('storage/set', ['room-from', this.$route.fullPath ]);
                this.$router.push(`/viewing-room/${this.id}`);
            }

        }

    }

</script>
