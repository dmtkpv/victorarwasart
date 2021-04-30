<!--
    Styles
-->

<style scoped>

    .display-tags {
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
    <div class="display-tags">
<!--        {{ value }}-->
        <v-chip v-for="item in items" :style="style(item[groupField])" small disabled label>
            {{ item[titleField] }}
        </v-chip>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'value',
            'colors',
            'keyField',
            'titleField',
            'groupField'
        ],

        computed: {

            items () {
                return this.value.filter(item => item[this.keyField]).map(item => item[this.keyField]).sort((a, b) => a.sort - b.sort);
            },

            groups () {
                return [...new Set(this.items.map(tag => tag[this.groupField]))];
            }

        },

        methods: {

            style (group) {
                const i = this.groups.indexOf(group)
                return {
                    '--v-chip-color': this.colors[i].foreground,
                    '--v-chip-background-color': this.colors[i].background,
                }
            }

        }

    }

</script>
