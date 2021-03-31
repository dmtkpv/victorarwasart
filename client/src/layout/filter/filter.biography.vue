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
        <div class="l-filter-biography-more" v-show="!isFull">
            —
            <a @click="load">Read more</a>
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
                loading: false,
                request: null,
                full: null
            }
        },

        computed: {

            isFull () {
                return !this.short.endsWith('...') || this.full;
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
                return this.full ? this.fullText : this.shortText;
            }

        },

        methods: {

            async load () {
                if (this.loading) return;
                this.loading = true;
                const data = await this.$store.dispatch('load', ['filter/biography', this.id]);
                this.full = data.biography;
            }

        }

    }

</script>
