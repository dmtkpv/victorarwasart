<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Main
    // --------------------

    .l-artwork {
        height: 100%;
        position: relative;
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
            position: relative;
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

        @include sm {
            padding-top: 0;
            .area { display: none }
            .slide {
                padding: 0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

    }



    // --------------------
    // Text
    // --------------------

    .l-artwork-text {

        text-align: center;
        padding: $indent-y $indent-x 64px $indent-x;

        .inquire {
            @extend %ui-link;
        }

        .nav {
            @extend %u-row;
            justify-content: center;
            margin-bottom: 12px;
            &.hidden { visibility: hidden }
            a {
                @extend %u-row;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 12px;
                margin: 0 2px;
                line-height: 0.8;
                border: 1px solid transparent;
                &.active { border-color: $white; }
            }
        }

        @include sm {
            @include stretch;
            position: absolute;
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            justify-content: flex-end;
            background: rgba($black, .8);
            .nav { display: none }
            &:not(.active) { display: none }
        }

    }



    // --------------------
    // Magnifier
    // --------------------

    .l-artwork-magnifier {

        position: fixed;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        pointer-events: none;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.3);

        img {
            position: absolute;
            left: 0;
            top: 0;
            @include sm { object-fit: cover }
        }

    }



    // --------------------
    // Details
    // --------------------

    .l-artwork-controls {
        @extend %u-row;
        @extend %padding;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        @include md-xl { display: none }
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
                    <img
                        class="u-stretch"
                        ref="image"
                        :src="`${baseURL}/assets/${image}`"
                        @mouseenter="toggleMagnifier(true)"
                        @mouseleave="toggleMagnifier(false)"
                        @touchstart.prevent
                    >
                </div>
            </div>

            <a class="area prev" :class="{ disabled: slide === images.length - 1 }" @click="slide++" />

        </div>


        <!-- text -->

        <div class="l-artwork-text" :class="{ active: details }">

            <div class="nav" :class="{ hidden: images.length === 1 }">
                <a v-for="(image, index) in images"
                   :class="{ active: index === slide }"
                   @click="slide = index"
                   v-text="index + 1"
                />
            </div>

            <p v-if="artist">{{ artist.name }}, {{ artist.lifetime }}</p>
            <p>{{ title }}, {{ year }}</p>
            <p>{{ technique }} | {{ dimensions }} | {{ note }}</p>
            <p>Reference No. {{ reference }} | <a class="inquire" @click="inquire">Inquire</a> </p>

        </div>


        <!-- zoom -->

        <div class="l-artwork-magnifier" ref="magnifier" v-show="magnifier">
            <img :src="`${baseURL}/assets/${images[slide]}`">
        </div>


        <!-- details -->

        <div class="l-artwork-controls">
            <a @click="toggleDetails(!details)">{{ details ? 'Close' : 'Details' }}</a>
            <a @click="toggleMagnifier(!magnifier)">{{ magnifier ? 'Clear' : 'Magnifier' }}</a>
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
                slide: 0,
                details: false,
                magnifier: false
            }
        },

        computed: {

            images () {
                if (!this.image) return [];
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

        },

        methods: {

            toggleDetails (value) {
                this.details = value;
                this.details && this.toggleMagnifier(false);
            },

            toggleMagnifier (value) {
                this.magnifier = value;
                if (!value) return;
                const $src = this.$refs.image[this.slide];
                const rect = $src.getBoundingClientRect();
                const pageX = rect.left + rect.width / 2;
                const pageY = rect.top + rect.height / 2;
                this.magnifier && this.moveMagnifier({ pageX, pageY });
            },

            moveMagnifier (e) {

                if (!this.magnifier) return;

                // console.log('moveMagnifier')

                const $node = this.$refs.magnifier;
                const $src = this.$refs.image[this.slide];
                const $dst = $node.firstElementChild;


                const event = (e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e);
                const node = $node.getBoundingClientRect();
                const src = $src.getBoundingClientRect();

                // console.log(src)

                const nodeX = event.pageX - node.width / 2;
                const nodeY = event.pageY - node.height / 2;


                const dstX = src.left - nodeX;
                const dstY = src.top - nodeY;
                const oX = event.pageX - src.left;
                const oY = event.pageY - src.top;



                $dst.style.width = src.width + 'px';
                $dst.style.height = src.height + 'px';
                $dst.style.transformOrigin = `${oX}px ${oY}px`
                $dst.style.transform = `translate(${dstX}px, ${dstY}px) scale(2)`



                $node.style.left = nodeX + 'px';
                $node.style.top = nodeY + 'px';



            },

            inquire () {
                const { artist, title, year, technique, dimensions, note, reference } = this;
                let inquire = `${title}, ${year}\n${technique} | ${dimensions} | ${note}\nReference No. ${reference}`
                if (artist) inquire = `${artist.name}, ${artist.lifetime}\n${inquire}`;
                this.$store.commit('storage/set', ['inquire', inquire]);
            }

        },

        mounted () {
            document.addEventListener('mousemove', this.moveMagnifier);
            document.addEventListener('touchmove', this.moveMagnifier);
        },

        destroyed () {
            document.removeEventListener('mousemove', this.moveMagnifier);
            document.removeEventListener('touchmove', this.moveMagnifier);
        }

    }

</script>
