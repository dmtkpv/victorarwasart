export default function () {


    tinymce.PluginManager.add('reference', function (editor) {



        // --------------------
        // Constants
        // --------------------

        const dialog = editor.getParam('referenceDialog');



        // --------------------
        // Helpers
        // --------------------

        function uuid() {
            return 'ref' + Math.random().toString(36).substr(2, 9);
        }

        function getNode () {
            return editor.dom.getParent(editor.selection.getNode(), '[data-reference]');
        }

        function cleanContent () {
            const content = editor.selection.getContent();
            const children = content.match(/<span id="[^"]+" data-reference/g);
            if (children) children.forEach(child => editor.dom.remove(child.match(/id="([^"]+)"/)[1]));
        }

        function toHtml ({ name = '', image = '', text = '' }) {
            return `<span id="${uuid()}" data-reference data-image="${image}" data-text="${text}">${name}</span>`
        }

        function toObject (node) {
            return {
                name: node.textContent,
                image: node.getAttribute('data-image'),
                text: node.getAttribute('data-text')
            }
        }

        function emit () {
            const event = new Event('input')
            const body = editor.dom.select('body')[0];
            body.dispatchEvent(event);
        }



        // --------------------
        // Save
        // --------------------

        dialog.$on('save', reference => {
            const node = getNode();
            if (node) editor.dom.remove(node);
            else cleanContent();
            editor.selection.setContent(toHtml(reference));
            emit();
        })



        // --------------------
        // Delete
        // --------------------

        dialog.$on('delete', () => {
            const node = getNode();
            editor.dom.remove(node);
            editor.selection.setContent(node.textContent);
            emit();
        })



        // --------------------
        // Button
        // --------------------

        editor.ui.registry.addToggleButton('reference', {

            text: 'Note',

            onAction: function () {
                let reference = {};
                const node = getNode();
                if (node) reference = toObject(node);
                else reference.name = editor.selection.getContent({ format: 'text' });
                dialog.set(reference);
            },

            onSetup (button) {
                editor.on('NodeChange', () => {
                    button.setActive(getNode() !== null);
                });
            }


        });

    });



}
