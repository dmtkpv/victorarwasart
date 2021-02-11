<!--
    Styles
-->

<style lang="scss">

    .t-writing {
        padding: $indent-x;
    }

</style>



<!--
    Template
-->

<template>
    <a class="t-writing">{{ title }}</a>
</template>



<!--
    Scripts
-->

<script>

    export default {

        inheritAttrs: false,

        props: [
            'title'
        ]

    }

</script>
