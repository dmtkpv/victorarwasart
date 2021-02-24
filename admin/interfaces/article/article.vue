<!--
    Template
-->

<template>
    <div>
        <textarea ref="target" />
        <reference-dialog ref="reference" />
    </div>
</template>



<!--
    Scripts
-->

<script>

    import referenceDialog from './reference/dialog.vue'

    export default {

        props: [
            'value'
        ],

        components: {
            referenceDialog
        },

        data () {
            return {
                editor: null,
                content: null
            }
        },

        methods: {

            setup (editor) {
                this.editor = editor;
                this.editor.on('input', event => {
                    this.content = editor.getContent();
                });
            }

        },

        watch: {

            value (value) {
                if (value !== this.content) this.editor.setContent(value);
            },

            content (content) {
                this.$emit('input', content);
            }

        },

        mounted () {
            tinymce.init({
                target: this.$refs.target,
                menubar: false,
                statusbar: false,
                contextmenu: false,
                plugins: 'reference link',
                toolbar: 'reference link',
                content_style: '[data-reference] { color: #f2994a; text-decoration: underline; }',
                referenceDialog: this.$refs.reference,
                setup: this.setup
            })

        }

    }

</script>