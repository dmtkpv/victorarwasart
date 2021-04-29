<style scoped>

    .v-button.delete {
        --v-button-background-color: var(--danger-25);
        --v-button-color: var(--danger);
        --v-button-background-color-hover: var(--danger-50);
        --v-button-color-hover: var(--danger);
    }

</style>


<!--
    Template
-->

<template>
    <v-dialog :active="reference" @toggle="set(false)" @esc="set(false)">
        <v-card>

            <v-card-title>Note</v-card-title>

            <v-card-text>
                <v-input v-model="reference.name" placeholder="Text" />
            </v-card-text>

            <v-card-text v-if="reference.image">
                <image-preview :image="reference.image" @deselect="setImage(false)" />
            </v-card-text>

            <v-card-text v-else>
                <v-upload @input="setImage" from-library />
            </v-card-text>

            <v-card-text>
                <v-textarea v-model="reference.text" placeholder="Description" />
            </v-card-text>

            <v-card-actions>
                <v-button class="delete" :disabled="!canDelete" @click="del">Delete</v-button>
                <v-button class="save" :disabled="!canSave" @click="save">Save</v-button>
            </v-card-actions>

        </v-card>
    </v-dialog>

</template>



<!--
    Scripts
-->

<script>

    import imagePreview from './image.vue'

    export default {

        components: {
            imagePreview
        },

        data () {
            return {
                reference: false,
                canDelete: false
            }
        },

        computed: {

            canSave () {
                return this.reference && this.reference.name && (this.reference.image || this.reference.text);
            }

        },

        methods: {

            set (value) {
                this.reference = value;
                this.canDelete = this.canSave;
            },

            setImage (value) {
                if (value) this.$set(this.reference, 'image', value.id);
                else this.$delete(this.reference, 'image');
            },

            save () {
                this.$emit('save', this.reference);
                this.set(false);
            },

            del () {
                this.$emit('delete', this.reference);
                this.set(false);
            }


        }

    }


</script>