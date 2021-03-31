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
            position: sticky;
            top: 0;
            z-index: 1;
            background: $black;
        }

    }



    // --------------------
    // Link
    // --------------------

    .l-filter-item-link {

        @extend %row;
        position: relative;
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
            transition: transform .3s;
            padding-right: 24px; // as transition
        }

        .total {
            opacity: 0;
            transition: opacity .3s;
        }

        @mixin active {
            .total { opacity: 1; }
            .title { transform: translateX(24px); }
        }

        &.active {
            color: $red;
            @include active;
            .hidden { opacity: 1 }
        }

        &.disabled:not(.active) {
            color: #7E7E7C;
            pointer-events: none;
        }

        @include md-xl {
            &:hover { @include active }
            &.active + .note { display: block }
        }

        @include sm {
            .total { opacity: 1 }
        }

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
                <a class="l-filter-item-link" :class="{ active: active(item), disabled: item.disabled }" @click="$emit('click', item)">
                    <svg-close class="hidden" />
                    <p class="title">{{ item.title }}</p>
                    <p class="total">{{ item.total }}</p>
                </a>
                <ui-accordion v-if="item.biography" v-show="active(item)">
                    <filter-biography :short="item.biography" :id="item.id" />
                </ui-accordion>
            </div>


        </template>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import svgClose from '$svg/close'
    import uiAccordion from '$ui/accordion'
    import filterBiography from './filter.biography'

    export default {

        components: {
            svgClose,
            uiAccordion,
            filterBiography
        },

        props: [
            'items',
            'options',
            'active'
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
