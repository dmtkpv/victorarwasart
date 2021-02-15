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
                padding: $indent-x $indent-x 140px $indent-x;
            }
            @include sm {
                padding-top: $indent-y;
            }
            p {
                white-space: pre-line;
            }
        }

        @include sm {
            padding: $indent-y $indent-x 140px $indent-x;
        }


    }
</style>



<!--
    Template
-->

<template>
    <div class="t-publication" @click="toggle()">

        <div class="image" :style="{paddingTop: image.height / image.width * 100 + '%'}">
            <img class="u-stretch" :src="`${baseURL}/assets/${image.id}`">
        </div>

        <div class="text">
            <p>{{ title }}, {{ year }}</p>
            <p>{{ text }}</p>
            <p>Publication ID: {{ reference }} | <a>Inquire</a></p>
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

        data () {
            return {
                active: false
            }
        },

        methods: {

            toggle (value = !this.active) {
                this.active = value;
            }

        }

    }

</script>
