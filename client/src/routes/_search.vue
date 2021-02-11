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
        <layout-section>

            <template v-for="result in results">
                <div v-for="item in result[0]">Artwork: {{ item.id }}</div>

            </template>



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



    // ------------------
    // Helpers
    // ------------------

    const apis = [
        'artworks',
        'rooms',
        'publications',
        'essays',
        'poems',
        'artists'
    ]

    function cancel (api) {
        apis.forEach(key => api.cancel(key));
    }

    function request (api, options) {
        const { types, ...params } = options;
        return Promise.all(types.map(key => {
            return api.request(`search.${key}`, params)
        }));
    }

    function response (api) {
        return apis.reduce((res, key) => {
            res[key] = api.response(`search.${key}`) || [];
            return res;
        }, {});
    }

    function filter (value, index, self) {
        if (!apis.includes(value)) return;
        return self.indexOf(value) === index;
    }

    function params ($route) {
        let types = $.params($route.query.type);
        if (!types.length) types = [...apis];
        let writings = types.indexOf('writings');
        if (writings > -1) types.splice(writings, 1, 'essays', 'poems', 'artists');
        types = types.filter(type => apis.includes(type))
        return {
            types,
            search: $route.query.query,
            limit: 100,
            offset: 0,
            meta: 'filter_count'
        }
    }



    // ------------------
    // Exports
    // ------------------

    export default {

        components: {
            layoutHeader,
            layoutSection,
            layoutGrid
        },

        data () {
            return {
                params: {},
                results: []
            }
        },

        methods: {

            load () {
                cancel(this.$api);
                return request(this.$api, this.params);
            },

            more () {
                this.params.offset += this.params.limit;
                this.load.then(results => this.results.push(results)); // format results
            },

            update () {
                this.params = params(this.$route);
                this.load().then(results => this.results = [results]); // format results
            }

        },

        watch: {

            $route () {
                this.update();
            },

            // results: {
            //     immediate: true,
            //     handler (value) {
            //         console.log(value);
            //     }
            // }

        },

        beforeRouteEnter (to, from, next) {
            if (this.search) {
                this.$store.commit('cancel', 'artworks');
            }
            if (!NODE) this.search = true;
            Promise.all([
                this.$store.dispatch('request', ['artworks', getParams(to)])
            ]).then(next);


            // if (this.search) cancel(this.$api);
            // if (!NODE) this.search = true;
            // request(this.$api, params(to)).then(next);
        },

        created () {
            this.params = params(this.$route);
            this.results.push(response(this.$api));

        }


    }

</script>
