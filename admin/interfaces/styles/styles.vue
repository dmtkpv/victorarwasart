<!--
    Template
-->

<template>
    <v-textarea disabled :value="styles" @input="$emit('input', $event)"/>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'styles'
        ],

        mounted () {
            const $text = document.createTextNode(this.styles);
            this.$style = document.createElement('style');
            this.$style.appendChild($text);
            document.head.appendChild(this.$style);
            this.$el.parentNode.parentNode.style.display = 'none';
        },

        destroyed () {
            document.head.removeChild(this.$style);
        }

    }

</script>