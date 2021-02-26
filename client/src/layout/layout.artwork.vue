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
    // Images
    // --------------------

    .l-artwork-images {

        @extend %u-row;
        flex: 1;
        padding-top: 64px;
        justify-content: center;
        overflow: hidden;

        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        @include sm {
            padding-top: 0;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

    }



    // --------------------
    // Text
    // --------------------

    .l-artwork-text {

        text-align: center;
        padding-bottom: 64px;
        padding-top: $indent-y;

        .inquire {
            @extend %ui-link;
        }

        .nav {
            @extend %u-row;
            justify-content: center;
            margin-bottom: 12px;
            transition: opacity .3s;
            &.hidden { opacity: 0 }
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
            padding-left: $indent-x;
            padding-right: $indent-x;
            background: rgba($black, .8);
            z-index: 1;
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

    .l-artwork-control {

        position: absolute;
        bottom: $indent-y;

        &.details {
            left: $indent-x;
            z-index: 1;
        }

        &.magnifier {
            right: $indent-y;
        }

        @include md-xl {
            display: none;
        }

    }



</style>



<!--
    Template
-->

<template>
    <div class="l-artwork">


        <!-- slider -->

        <div class="l-artwork-images">
            <img v-for="(image, i) in images"
                class="u-stretch"
                ref="image"
                v-show="i === index"
                :src="`${baseURL}/assets/${image}`"
                 @mouseenter="toggleMagnifier(true)"
                 @mouseleave="toggleMagnifier(false)"
                 @touchstart.prevent
            >
        </div>



        <!-- text -->

        <div class="l-artwork-text" :class="{ active: details }">

            <div class="nav" :class="{ hidden: images.length === 1 }">
                <a v-for="(image, i) in images"
                   :class="{ active: i === index }"
                   @click="index = i"
                   v-text="i + 1"
                />
            </div>

            <p v-if="artist">{{ artist.name }}, {{ artist.lifetime }}</p>
            <p>{{ title }}, {{ year }}</p>
            <p>{{ technique }} | {{ dimensions }} | {{ note }}</p>
            <p>Reference No. {{ reference }} | <a class="inquire" @click="inquire">Inquire</a> </p>

        </div>


        <!-- magnifier -->

        <div class="l-artwork-magnifier" ref="magnifier" v-show="magnifier">
            <img :src="`${baseURL}/assets/${images[index]}`">
        </div>


        <!-- controls -->

        <a class="l-artwork-control details" @click="toggleDetails(!details)">{{ details ? 'Close' : 'Details' }}</a>
        <a class="l-artwork-control magnifier" @click="toggleMagnifier(!magnifier)">{{ magnifier ? 'Clear' : 'Magnifier' }}</a>


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
                index: 0,
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
                const $src = this.$refs.image[this.index];
                const rect = $src.getBoundingClientRect();
                const pageX = rect.left + rect.width / 2;
                const pageY = rect.top + rect.height / 2;
                this.magnifier && this.moveMagnifier({ pageX, pageY });
            },

            moveMagnifier (e) {
                if (!this.magnifier) return;
                const $node = this.$refs.magnifier;
                const $src = this.$refs.image[this.index];
                const $dst = $node.firstElementChild;
                const event = (e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e);
                const node = $node.getBoundingClientRect();
                const src = $src.getBoundingClientRect();
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
