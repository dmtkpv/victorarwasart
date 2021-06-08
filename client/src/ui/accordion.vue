<!--
    Styles
-->

<style lang="scss">


    // main

    .ui-accordion {
        overflow: hidden;
    }


    // enter

    .ui-accordion-enter-active {
        transition: height .5s, opacity .5s .5s;
    }
    .ui-accordion-enter {
        height: 0 !important;
        opacity: 0;
    }
    .ui-accordion-enter-to {
        opacity: 1;
    }


    // leave

    .ui-accordion-leave-active {
        transition: height .5s .5s, opacity .5s;
    }
    .ui-accordion-leave {
        opacity: 1;
    }
    .ui-accordion-leave-to {
        opacity: 0;
        height: 0 !important;
    }


</style>



<!--
    Template
-->

<template>
    <transition name="ui-accordion" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @after-leave="afterLeave">
        <div class="ui-accordion">
            <slot />
        </div>
    </transition>
</template>



<!--
    Scripts
-->

<script>

    export default {

        methods: {

            enter ($node) {
                $node.style.height = $node.scrollHeight + 'px'
            },

            afterEnter ($node) {
                $node.style.height = '';
            },

            beforeLeave ($node) {
                $node.style.height = $node.scrollHeight + 'px'
            },

            afterLeave ($node) {
                $node.style.height = ''
            }

        }

    }

</script>
