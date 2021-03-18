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
                margin-bottom: 1em;
            }

            a {
                margin-left: 4px;
                &.active { color: $red; }
                &:last-child { font-size: $large }
                @include md-xl { display: none }
            }

        }


        // text

        .text {

            counter-reset: note;

            p {
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
        z-index: 10;

        @include sm-md {
            width: 100%;
            max-width: 300px;
            border-left: 1px solid $white-transparent;
            transform: translateX(100%);
            transition: transform .3s;
            &.opened { transform: translateX(0) }
        }


    }



    // --------------------
    // Note
    // --------------------

    .l-article-note {

        &:not(:last-child) {
            margin-bottom: $indent-y;
        }

        span {
            display: block;
            font-size: 10px;
            margin-bottom: 6px;
            color: $red;
        }

        img {
            width: 100%;
            margin-bottom: $indent-y;
        }

        @include lg-xl {
            &.hidden {
                display: none;
            }
        }

        @include sm-md {
            &:not(.active) {
                display: none;
            }
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
                <a :class="{ active: !larger }" @click="larger = false">A</a>
                <a :class="{ active: larger }" @click="larger = true">A</a>
            </div>
            <div class="text" ref="text" v-html="text" />
        </div>

        <div class="l-article-notes" ref="notes"></div>

    </article>
</template>



<!--
    Scripts
-->

<script>

    function createNode (html) {
        let $div = document.createElement('div');
        $div.innerHTML = html;
        return $div.firstElementChild;
    }

    function createNote (text, image, index) {
        return createNode(`
            <div class="l-article-note">
                <span>${index + 1}</span>
                ${image ? `<img src="${image}">` : ''}
                ${text}
            </div>
        `);
    }

    export default {

        props: [
            'title',
            'text'
        ],

        data () {
            return {
                refs: [],
                notes: [],
                larger: false
            }
        },

        methods: {

            showRef (index) {
                const $ref = this.refs[index];
                const top = $ref.getBoundingClientRect().top;
                window.scrollTo(0, top + window.scrollY);
            },

            showNote (index) {
                const $note = this.notes[index];
                this.notes.forEach(($note, i) => $note.classList.toggle('active', i === index));
                this.$refs.notes.classList.add('opened');
                this.$refs.notes.scrollTop = $note.offsetTop;
            },

            hideNote (event) {
                let parent = event.target;
                while (parent) {
                    if (parent === this.$refs.notes) return;
                    parent = parent.parentNode;
                }
                this.$refs.notes.classList.remove('opened');
            },

            setNotes () {
                this.notes = [];
                this.refs = this.$refs.text.querySelectorAll('[data-reference]');
                this.refs.forEach(($ref, i) => {
                    let text = $ref.getAttribute('data-text');
                    let image = $ref.getAttribute('data-image');
                    if (image) image = `${this.baseURL}/assets/${image}`;
                    const $note = createNote(text, image, i);
                    this.notes.push($note);
                    this.$refs.notes.appendChild($note);
                    $note.onclick = () => this.showRef(i);
                    $ref.onclick = () => this.showNote(i);
                });
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
