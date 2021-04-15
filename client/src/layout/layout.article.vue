<!--
    Styles
-->

<style lang="scss">



    // --------------------
    // Article
    // --------------------

    .l-article {

        @extend %line;
        &:before { margin-left: 0 }

        @include lg-xl {
            padding-right: $column-width;
        }
    }



    // --------------------
    // Content
    // --------------------

    .l-article-content {

        $large: 22px;
        @extend %padding;


        // heading

        .heading {

            @extend %u-row;
            align-items: baseline;

            h1 {
                flex: 1;
                color: $red;
                margin-bottom: $indent-top;
            }

            a {
                margin-left: 4px;
                span.active { color: $red; }
                span:last-child { font-size: $large }
                @include md-xl { display: none }
            }

        }


        // text

        .text {

            counter-reset: note;

            p:not(:first-child) {
                margin-top: 1em;
            }

            [data-reference] {
                color: $red;
                cursor: pointer;
                &:after {
                    counter-increment: note;
                    content: counter(note);
                    margin-left: 2px;
                    font-size: 10px;
                    vertical-align: super;
                }

            }

        }


        // larger

        @include sm {
            &.larger {
                .heading h1 { font-size: $large }
                .text { font-size: $large }
            }
            .heading h1 {
                margin-bottom: 1em;
            }
        }


    }



    // --------------------
    // Notes
    // --------------------

    .l-article-notes {

        @extend %line;
        @extend %padding;

        position: fixed;
        top: 0;
        right: 0;
        width: $column-width;
        height: 100%;
        overflow: auto;
        background: $black;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        h2 {
            margin-bottom: $indent-top;
        }

        @include sm-md {
            width: 100%;
            max-width: 300px;
            border-left: 1px solid $white-transparent;
            transform: translateX(100%);
            transition: transform .3s;
            &.opened { transform: translateX(0) }
            h2 { display: none; }
        }

        @include sm {
            z-index: 4;
        }


    }



    // --------------------
    // Note
    // --------------------

    .l-article-note {

        position: relative;

        a {
            font-size: 10px;
            margin-bottom: 6px;
            color: $red;
        }

        img {
            width: 100%;
            margin-bottom: $indent-y;
        }

        @include lg-xl {
            margin-bottom: calc(#{$indent-top} * 2);
            &:last-child { margin-bottom: calc(var(--windowHeight) * 0.6) }
        }

        @include sm-md {
            &:not(.active) { display: none }
        }

    }



</style>



<!--
    Template
-->

<template>
    <article class="l-article">

        <div class="l-article-content" :class="{ larger }">
            <div class="heading">
                <h1>{{ title }}</h1>
                <a @click="larger = !larger">
                    <span :class="{ active: !larger }">A</span>
                    <span :class="{ active: larger }">A</span>
                </a>
            </div>
            <div class="text" ref="text" v-html="text" />
        </div>

        <div class="l-article-notes" ref="notes" :class="{ opened }">
            <h2>NOTE</h2>
            <div class="l-article-note" ref="note" v-for="(note, index) in notes" :key="index" :class="{ active: active === index }">
                <a @click="showRef(index)">{{ index + 1 }}</a>
                <img :src="note.image" v-if="note.image">
                <p>{{ note.text }}</p>
            </div>
        </div>

    </article>
</template>



<!--
    Scripts
-->

<script>

    import Animation from '$services/animation'
    import vars from 'unitless!$styles/abstract/vars'

    export default {

        inheritAttrs: false,

        props: [
            'title',
            'text'
        ],

        data () {
            return {
                refs: [],
                notes: [],
                larger: false,
                opened: false,
                active: -1,
                scrollNote: new Animation({
                    update: value => this.$refs.notes.scrollTop = value
                }),
                scrollText: new Animation({
                    update: value => window.scrollTo(0, value)
                })
            }
        },

        methods: {

            showRef (index) {
                if (window.innerWidth < vars.lgMin) {
                    // ???
                }
                else {
                    const $ref = this.refs[index];
                    const $note = this.$refs.note[index];
                    const rt = $ref.getBoundingClientRect().top;
                    const nt = $note.getBoundingClientRect().top;
                    this.scrollText.from(window.scrollY).to(window.scrollY + rt - nt).play();
                }
            },

            showNote (index) {
                if (window.innerWidth < vars.lgMin) {
                    this.opened = true;
                    this.active = index;
                }
                else {
                    const $ref = this.refs[index];
                    const $note = this.$refs.note[index];
                    const from = this.$refs.notes.scrollTop;
                    const to = $note.offsetTop - $ref.getBoundingClientRect().top;
                    this.scrollNote.from(from).to(to).play();
                }
            },

            hideNote (event) {
                let parent = event.target;
                while (parent) {
                    if (parent === this.$refs.notes) return;
                    parent = parent.parentNode;
                }
                this.opened = false;
            },

            setNotes () {
                this.refs = Array.from(this.$refs.text.querySelectorAll('[data-reference]'));
                this.notes = this.refs.map(($ref, index) => {
                    $ref.onclick = () => this.showNote(index);
                    let text = $ref.getAttribute('data-text');
                    let image = $ref.getAttribute('data-image');
                    if (image) image = `${this.baseURL}/assets/${image}`;
                    return { text, image }
                })
            }

        },

        watch: {

            text () {
                this.$nextTick(this.setNotes);
            }

        },

        mounted () {
            this.setNotes();
            document.addEventListener('click', this.hideNote, true);
        },

        destroyed () {
            document.removeEventListener('click', this.hideNote, true);
        }


    }

</script>
