<!--
    Styles
-->

<style lang="scss">
    .t-publication {

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
    <div class="t-publication">

        <div class="image" :style="{paddingTop: image.height / image.width * 100 + '%'}">
            <img class="u-stretch" :src="`${baseURL}/assets/${image.id}`">
        </div>

        <div class="text">
            <p>{{ title }}, {{ year }}</p>
            <p>{{ text }}</p>
            <p>Publication ID: {{ reference }} | <a @click="inquire">Inquire</a></p>
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
            'image',
            'title',
            'year',
            'text',
            'reference'
        ],

        methods: {

            inquire () {
                const { title, year, text, reference } = this;
                let inquire = `${title}, ${year}\n${text}\nReference No. ${reference}`
                this.$store.commit('storage/set', ['inquire', inquire]);
            }

        }

    }

</script>
