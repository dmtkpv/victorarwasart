<!--
    Styles
-->

<style lang="scss">

</style>



<!--
    Template
-->

<template>
    <component
        class="l-filter"
        :is="mode"
        :head="head"
        :items="items"
        :options="options"
    />
</template>



<!--
    Scripts
-->

<script>

    import links from './filter.links'
    import params from './filter.params'

    export default {

        inheritAttrs: false,

        components: {
            links,
            params
        },

        props: [
            'mode',
            'head',
            'items',
            'options'
        ]

    }

</script>
