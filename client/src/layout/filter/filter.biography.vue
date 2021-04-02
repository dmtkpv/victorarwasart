<!--
    Styles
-->

<style lang="scss">

    .l-filter-biography {

        color: $red;
        @extend %padding-ver;

        a {
            display: inline;
        }

        @include sm {
            padding-left: $indent-x;
            padding-right: $indent-x;
        }

    }

    .l-filter-biography-more {
        display: inline;
    }

</style>



<!--
    Template
-->

<template>
    <div class="l-filter-biography">
        {{ text }}
        <div class="l-filter-biography-more" v-show="hasMore">
            —
            <a @click="more" v-show="!expanded">Read more</a>
            <a @click="less" v-show="expanded">Read less</a>
        </div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'id',
            'short'
        ],

        data () {
            return {
                expanded: false,
                loading: false,
                full: null
            }
        },

        computed: {

            hasMore () {
                return this.short.endsWith('...');
            },

            shortText () {
                return this.short.replace(/\.\.\.$/, '');
            },

            fullText () {
                if (!this.full) return;
                const $div = document.createElement('div');
                $div.innerHTML = this.full;
                return $div.textContent;
            },

            text () {
                return this.expanded ? this.fullText : this.shortText;
            }

        },

        methods: {

            async more () {
                if (this.loading) return;
                if (this.full) return (this.expanded = true);
                this.loading = true;
                const data = await this.$store.dispatch('load', ['filter/biography', this.id]);
                this.full = data.biography;
                this.loading = false;
                this.expanded = true;
            },

            less () {
                this.expanded = false;
            }

        }

    }

</script>
