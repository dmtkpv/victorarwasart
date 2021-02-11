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
        :id="id"
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

        components: {
            links,
            params
        },

        props: [
            'mode',
            'id',
            'head',
            'items',
            'options'
        ]

    }

</script>
