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
        transition: height .3s, opacity .3s .3s;
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
        transition: height .3s .3s, opacity .3s;
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
    <transition name="ui-accordion" @enter="enter" @before-leave="beforeLeave" @after-leave="afterLeave">
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

            beforeLeave ($node) {
                if (!$node.style.height) $node.style.height = $node.scrollHeight + 'px'
            },

            afterLeave ($node) {
                $node.style.height = ''
            }

        }

    }

</script>
