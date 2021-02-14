<!--
    Styles
-->

<style lang="scss" scoped>



    // --------------------
    // Header
    // --------------------

    .l-header {

        @extend %col;
        @extend %line;

        @include md-xl {
            left: $column-width;
            padding: $indent-y $indent-x;
        }

    }



    // --------------------
    // Article
    // --------------------

    .l-article {



        @include md-xl {
            padding-left: calc(#{$column-width} * 2);
        }
    }



</style>



<!--
    Template
-->

<template>
    <layout-section>
        <layout-header v-bind="header" />
        <layout-article :content="content" />
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import layoutSection from '$layout/layout.section'
    import layoutHeader from '$layout/header/layout.header'
    import layoutArticle from '$layout/layout.article'

    export default {

        components: {
            layoutSection,
            layoutHeader,
            layoutArticle
        },

        computed: {

            header () {
                return {
                    mode: 'back',
                    filters: [
                        this.$store.getters['filter/biographies']
                    ],
                    breadcrumbs: [
                        { title: 'Writings', path: '/writings' },
                        { title: 'Biographies', path: '/writings/biography' },
                    ]
                }
            },

            content () {
                const article = this.$store.getters['api/artists/item'];
                return `<h2>${article.name}</h2>${article.biography}`;
            }

        },

        watch: {

            '$route.params.id' (id) {
                this.$store.commit('cancel', 'artists/item');
                this.$store.dispatch('request', ['artists/item', id])
            }

        },

        async beforeRouteEnter (to, from, next) {
            if ($.dehydrated) this.$store.commit('cancel', 'artists/item');
            await this.$store.dispatch('request', 'filter/artists');
            await this.$store.dispatch('request', ['artists/item', to.params.id]);
            next();
        }


    }

</script>
