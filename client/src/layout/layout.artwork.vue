<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Main
    // --------------------

    .l-artwork {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
    }



    // --------------------
    // Slider
    // --------------------

    .l-artwork-slider {

        @extend %u-row;
        position: relative;
        overflow: hidden;
        align-items: stretch;
        padding-top: 64px;
        flex: 1;

        .area {
            position: relative;
            flex: 0 0 60px;
            z-index: 2;
            &.disabled { pointer-events: none; }
        }

        .holder {
            @extend %u-row;
            align-items: stretch;
            flex: 1 0 0;
        }

        .slide {
            @extend %u-row;
            align-items: center;
            justify-content: center;
            flex: 0 0 100%;
            padding: 0 30px;

            img {
                max-width: 100%;
                max-height: 100%;
            }

            &.current {
                position: relative;
                z-index: 1;
            }

            &.prev {
                transform: translateX(50%);
                img { transform: translateX(-50%); }
            }

            &.next {
                transform: translateX(-50%);
                img { transform: translateX(50%); }
            }

        }

        .holder,
        .slide,
        .slide img {
            transition: transform .7s;
        }

    }



    // --------------------
    // Text
    // --------------------

    .l-artwork-text {

        text-align: center;
        padding: $indent-y $indent-x 64px $indent-x;

        a {
            display: inline-block;
            &:hover { color: $red; }
            &.active { color: $red }
        }

        .nav {
            @extend %u-row;
            justify-content: center;
            a { margin: 0 4px; }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-artwork">


        <!-- slider -->

        <div class="l-artwork-slider">

            <a class="area" :class="{ disabled: !slide }" @click="slide--" />

            <div class="holder" :style="{ transform: `translateX(-${slide * 100}%)` }">
                <div class="slide" v-for="(image, index) in images" :key="index" :class="slideClass(index)">
                    <img class="u-stretch" :src="`${baseURL}/assets/${image}`">
                </div>
            </div>

            <a class="area prev" :class="{ disabled: slide === images.length - 1 }" @click="slide++" />

        </div>


        <!-- text -->

        <div class="l-artwork-text">

            <div class="nav" v-if="images.length > 1">
                <a v-for="(image, index) in images"
                   :class="{ active: index === slide }"
                   @click="slide = index"
                   v-text="index + 1"
                />
            </div>

            <p v-if="artist">{{ artist.name }}, {{ artist.lifetime }}</p>
            <p>{{ title }}, {{ year }}</p>
            <p>{{ technique }} | {{ dimensions }} | {{ note }}</p>
            <p>Reference No. {{ reference }} | <a>Inquire</a> </p>

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
            'note',
            'additional_images'
        ],

        data () {
            return {
                slide: 0
            }
        },

        computed: {

            images () {
                const images = [this.image.id];
                if (!this.additional_images) return images;
                return images.concat(this.additional_images.map(image => image.directus_files_id));
            },

            slideClass () {
                return index => {
                    if (index === this.slide + 1) return 'next';
                    if (index === this.slide - 1) return 'prev';
                    if (index === this.slide) return 'current';
                }
            }

        }

    }

</script>
