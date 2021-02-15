<!--
    Styles
-->

<style lang="scss">

    .t-artist {
        padding: $indent-y $indent-x;
    }

</style>



<!--
    Template
-->

<template>
    <router-link class="t-artist" :to="`/writings/biography/${id}`">{{ name }}</router-link>
</template>



<!--
    Scripts
-->

<script>

    export default {

        inheritAttrs: false,

        props: [
            'id',
            'name'
        ]

    }

</script>
