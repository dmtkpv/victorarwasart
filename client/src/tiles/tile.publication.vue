<!--
    Styles
-->

<style lang="scss">

    .t-publication {

        position: relative;

        .image, .text {
            @extend %u-stretch;
            padding: 10%;
        }

        .image img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }

        .text {
            position: absolute;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            text-align: center;
            background: $black-overlay;
            a { display: inline-block }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="t-publication" :class="{ search }" @click="toggle()">
        <div class="image">
            <img :src="`${ORIGIN}/assets/${image.id}`">
        </div>
        <div class="text" v-show="active">
            <p>{{ title }}, {{ year }}</p>
            <p>{{ notes }}</p>
            <p>Publication ID: {{ id }} | <a>Inquire</a></p>
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
            'notes',
            'search'
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
