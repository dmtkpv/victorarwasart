<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Line
    // --------------------

    .l-masonry-line {
        @extend %line;
        &:before { margin-left: 0 }
    }



    // --------------------
    // Grid
    // --------------------

    .l-masonry-grid {

        display: flex;
        flex-flow: column wrap;
        align-content: flex-start;
        overflow: hidden;

        & > * {
            order: 99999;
            padding-bottom: 120px !important;
        }

        &[col="1"] > * { width: 100% };
        &[col="2"] > * { width: 50% };
        &[col="3"] > * { width: 33.33% };
        &[col="4"] > * { width: 25% };
        &[col="5"] > * { width: 20% };

    }



</style>



<!--
    Template
-->

<template>
    <div class="l-masonry">
        <div class="l-masonry-line" v-for="col in cols" />
        <div class="l-masonry-grid" ref="grid" :col="cols">
            <slot />
        </div>
    </div>
</template>




<!--
    Scripts
-->

<script>

    import vars from 'unitless!$styles/abstract/vars'
    import more from '$mixins/mixin.more'

    export default {

        mixins: [
            more
        ],

        props: [
            'grid'
        ],

        data () {
            return {
                length: 0,
                cols: 0,
                tiles: [],
                heights: [],
                columns: [],
                scrollTop: 0
            }
        },

        methods: {

            setTiles () {
                this.tiles = [...this.$refs.grid.children];
            },

            resize () {
                if (window.innerWidth > vars.lgMax) this.cols = this.grid.xl;
                else if (window.innerWidth > vars.mdMax) this.cols = this.grid.lg;
                else if (window.innerWidth > vars.smMax) this.cols = this.grid.md;
                else this.cols = 1;
            },

            update (scrollTop) {

                this.heights = new Array(this.cols).fill(0);
                this.columns = new Array(this.cols).fill().map(() => []);

                this.tiles.forEach(($tile, i) => {
                    $tile.style.flexBasis = '';
                    const col = this.heights.indexOf(Math.min(...this.heights));
                    this.heights[col] += $tile.getBoundingClientRect().height;
                    this.columns[col].push(i);
                });

                this.$refs.grid.style.height = Math.max(...this.heights) + 1 + 'px';

                this.columns.flat().forEach((index, i) => {
                    this.tiles[index].style.order = i;
                });

                this.columns.forEach((column, i) => {
                    const $last = this.tiles[column[column.length - 1]];
                    if (!$last) return;
                    const extra = Math.max(...this.heights) - this.heights[i] - 1;
                    $last.style.flexBasis = $last.offsetHeight + extra + 'px';
                });

                if (scrollTop) window.scrollTo(0, 0);

            },

            observe (mutations) {
                const scrollTop = mutations.some(mutation => {
                    if (mutation.removedNodes.length) return true;
                    const added = [...mutation.addedNodes];
                    const children = [...this.$refs.grid.children];
                    return added.some(node => children.indexOf(node) < this.tiles.length);
                })
                this.setTiles();
                this.update(scrollTop);
            }

        },

        watch: {

            cols () {
                this.$nextTick(this.update);
            }

        },

        mounted () {
            this.setTiles();
            this.resize();
            this.observer = new MutationObserver(this.observe);
            this.observer.observe(this.$refs.grid, { childList: true });
            window.addEventListener('resize', this.resize);

        },

        unmounted () {
            this.observer.disconnect();
            window.removeEventListener('resize', this.resize);
        }


    }

</script>
