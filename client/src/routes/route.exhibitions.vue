<!--
    Styles
-->

<style lang="scss" scoped>



    // --------------------
    // Article
    // --------------------

    article {
        @extend %line;
        &:before { margin-left: 0 }
        @include md-xl {
            padding-left: $column-width;
            padding-top: $indent-y;
        }
    }



    // --------------------
    // Lines
    // --------------------

    .line {
        @extend %line;
        position: absolute;
        &:before { margin-left: 0 }
        &:nth-child(1) { left: calc(#{$column-width} * 2) }
        &:nth-child(2) { left: calc(#{$column-width} * 3) }
        @include sm-md { display: none }
    }



    // --------------------
    // Table
    // --------------------

    table {

        width: 100%;
        border-collapse: collapse;

        td {
            border-bottom: 1px solid $white-transparent;
            padding: 14px $indent-x;
            vertical-align: top;
        }

        a {
            @extend %u-row;
            svg {
                width: 12px;
                margin-left: 8px;
                flex-shrink: 0;
            }
            @include lg-xl {
                justify-content: flex-start;
                &:not(:hover) svg { opacity: 0 }
            }
        }

        @include lg-xl {
            .country { width: $column-width; }
            .city { width: $column-width; }
            .hidden { display: none; }
        }

        @include sm-md {
            &, tbody, td, tr { display: block }
            .country { margin-top: 64px }
            .city { border-bottom: none; padding-bottom: 0; }
            .establishment { padding-top: 0; }
        }

        @include sm {
            .country { border-bottom-color: rgba($white, .5); }
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


            <!-- lines -->

            <div class="line" />
            <div class="line" />


            <!-- table  -->

            <table>
                <tbody>
                    <template v-for="(cities, country) in countries">
                        <template v-for="(establishments, city, cityIndex) in cities">
                            <tr v-for="(item, index) in establishments">

                                <td class="country" v-if="cityIndex === 0 && index === 0" :rowspan="Object.values(cities).flat().length">{{ country }}</td>
                                <td class="city" :class="{ hidden: index }" :rowspan="establishments.length">{{ city }}</td>

                                <td class="establishment">
                                    <a :href="item.link" target="_blank">
                                        <span v-text="item.establishment" />
                                        <svg-open />
                                    </a>
                                </td>

                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>


        </article>
    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import layoutSection from '$layout/layout.section'
    import layoutHeader from '$layout/header/layout.header'
    import svgOpen from '$svg/open'

    export default {

        components: {
            layoutHeader,
            layoutSection,
            svgOpen
        },

        computed: {

            header () {
                return {
                    mode: 'none',
                    filters: [],
                    breadcrumbs: [
                        { title: 'Exhibitions' }
                    ]
                }
            },

            exhibitions () {
                return this.$store.getters['api/exhibitions'];
            },

            countries () {
                return this.exhibitions.reduce((countries, exhibition) => {
                    const { country, city, establishment, link } = exhibition;
                    if (!countries[country]) countries[country] = {};
                    if (!countries[country][city]) countries[country][city] = [];
                    countries[country][city].push({ establishment, link });
                    return countries;
                }, {});
            }

        },

        async beforeRouteEnter (to, from, next) {
            await this.$store.dispatch('request', 'exhibitions');
            next();
        }

    }

</script>
