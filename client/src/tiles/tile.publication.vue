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
                cursor: crosshair;
            }
        }

        .text {
            a { @extend %ui-link; }
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
    <div class="t-publication">

        <div class="image" :style="{ paddingTop, transform }">
            <img class="u-stretch" :src="`${baseURL}/assets/${image.id}`">
        </div>

        <div class="text">
            <p>{{ title }}, {{ year }}</p>
            <p>{{ text }}</p>
            <p>Publication ID: {{ id }} | <a @click="inquire">Inquire</a></p>
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
            'size'
        ],

        computed: {

            paddingTop () {
                return this.size ? '' : this.image.height / this.image.width * 100 + '%'
            },

            transform () {
                return this.size ? `scale(${this.size / 100})` : ''
            }

        },

        methods: {

            inquire () {
                const { id, title, year, text } = this;
                let inquire = `${title}, ${year}\n${text}\nReference No. ${id}`
                this.$store.commit('storage/set', ['inquire', inquire]);
            }

        }

    }

</script>
