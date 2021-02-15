<!--
    Styles
-->

<style lang="scss">

    .t-poem {
        padding: $indent-y $indent-x;
    }

</style>



<!--
    Template
-->

<template>
    <router-link class="t-poem" :to="`/writings/poem/${id}`">{{ title }}</router-link>
</template>



<!--
    Scripts
-->

<script>

    export default {

        inheritAttrs: false,

        props: [
            'id',
            'title'
        ]

    }

</script>
