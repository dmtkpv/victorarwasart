<!--
    Template
-->

<template>
    <v-textarea :value="value" @input="$emit('input', $event)"/>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'value'
        ],

        mounted () {
            const $text = document.createTextNode(this.value);
            this.$style = document.createElement('style');
            this.$style.appendChild($text);
            document.head.appendChild(this.$style);
        },

        destroyed () {
            document.head.removeChild(this.$style);
        }

    }

</script>