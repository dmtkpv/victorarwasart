<!--
    Styles
-->

<style lang="scss">

    .l-header-sort {

        @extend %u-row;
        flex: 1;
        justify-content: flex-start;
        text-transform: uppercase;

        span {
            margin: 0 4px;
        }

        span:first-child {
            color: $red;
            margin-left: 0;
        }

        a.active {
            color: $red;
        }

        @include md-xl {
            margin-bottom: 48px;
            span:first-child { display: none }
        }

    }

</style>



<!--
    Template
-->

<template>
    <div class="l-header-sort">
        <span>;</span>
        <a @click="sort()" :class="{ active: active() }">New</a>
        <span>/</span>
        <a @click="sort('title')" :class="{ active: active('title') }">A-Z</a>
        <span>/</span>
        <a @click="sort('-year')" :class="{ active: active('-year') }">Year</a>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        methods: {

            active (sort) {
                return this.$route.query.sort === sort;
            },

            sort (sort) {
                this.$router.push({
                    query: { ...this.$route.query, sort }
                })
            }

        }

    }

</script>
