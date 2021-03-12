<!--
    Styles
-->

<style lang="scss">
    .l-modal-room {



        // --------------------
        // Common
        // --------------------

        @extend %u-stretch;
        position: fixed;
        overflow: hidden;
        background: $black;
        @include sm { display: none; }





        // --------------------
        // Header
        // --------------------

        header {

            z-index: 1;
            position: absolute;
            text-transform: uppercase;
            @extend %u-row;

            .col {
                width: var(--column-width);
                @extend %padding;
            }

            .toggle {
                @extend %u-row;
                justify-content: flex-start;
                span:first-child { color: $red }
            }

        }



        // --------------------
        // Footer
        // --------------------

        footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            @extend %padding;
        }



        // --------------------
        // Gallery
        // --------------------

        .gallery {
            @extend %u-stretch;
            position: absolute;
            transition: transform .5s ease;
        }



        // --------------------
        // Images
        // --------------------

        .images {

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            overflow: hidden;
            padding: 0 calc(#{$indent-x} / 2);

            img {
                max-height: 100%;
                max-width: 100%;
                min-width: 0;
                min-height: 0;
                object-fit: contain;
                padding: $indent-y calc(#{$indent-x} / 2);
            }

        }



        // --------------------
        // Text
        // --------------------

        .text {
            white-space: pre-line;
            text-align: center;
            max-width: 732px;
            margin: 0 auto;
            @extend %padding;
        }



        // --------------------
        // Screen
        // --------------------

        .screen {

            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            height: var(--windowHeight);

            &.stretch .images {
                padding: 0;
                img {
                    flex-grow: 1;
                    height: 100%;
                    object-fit: cover;
                    padding: 0;
                }
            }

            &.container {
                max-width: 1200px;
                margin: 0 auto;
            }

        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-modal-room" v-if="gallery.length" @wheel="wheel">


        <!-- header -->

        <header>
            <a class="col close" @click="close">Close</a>
            <div class="col toggle">
                <span>Gallery view</span>
                <span>&nbsp;/&nbsp;</span>
                <a @click="thumbnails">Thumbnail view</a>
            </div>
        </header>


        <!-- gallery -->

        <div class="gallery" :style="{ transform }">
            <div class="screen" v-for="screen in gallery" :class="classes(screen)">
                <div class="images" v-if="screen.images" :style="styles(screen)">
                    <img v-for="image in screen.images" :src="`${baseURL}/assets/${image.directus_files_id}`">
                </div>
                <div class="text" v-if="screen.text" v-text="screen.text" />
            </div>
        </div>


        <!-- footer -->

        <footer>
            {{ index + 1 }} / {{ gallery.length }}
        </footer>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import WheelIndicator from 'wheel-indicator'
    import vars from 'unitless!$styles/abstract/vars'

    export default {

        data () {
            return {
                index: 0
            }
        },

        computed: {

            gallery () {
                const gallery = this.$store.getters['api/rooms/item'].gallery;
                if (!gallery) return [];
                return gallery.map(screen => screen.screens_id);
            },

            transform () {
                return `translateY(-${this.index * 100}%)`;
            }

        },

        methods: {

            close () {
                const from = this.$store.state.storage['room-from'];
                this.$router.push(from || '/viewing-room');
            },

            thumbnails () {
                this.$router.push({ params: { ...this.$route.params, thumbnails: 'thumbnails' } });
            },

            classes (screen) {
                return {
                    stretch: screen.align === 'stretch',
                    container: screen.container
                }
            },

            styles (screen) {
                return {
                    justifyContent: screen.align,
                    height: `calc(var(--windowHeight) * ${screen.height} / 100)`
                }
            },

            wheel (event) {
                let delta = 0;
                if (event.direction === 'up') delta = -1;
                if (event.direction === 'down') delta = 1;
                if (!delta) return;
                this.index += delta;
                this.index = Math.max(this.index, 0);
                this.index = Math.min(this.index, this.gallery.length - 1);
            }

        },

        mounted () {
            if (window.innerWidth < vars.mdMin) return this.thumbnails();
            this.indicator = new WheelIndicator({
                elem: this.$el,
                callback: this.wheel
            });
        },

        destroyed () {
            this.indicator && this.indicator.destroy()
        }


    }

</script>
