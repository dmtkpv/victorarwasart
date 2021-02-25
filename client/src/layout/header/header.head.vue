<!--
    Styles
-->

<style lang="scss">
    .l-header-head {

        @extend %row;



        // --------------------
        // Breadcrumbs
        // --------------------

        .breadcrumbs {

            @extend %u-row;
            color: $red;
            text-transform: uppercase;

            a {
                &.last { pointer-events: none }
            }

            svg {
                width: 12px;
                margin: 0 4px;
                &.last { display: none }
            }
        }



        // --------------------
        // Sort
        // --------------------

        .sort {

            @extend %u-row;
            flex: 1;
            justify-content: flex-start;
            text-transform: uppercase;

            span {
                &:not(:first-child) {
                    margin: 0 4px;
                    &:before { content: '/' }
                }
                &:first-child {
                    color: $red;
                    margin-right: 6px;
                    &:before { content: ';' }
                }
            }

            a.active {
                color: $red;
            }

            @include md-xl {
                margin-bottom: calc(#{$indent-y} * 2);
                span:first-child { display: none }
            }

        }



        // --------------------
        // Close
        // --------------------

        .close {
            @include md-xl {
                display: none;
            }
        }



        // --------------------
        // Modifiers
        // --------------------

        @include md-xl {
            .breadcrumbs { display: none }
            .refine { display: none }
        }



    }
</style>



<!--
    Template
-->

<template>
    <div class="l-header-head">


        <!-- breadcrumbs -->

        <div class="breadcrumbs">
            <template v-for="(item, index) in breadcrumbs">

                <router-link
                    v-text="item.title"
                    :to="item.path || ''"
                    :class="breadcrumbClass(index)"
                />

                <svg-right
                    :class="breadcrumbClass(index)"
                />

            </template>
        </div>


        <!-- sort -->

        <div class="sort" v-if="sort" v-show="!menu">
            <template v-for="item in sort">

                <span />

                <a v-text="item.title"
                   @click="sortExec(item.value)"
                   :class="sortClass(item.value)"
                />

            </template>
        </div>


        <!-- actions -->

        <div class="refine" v-if="mode === 'refine'">
            <a v-show="!menu && !filtered" @click="$emit('update:menu', true)">Refine</a>
            <a v-show="menu" @click="$emit('update:menu', false)">Close</a>
        </div>

        <router-link class="close" :to="back" v-if="mode === 'back'">Close</router-link>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import $ from '$services/utils'
    import svgRight from '$svg/right'

    export default {

        components: {
            svgRight
        },

        props: [
            'mode',
            'sort',
            'breadcrumbs',
            'filters',
            'menu'
        ],

        computed: {

            breadcrumbClass () {
                return index => index === this.breadcrumbs.length - 1 ? 'last' : undefined
            },

            sortClass () {
                return sort => this.$route.query.sort === sort ? 'active' : undefined;
            },

            filtered () {
                return Object.values($.filters(this.filters, this.$route.query)).flat().length;
            },

            back () {
                return this.breadcrumbs[this.breadcrumbs.length - 2].path;
            }

        },

        methods: {

            sortExec (sort) {
                this.$router.push({ query: { ...this.$route.query, sort }})
            },



        }

    }

</script>
