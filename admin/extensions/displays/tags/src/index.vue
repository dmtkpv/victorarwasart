<!--
    Styles
-->

<style scoped>

    .display-labels {
        display: inline-flex;
    }
    .v-chip + .v-chip {
        margin-left: 4px;
    }

</style>



<!--
    Template
-->

<template>
    <div class="display-labels">
        <v-chip v-for="item in items" :style="styles[item.group]" small disabled label>
            {{ item.title }}
        </v-chip>
    </div>
</template>



<!--
    Scripts
-->

<script>

    const styles = [
        {
            '--v-chip-color': '#263238',
            '--v-chip-background-color': '#EDEFF1'
        },
        {
            '--v-chip-color': '#FFF',
            '--v-chip-background-color': '#667C89'
        },
        {
            '--v-chip-color': '#FFF',
            '--v-chip-background-color': '#5DC49A'
        },
        {
            '--v-chip-color': '#FFF',
            '--v-chip-background-color': '#667C89'
        },
        {
            '--v-chip-color': '#FFF',
            '--v-chip-background-color': '#D15B6B'
        }
    ]

    export default {

        props: [
            'value'
        ],

        computed: {

            items () {
                return this.value.filter(item => item.artwork_tags_id).map(item => item.artwork_tags_id);
            },

            styles () {
                const titles = [...this.items].sort((a, b) => a.sort - b.sort).map(tag => tag.group);
                const unique = [...new Set(titles)];
                return Object.fromEntries(unique.map((title, index) => [title, styles[index]]));
            }

        }

    }

</script>
