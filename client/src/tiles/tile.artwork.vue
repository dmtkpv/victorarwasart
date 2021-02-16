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

        .text {
            a {
                @extend %ui-link;
            }
            @include md-xl {
                padding: $indent-y $indent-x;
            }
            @include sm {
                padding-top: $indent-y;
            }
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
            <p>Reference No. {{ reference }} | <a @click="inquire">Inquire</a></p>
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
                this.$store.commit('storage/set', ['artwork', this.$props ]);
                this.$router.push({ query: { ...this.$route.query, modal_artwork: this.id } })
            },

            inquire () {
                const { artist, title, year, technique, dimensions, note, reference } = this;
                let inquire = `${title}, ${year}\n${technique} | ${dimensions} | ${note}\nReference No. ${reference}`
                if (artist) inquire = `${artist.name}, ${artist.lifetime}\n${inquire}`;
                this.$store.commit('storage/set', ['inquire', inquire]);
            }

        }

    }

</script>
