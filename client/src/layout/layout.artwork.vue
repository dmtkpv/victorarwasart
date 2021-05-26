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
        overflow: hidden;
    }



    // --------------------
    // Images
    // --------------------

    .l-artwork-images {

        @extend %u-row;
        flex: 1;
        padding-top: 100px;
        justify-content: center;
        overflow: hidden;

        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        @include sm {
            padding: 0 $indent-x;
            img {
                width: 100%;
                height: 100%;
            }
            &.cover {
                padding: 0;
                img { object-fit: cover; }
            }
        }

    }



    // --------------------
    // Text
    // --------------------

    .l-artwork-details {

        .wrap {
            padding-bottom: 64px;
            padding-top: $indent-y;
        }

        .inquire {
            @extend %ui-link;
        }

        .nav {
            @extend %u-row;
            margin-bottom: 12px;
            transition: opacity .3s;
            &.hidden { opacity: 0 }
            a {
                margin: 0 6px;
                &:hover { color: $red }
                &.active { color: $red }
            }
        }

        @include md-xl {
            text-align: center;
            .nav { justify-content: center; }
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
            .nav { justify-content: flex-start; }
            &:not(.active) { display: none }
        }

    }



    // --------------------
    // Magnifier
    // --------------------

    .l-artwork-magnifier {

        position: absolute;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.6);

        img {
            position: absolute;
            left: 0;
            top: 0;
            @include sm { object-fit: cover }
        }

        @include md-xl {
            width: 330px;
            height: 330px;
        }

        @include sm {
            width: 208px;
            height: 208px;
            img { object-fit: contain; }
            &.cover img { object-fit: cover; }
        }

        &:not(.touch) {
            pointer-events: none;
        }

        &.touch {
            transition: top .3s, left.3s;
        }

    }



    // --------------------
    // Details
    // --------------------

    .l-artwork-control {

        position: absolute;
        bottom: 0;
        @extend %padding;

        &.details {
            left: 0;
            z-index: 1;
        }

        &.magnifier {
            right: 0;
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

        <div class="l-artwork-images" :class="{ cover: homepage_cover }">
            <img v-for="(image, i) in images"
                class="u-stretch"
                ref="image"
                v-show="i === index"
                :src="`${baseURL}/assets/${image}`"
                 @mouseenter="mouseEnter"
                 @mouseleave="mouseLeave"
                 @mousemove="mouseMove"
                 @touchstart="touchStart"
            >
        </div>



        <!-- text -->

        <div class="l-artwork-details" :class="{ active: details }" @click="hideDetails">
            <div class="wrap">

                <div class="nav" :class="{ hidden: images.length === 1 }">
                    <a v-for="(image, i) in images"
                       :class="{ active: i === index }"
                       @click="index = i"
                       v-text="i + 1"
                    />
                </div>

                <p v-if="artist">{{ artist.name }}, {{ artist.lifetime }}</p>
                <p>{{ title }}, {{ year }}</p>
                <p>
                    <span v-if="technique">{{ technique }},</span>
                    <span v-if="dimensions">{{ dimensions }},</span>
                    <span>{{ note }}</span>
                </p>
                <p>Reference No. {{ id }} | <a class="inquire" @click="inquire">Inquire</a> </p>

            </div>
        </div>


        <!-- magnifier -->

        <div class="l-artwork-magnifier" ref="magnifier" v-show="magnifier" :class="{ touch, cover: homepage_cover }" @touchstart="toggleMagnifier">
            <img :src="`${baseURL}/assets/${images[index]}`">
        </div>


        <!-- controls -->

        <a class="l-artwork-control details" @click="toggleDetails(!details)">{{ details ? 'Close' : 'Details' }}</a>
        <a class="l-artwork-control magnifier" @click="toggleMagnifier">{{ magnifier ? 'Clear' : 'Magnifier' }}</a>


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
            'note',
            'homepage_cover',
            'additional_images'
        ],

        data () {
            return {
                index: 0,
                details: false,
                magnifier: false,
                touch: !NODE && 'ontouchstart' in window
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

            mouseMove (event) {
                if (this.touch) return;
                if (!this.magnifier) return;
                this.moveMagnifier(event);
            },

            async mouseEnter (event) {
                if (this.touch) return;
                this.magnifier = true;
                await this.$nextTick();
                this.moveMagnifier(event);
            },

            mouseLeave () {
                if (this.touch) return;
                this.magnifier = false;
            },

            async touchStart (event) {
                this.magnifier = true;
                await this.$nextTick();
                this.moveMagnifier(event);
            },

            async toggleMagnifier () {
                this.magnifier = !this.magnifier;
                if (!this.magnifier) return;
                await this.$nextTick();
                const $src = this.$refs.image[this.index];
                const rect = $src.getBoundingClientRect();
                const clientX = rect.left + rect.width / 2;
                const clientY = rect.top + rect.height / 2;
                this.moveMagnifier({ clientX, clientY });
            },

            moveMagnifier (e) {
                const $node = this.$refs.magnifier;
                const $src = this.$refs.image[this.index];
                const $dst = $node.firstElementChild;
                const event = (e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e);
                const root = this.$el.getBoundingClientRect();
                const node = $node.getBoundingClientRect();
                const src = $src.getBoundingClientRect();
                const nodeX = event.clientX - root.left - node.width / 2;
                const nodeY = event.clientY - root.top - node.height / 2;
                const dstX = src.left - root.left - nodeX;
                const dstY = src.top - root.top - nodeY;
                const oX = -dstX + node.width / 2;
                const oY = -dstY + node.height / 2;
                $dst.style.width = src.width + 'px';
                $dst.style.height = src.height + 'px';
                $dst.style.transformOrigin = `${oX}px ${oY}px`
                $dst.style.transform = `translate(${dstX}px, ${dstY}px) scale(2)`
                $node.style.left = nodeX + 'px';
                $node.style.top = nodeY + 'px';
            },

            hideDetails (event) {
                if (event.currentTarget === event.target) this.toggleDetails(false);
            },

            toggleDetails (value) {
                this.details = value;
            },

            inquire () {
                const { id, artist, title, year, technique, dimensions, note } = this;
                let inquire = `${title}, ${year}\n${technique}, ${dimensions}, ${note}\nReference No. ${id}`
                if (artist) inquire = `${artist.name}, ${artist.lifetime}\n${inquire}`;
                this.$store.commit('storage/set', ['inquire', inquire]);
            }

        }

    }

</script>
