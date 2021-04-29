<!--
    Template
-->

<template>
    <div v-show="!loading">
        <interface-wysiwyg v-if="loading" />
        <textarea ref="target" />
        <reference-dialog ref="reference" />
    </div>
</template>



<!--
    Scripts
-->

<script>

    import referencePlugin from './reference/plugin';
    import referenceDialog from './reference/dialog.vue'

    export default {

        props: [
            'value'
        ],

        data () {
            return {
                loading: false,
                editor: null,
                content: null
            }
        },


        components: {
            referenceDialog
        },

        methods: {

            load () {
                return new Promise(resolve => {
                    if (window.tinymce) return resolve();
                    this.loading = true;
                    const observer = new MutationObserver(_ => {
                        if (!window.tinymce) return;
                        observer.disconnect();
                        this.loading = false;
                        resolve();
                    });
                    observer.observe(this.$el, { childList: true });
                })
            },

            init () {
                referencePlugin();
                tinymce.init({
                    skin: false,
                    skin_url: false,
                    content_css: false,
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
            },

            setup (editor) {
                this.editor = editor;
                this.editor.on('init', event => {
                    this.editor.setContent(this.value || '');
                });
                this.editor.on('input', event => {
                    this.content = editor.getContent();
                });
            },

        },

        watch: {

            value (value) {
                if (value !== this.content && this.editor) {
                    this.editor.setContent(value || '');
                }
            },

            content (content) {
                this.$emit('input', content);
            }

        },

        async mounted () {
            await this.load();
            this.init();
        }

    }

</script>