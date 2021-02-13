<!--
    Styles
-->

<style lang="scss">

    .l-section {

        min-height: 100%;

        @include sm {
            padding-top: 60px; // nav height
        }

    }

</style>



<!--
    Template
-->

<template>
    <section class="l-section">
        <slot />
    </section>
</template>



<!--
    Scripts
-->

<script>

    export default {



    }

</script>
