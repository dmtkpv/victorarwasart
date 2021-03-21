<!--
    Styles
-->

<style lang="scss" scoped>



    // --------------------
    // Header
    // --------------------

    .l-header {

        @include md-xl {
            display: none;
        }

    }



    // --------------------
    // Text
    // --------------------

    ::v-deep .search-text {
        color: $red;
    }



    // --------------------
    // Masonry
    // --------------------

    .l-masonry {

        margin-bottom: $indent-bottom;

        ::v-deep .l-masonry-line {
            &:nth-child(1):before { left: calc(#{$column-width} * 1); }
            &:nth-child(2):before { left: calc(#{$column-width} * 2); }
            &:nth-child(3):before { left: calc(#{$column-width} * 3); }
            &:nth-child(4):before { left: calc(#{$column-width} * 4); }
        }

        @include md-xl {
            padding-left: $column-width;
        }

    }



    // --------------------
    // Footer
    // --------------------

    .l-section:not(.loaded) ~ ::v-deep .l-footer {
        display: none;
    }



</style>



<!--
    Template
-->

<template>
    <layout-section :class="{ loaded }">
        <layout-header v-bind="header" />
        <layout-masonry :grid="grid" @more="more">
            <template v-for="result in results">
                <component
                    v-for="item in result.data"
                    v-bind="item"
                    :is="tiles[result.collection]"
                    :key="result.collection + item.id"
                    @click="modal(result.collection, item)"
                />
            </template>
        </layout-masonry>
    </layout-section>
</template>



<!--
    Scripts
-->

<script>



    // ------------------
    // Imports
    // ------------------

    import $ from '$services/utils'
    import { fields } from '$config/config.api'
    import layoutHeader from '$layout/header/layout.header'
    import layoutSection from '$layout/layout.section'
    import layoutMasonry from '$layout/layout.masonry'
    import tileArtwork from '$tiles/tile.artwork'
    import tileRoom from '$tiles/tile.room'
    import tilePublication from '$tiles/tile.publication'
    import tileEssay from '$tiles/tile.essay'
    import tilePoem from '$tiles/tile.poem'
    import tileArtist from '$tiles/tile.artist'



    // ------------------
    // Helpers
    // ------------------

    const Config = [
        {
            collection: 'artworks',
            fields: fields.artworks.join(','),
            searchIn: 'title,artist.name,artist.lifetime,year,technique,dimensions,reference,note',
        },
        {
            collection: 'viewing_room',
            fields: fields.rooms.join(','),
            searchIn: 'title'
        },
        {
            collection: 'publications',
            fields: fields.publications.join(','),
            searchIn: 'title,year,text'
        },
        {
            collection: 'essays',
            fields: fields.essays.join(','),
            searchIn: 'title'
        },
        {
            collection: 'poems',
            fields: fields.poems.join(','),
            searchIn: 'title'
        },
        {
            collection: 'artists',
            fields: fields.artists.join(','),
            searchIn: 'name'
        }
    ]

    function getFilter (ctx) {
        return ctx.$store.getters['filter/search'];
    }

    function getQuery (filter, query) {
        return {
            s: $.filter(filter, query),
            text: query.text
        }
    }

    function searchParams ({ s, text }) {
        let types = [...s];
        if (!types.length) types = Config.map(option => option.collection);
        let writings = types.indexOf('writings');
        if (writings > -1) types.splice(writings, 1, 'essays', 'poems', 'artists');
        return {
            text,
            offset: 0,
            limit: 20,
            options: Config.filter(option => types.includes(option.collection))
        }
    }

    function countParams ({ text }) {
        return {
            text,
            options: Config
        }
    }

    function select (node, selector) {
        return [...node.querySelectorAll(selector)];
    }



    // ------------------
    // Exports
    // ------------------

    export default {

        components: {
            layoutHeader,
            layoutSection,
            layoutMasonry,
            tileArtwork,
            tileRoom,
            tilePublication,
            tileEssay,
            tilePoem,
            tileArtist
        },

        data () {
            return {
                grid: {
                    xl: 4,
                    lg: 3,
                    md: 2
                },
                tiles: {
                    artworks: 'tileArtwork',
                    viewing_room: 'tileRoom',
                    publications: 'tilePublication',
                    essays: 'tileEssay',
                    poems: 'tilePoem',
                    artists: 'tileArtist'
                },
                params: {}
            }
        },

        computed: {

            header () {
                return {
                    mode: 'refine',
                    filters: [
                        this.filter
                    ],
                    breadcrumbs: [
                        { title: 'Search results', path: '/search' },
                        { title: this.$route.query.text || 'All' }
                    ]
                }
            },

            loaded () {
                return this.$store.state.api.loaded['search'];
            },

            results () {
                return this.$store.getters['api/search'];
            },

            filter () {
                return getFilter(this);
            },

            query () {
                return getQuery(this.filter, this.$route.query);
            },

            queryString () {
                return JSON.stringify(this.query);
            },

            textRegExp () {
                return new RegExp(`(${this.$route.query.text})`, 'i');
            }

        },

        methods: {

            update () {
                this.params = searchParams(this.query);
                this.$store.commit('cancel', 'search');
                this.$store.commit('cancel', 'search/count');
                this.$store.dispatch('request', ['search', this.params]);
                this.$store.dispatch('request', ['search/count', countParams(this.query)]);
            },

            more () {
                this.$store.dispatch('append', ['search', this.params]);
            },

            select (text) {
                return text.replace(this.textRegExp, `<span class="search-text">$1</span>`)
            },

            selectClear () {
                select(this.$el, '.search-text').forEach($text => {
                    $text.parentNode.innerHTML = $text.parentNode.innerHTML.replace(/<span class="search-text">(.+)<\/span>/, '$1');
                })
            },

            selectSingle (selector) {
                select(this.$el, selector).forEach($node => {
                    $node.innerHTML = this.select($node.textContent);
                })
            },

            selectMultiple (parent, child) {
                select(this.$el, parent).forEach($parent => {
                    select($parent, child).some($child => {
                        const found = this.textRegExp.exec($child.textContent);
                        if (found) $child.innerHTML = this.select($child.textContent);
                        return found;
                    })
                })
            },

            modal (collection, item) {
                if (collection !== 'artworks') return;
                this.$store.commit('storage/set', ['artwork', { list: () => [item] }]);
                this.$router.push({ query: { ...this.$route.query, modal_artwork: item.id } })
            },

        },

        watch: {

            queryString () {
                this.update();
            },

            results: {
                immediate: true,
                async handler () {
                    if (NODE) return;
                    await this.$nextTick();
                    this.selectClear();
                    this.selectSingle('.t-essay');
                    this.selectSingle('.t-poem');
                    this.selectSingle('.t-artist');
                    this.selectSingle('.t-room p');
                    this.selectMultiple('.t-publication', 'p');
                    this.selectMultiple('.t-artwork', 'p');
                }
            }

        },

        async beforeRouteEnter (to, from, next) {
            if ($.dehydrated) {
                this.$store.commit('cancel', 'search');
                this.$store.commit('cancel', 'search/count');
            }
            const filter = getFilter(this);
            const query = getQuery(filter, to.query);
            const search = searchParams(query);
            const count = countParams(query);
            await Promise.all([
                this.$store.dispatch('request', ['search', search]),
                this.$store.dispatch('request', ['search/count', count])
            ]);
            next();
        },

        created () {
            this.params = searchParams(this.query);
        }


    }

</script>
