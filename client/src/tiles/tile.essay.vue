<!--
    Styles
-->

<style lang="scss">

    .t-essay {
        padding: $indent-y $indent-x;
    }

</style>



<!--
    Template
-->

<template>
    <router-link class="t-essay" :to="`/writings/essay/${id}`">{{ title }}</router-link>
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
