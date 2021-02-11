<!--
    Styles
-->

<style lang="scss" scoped>

    .l-header {

        @include md-xl {
            display: none;
        }

    }

    .l-section {

        @extend %line;
        &:before { margin-left: 0 }

        @include md-xl {
            padding-left: $column-width;
        }

    }

</style>



<!--
    Template
-->

<template>
    <div>
        <layout-header v-bind="header" />
        <layout-section>
            <layout-grid :grid="grid" @more="more">
                <template v-for="result in results">
                    <component
                        v-for="item in result.data"
                        v-bind="item"
                        :is="tiles[result.collection]"
                        :key="result.collection + item.id"
                        search="true"
                    />
                </template>
            </layout-grid>
        </layout-section>
    </div>
</template>



<!--
    Scripts
-->

<script>



    // ------------------
    // Imports
    // ------------------

    import $ from '$modules/utils'
    import layoutHeader from '$layout/header'
    import layoutSection from '$layout/section'
    import layoutGrid from '$layout/grid'
    import tileArtwork from '$tiles/artwork'
    import tileRoom from '$tiles/room'
    import tilePublication from '$tiles/publication'
    import tileWriting from '$tiles/writing'



    // ------------------
    // Helpers
    // ------------------

    const options = [
        {
            collection: 'artworks',
            fields: 'id,title,artist.name,artist.lifetime,image.id,image.width,image.height,year,technique,dimensions,reference,note',
            searchIn: 'title,year,technique,dimensions,reference,note',
        },
        {
            collection: 'viewing_room',
            fields: '*',
            searchIn: 'title'
        },
        {
            collection: 'publications',
            fields: '*,image.id,image.width,image.height',
            searchIn: 'title,year,text'
        },
        {
            collection: 'essays',
            fields: '*',
            searchIn: 'title,text'
        },
        {
            collection: 'poems',
            fields: '*',
            searchIn: 'title,text'
        },
        {
            collection: 'artists',
            fields: '*',
            searchIn: 'name,lifetime,biography'
        }
    ]

    const collections = options.map(option => option.collection);

    function countParams (route) {
        return {
            options,
            text: route.query.text
        }
    }

    function searchParams (route) {
        let types = $.array(route.query.type);
        let writings = types.indexOf('writings');
        if (writings > -1) types.splice(writings, 1, 'essays', 'poems', 'artists');
        types = types.filter(type => collections.includes(type));
        types = types.filter((value, index, self) => self.indexOf(value) === index);
        if (!types.length) types = [...collections];
        return {
            offset: 0,
            limit: 20,
            text: route.query.text,
            options: options.filter(option => types.includes(option.collection))
        }
    }



    // ------------------
    // Exports
    // ------------------

    export default {

        components: {
            layoutHeader,
            layoutSection,
            layoutGrid,
            tileArtwork,
            tileRoom,
            tilePublication,
            tileWriting
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
                    viewing_room: 'tileArtwork',
                    publications: 'tilePublication',
                    essays: 'tileWriting',
                    poems: 'tileWriting',
                    artists: 'tileWriting'
                },
                params: {}
            }
        },

        computed: {

            header () {
                return this.$store.getters['layout/search/header'];
            },

            results () {
                return this.$store.state.api.response['search'];
            }

        },

        methods: {

            update () {
                this.params = searchParams(this.$route);
                this.$store.commit('cancel', 'search');
                this.$store.commit('cancel', 'search/count');
                this.$store.dispatch('request', ['search', this.params]);
                this.$store.dispatch('request', ['search/count', countParams(this.$route)]);
            },

            more () {
                this.$store.dispatch('append', ['search', this.params]);
            }

        },

        watch: {

            $route () {
                this.update();
            }

        },

        beforeRouteEnter (to, from, next) {
            if (this.search) {
                this.$store.commit('cancel', 'search');
                this.$store.commit('cancel', 'search/count');
            }
            if (!NODE) this.search = true;
            Promise.all([
                this.$store.dispatch('request', ['search', searchParams(to)]),
                this.$store.dispatch('request', ['search/count', countParams(to)])
            ]).then(() => {
                next();
            });
        },

        created () {
            this.params = searchParams(this.$route);
        }


    }

</script>
