<!--
    Styles
-->

<style lang="scss" scoped>



    // --------------------
    // Article
    // --------------------

    article {

        @include md-xl {
            height: var(--windowHeight);
            padding-left: $column-width;
        }

        @include sm {
            display: flex;
            flex-flow: column nowrap;
        }

    }



    // --------------------
    // About
    // --------------------

    .about {

        @extend %line;
        &:before { margin-left: 0 }

        @include md {
            @include column;
            display: flex;
            flex-flow: column nowrap;
            .contacts { margin-top: auto }
        }

    }



    // --------------------
    // Contacts
    // --------------------

    .contacts {

        @extend %padding;

        .item {
            margin-bottom: $indent-y;
        }

        @include lg-xl {
            @include column;
            display: flex;
            flex-flow: column nowrap;
            left: calc(#{$column-width} * 2);
            &:before { @include line; }
            .copy { margin-top: auto; }
            margin-top: calc(13px + #{$indent-y} * 2);
        }

        @include md {
            padding-top: 0;
        }

        @include sm {
            margin-top: 24px;
            .item {margin-bottom: 48px;}
        }


    }



    // --------------------
    // Info
    // --------------------

    .info {

        @extend %padding;
        ::v-deep p { margin-bottom: $indent-y; }
        svg { width: 70px; }

        @include lg-xl {
            @include column;
            display: flex;
            flex-flow: column nowrap;
            left: $column-width;
            svg {
                margin-top: auto;
                flex-shrink: 0;
            }
        }

        @include md-xl {
            margin-top: calc(13px + #{$indent-y} * 2);
        }

        @include sm {
            svg { margin-top: 120px }
        }

    }



    // --------------------
    // Gallery
    // --------------------

    .gallery {

        @extend %line;
        &:before { margin-left: 0 }
        p { @extend %padding; }
        .ui-link { @extend %padding; }

        @include md-xl {
            display: flex;
            flex-flow: column nowrap;
            height: 100%;
            .slide { margin-bottom: 120px }
            .slide img { width: 100% }
            .ui-link { margin-top: auto }
        }

        @include lg-xl {
            padding-left: calc(#{$column-width} * 2);
        }

        @include md {
            padding-left: $column-width;
        }

        @include sm {
            order: -1;
            display: flex;
            overflow-y: hidden;
            overflow-x: auto;
            height: 235px;
            max-height: var(--windowHeight);
            .slide { height: 100% }
            .slide img { height: 100% }
            .slide p { display: none }
            .ui-link { display: none }
        }

    }

</style>



<!--
    Template
-->

<template>
    <layout-section>
        <layout-header v-bind="header" />
        <article>


            <!-- about -->

            <div class="about">

                <div class="info">
                    <div class="text" v-html="about.text" />
                    <svg-logo />
                </div>

                <div class="contacts">
                    <div class="item">
                        <ui-link v-for="item in contacts" :key="item.id" :href="item.link">{{ item.title }}</ui-link>
                    </div>
                    <div class="item" v-html="about.mailing_address" />
                    <p class="copy">© Victor Arwas Gallery</p>
                </div>

            </div>


            <!-- gallery -->

            <div class="gallery">
                <div class="slide" v-for="slide in about.gallery">
                    <img :src="`${baseURL}/assets/${slide.directus_files_id.id}`">
                    <p>{{ slide.directus_files_id.title }}</p>
                </div>
                <ui-link href="/">Site by Gymnasium</ui-link>
            </div>


        </article>
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import svgLogo from '$svg/logo'
    import layoutSection from '$layout/layout.section'
    import layoutHeader from '$layout/header/layout.header'
    import uiLink from '$ui/link'

    export default {

        components: {
            svgLogo,
            layoutHeader,
            layoutSection,
            uiLink
        },

        computed: {

            header () {
                return {
                    mode: 'none',
                    filters: [],
                    breadcrumbs: [
                        { title: 'About us' }
                    ]
                }
            },

            about () {
                return this.$store.getters['api/about'];
            },

            contacts () {
                return this.$store.getters['api/contacts'];
            }

        },

        async beforeRouteEnter (to, from, next) {
            await this.$store.dispatch('request', 'about');
            next();
        }

    }

</script>
