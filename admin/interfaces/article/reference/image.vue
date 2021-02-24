<!--
    Styles
-->

<style scoped>

    .image {
        position: relative;
        height: var(--input-height-tall);
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .image .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, rgba(38, 50, 56, 0), rgba(38, 50, 56, .25));
        opacity: 0;
        transform: translateY(10px);
        transition: var(--medium) var(--transition);
        transition-property: opacity transform;
    }
    .image .overlay .v-button {
        --v-button-color: var(--foreground-subdued);
        --v-button-background-color: var(--white);
        --v-button-color-hover: var(--foreground-normal);
        --v-button-background-color-hover: var(--white);
    }
    .image .overlay:hover {
        transform: translateY(0);
        opacity: 1;
    }

</style>



<!--
    Template
-->

<template>
    <div class="image">

        <img :src="`/assets/${image}`" />

        <div class="overlay">
            <v-button icon rounded @click="$emit('deselect')" v-tooltip="$t('deselect')">
                <v-icon name="close" />
            </v-button>
        </div>

    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'image'
        ]

    }

</script>