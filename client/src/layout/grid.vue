<!--
    Styles
-->

<style lang="scss">

    .l-grid {

        display: flex;
        flex-flow: column wrap;
        align-content: flex-start;
        overflow: hidden;

        &[col="1"] > * { width: 100% };
        &[col="2"] > * { width: 50% };
        &[col="3"] > * { width: 33.33% };
        &[col="4"] > * { width: 25% };
        &[col="5"] > * { width: 20% };

    }
    .l-grid > * {
        order: 99999;
    }



</style>



<!--
    Template
-->

<template>
    <div class="l-grid" :col="cols">
        <slot />
    </div>
</template>




<!--
    Scripts
-->

<script>

    import vars from 'unitless!$css/abstract/vars'

    export default {

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
                this.tiles = [...this.$el.children];
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

                this.$el.style.height = Math.max(...this.heights) + 1 + 'px';

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
                    const children = [...this.$el.children];
                    return added.some(node => children.indexOf(node) < this.tiles.length);
                })
                this.setTiles();
                this.update(scrollTop);
            },

            scroll () {
                const wh = window.innerHeight;
                const sh = document.documentElement.scrollHeight;
                const st = document.documentElement.scrollTop;
                if (st > sh - wh * 2) this.$emit('more');
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
            this.observer.observe(this.$el, { childList: true });
            window.addEventListener('resize', this.resize);
            document.addEventListener('scroll', this.scroll);

        },

        unmounted () {
            this.observer.disconnect();
            window.removeEventListener('resize', this.resize);
            document.removeEventListener('scroll', this.scroll);
        }


    }

</script>
