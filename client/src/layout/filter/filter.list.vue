<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // List
    // --------------------

    .l-filter-list {

        @include md-xl {
            margin-top: $indent-y;
        }

    }



    // --------------------
    // Letter
    // --------------------

    .l-filter-letter {

        @extend %row;
            text-transform: uppercase;

        @include md-xl {
            margin-top: 36px;
            margin-bottom: $indent-y;
        }

        @include sm {
            margin-top: 48px;
        }

    }



    // --------------------
    // Anchor
    // --------------------

    .l-filter-item a {

        @extend %row;
        margin-bottom: 2px;
        transition: color .3s;

        svg {
            width: 12px;
        }

        .hidden {
            position: absolute;
            opacity: 0;
            transition: opacity .3s;
        }

        .title {
            flex: 1;
            transition: transform .3s;
        }

        .total {
            opacity: 0;
            transition: opacity .3s;
        }

        @mixin active {
            .hidden { opacity: 1 }
            .total { opacity: 1; }
            .title { transform: translateX(32px); }
        }

        &.active {
            color: $red;
            @include active;
        }

        @include md-xl {
            &:hover { @include active }
            &.active + .note { display: block }
        }

        @include sm {
            .total { opacity: 1 }
        }

    }



    // --------------------
    // Note
    // --------------------

    .l-filter-item .note {
        display: none;
        color: $red;
        @extend %padding-ver;
    }



</style>



<!--
    Template
-->

<template>
    <div class="l-filter-list">
        <template v-for="(item, index) in list">


            <!-- letter -->

            <div class="l-filter-letter"
                 v-if="hasLetter(index)"
                 v-text="letter(item)"
            />


            <!-- item -->

            <div class="l-filter-item">
                <slot v-bind="{ item, index }"/>
                <div class="note" v-if="item.note">{{ item.note }}</div>
            </div>


        </template>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'items',
            'options'
        ],

        computed: {

            list () {
                return this.options.alphabetic ? [...this.items].sort((a, b) => a.title.localeCompare(b.title)) : this.items;
            }

        },

        methods: {

            hasLetter (index) {
                if (!this.options.alphabetic) return false;
                const curr = this.list[index];
                const prev = this.list[index - 1];
                return !index || prev.title[0] !== curr.title[0];
            },

            letter (item) {
                return item.title[0]
            }

        }

    }

</script>
