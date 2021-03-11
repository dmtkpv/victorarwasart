<!--
    Styles
-->

<style lang="scss">

    .l-modal-artwork {



        // --------------------
        // Main
        // --------------------

        @extend %u-stretch;
        position: fixed;
        background: $black;



        // --------------------
        // Close
        // --------------------

        .l-modal-close {
            position: absolute;
            left: $indent-x;
            top: $indent-y;
            text-transform: uppercase;
            z-index: 3;
        }



        // --------------------
        // Slider
        // --------------------

        .l-modal-slider {

            @extend %u-row;
            position: relative;
            overflow: hidden;
            align-items: stretch;
            height: 100%;

            .area {
                position: relative;
                width: 60px;
                z-index: 2;
                background: rgba($black, .5);
                transition: background .3s;
                &.disabled { pointer-events: none; }
                &:hover { background: rgba($black, 0) }
            }

            .holder {
                @extend %u-row;
                width: calc(100% - 120px);
            }

            .slide {
                flex: 0 0 100%;
                padding-left: 60px;
                padding-right: 60px;

                &.current {
                    position: relative;
                    z-index: 1;
                }

                &.prev {
                    transform: translateX(50%);
                    .l-artwork-images img { transform: translateX(-50%); }
                    .l-artwork-text { opacity: 0 }

                }

                &.next {
                    transform: translateX(-50%);
                    .l-artwork-images img { transform: translateX(50%); }
                    .l-artwork-text { opacity: 0 }
                }

            }

            .holder, .slide,
            .slide .l-artwork-images img { transition: transform .7s; }
            .slide .l-artwork-text { transition: opacity .3s; }

            @include sm {
                .area { display: none }
                .holder { width: 100% }
                .slide {
                    padding-left: 0;
                    padding-right: 0;
                }
            }

        }

    }
</style>



<!--
    Template
-->

<template>
    <div class="l-modal-artwork">
        <div class="l-modal-slider">


            <!-- prev -->

            <a class="area"
               :class="{ disabled: !index }"
               @click="open(list[index - 1].id)"
            />


            <!-- holder -->

            <div class="holder" :style="{ transform: `translateX(-${index * 100}%)` }">
                <layout-artwork
                    class="slide"
                    v-for="(artwork, i) in slides"
                    :key="artwork.id"
                    :class="slideClass(i)"
                    v-bind="artwork"
                />
            </div>


            <!-- next -->

            <a class="area prev"
               :class="{ disabled: index === list.length - 1 }"
               @click="open(list[index + 1].id)"
            />


        </div>
        <a class="l-modal-close" @click="open(undefined)">Close</a>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import layoutArtwork from '$layout/layout.artwork'

    export default {

        props: [
            'id'
        ],

        data () {
            return {
                cache: []
            }
        },

        components: {
            layoutArtwork
        },

        computed: {

            current () {
                return this.$store.getters['api/artworks/item'];
            },

            storage () {
                return this.$store.state.storage['artwork'] || {};
            },

            list () {
                return this.storage.list ? this.storage.list() : [{ id: this.id }];
            },

            slides () {
                return this.list.map(item => {
                    if (item.id === this.current.id) return this.current;
                    const cached = this.cache.find(cache => cache.id === item.id);
                    return cached ? cached : item;
                })
            },

            index () {
                return this.slides.findIndex(artwork => artwork.id === this.id);
            },

            slideClass () {
                return index => {
                    if (index === this.index + 1) return 'next';
                    if (index === this.index - 1) return 'prev';
                    if (index === this.index) return 'current';
                }
            }

        },

        watch: {

            id () {
                this.load();
            },

            index () {
                if (this.index === this.list.length - 1 && this.storage.more) this.storage.more();
            },

            list: {
                immediate: true,
                handler (list) {
                    list.forEach(item => {
                        const index = this.slides.findIndex(slide => slide.id === item.id);
                        if (index === -1) this.slides.push(item);
                    })
                }
            },

            current (curr, prev) {
                this.cache.push(prev);
            }

        },

        methods: {

            open (modal_artwork) {
                this.$router.replace({ query: { ...this.$route.query, modal_artwork }});
            },

            load () {
                this.$store.commit('cancel', 'artworks/item');
                this.$store.dispatch('request', ['artworks/item', this.id]);
            }

        },

        serverPrefetch () {
            return this.$store.dispatch('request', ['artworks/item', this.id]);
        },

        async beforeMount () {
            if (this.id !== this.current.id) this.load();
        }

    }

</script>
