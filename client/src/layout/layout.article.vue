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


        // text

        @extend %padding;

        h2 {
            color: $red;
            margin-bottom: $indent-y;
        }
        p {
            margin-top: $indent-y;
        }


        // reference

        counter-reset: note;

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
        <div class="l-article-content" ref="content" v-html="content"/>
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
            'content'
        ],

        data () {
            return {
                refs: [],
                notes: []
            }
        },

        methods: {

            showNote (index) {
                this.notes.forEach(($note, i) => $note.classList.toggle('active', i === index));
                this.$refs.notes.classList.add('opened');
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
                this.refs = this.$refs.content.querySelectorAll('[data-reference]');
                this.refs.forEach(($ref, i) => {
                    let text = $ref.getAttribute('data-text');
                    let image = $ref.getAttribute('data-image');
                    if (image) image = `${this.baseURL}/assets/${image}`;
                    const $note = createNote(text, image, i);
                    this.notes.push($note);
                    this.$refs.notes.appendChild($note);
                    $ref.onclick = () => this.showNote(i);
                });
            },

            scroll () {
                this.refs.forEach(($ref, i) => {
                    const rect = $ref.getBoundingClientRect();
                    const hidden = rect.bottom < 0 || rect.top > window.innerHeight;
                    this.$refs.notes.children[i].classList.toggle('hidden', hidden);
                })
            }

        },

        watch: {

            content () {
                this.$nextTick(this.setNotes);
            }

        },

        mounted () {
            this.setNotes();
            this.scroll();
            window.addEventListener('scroll', this.scroll);
            document.addEventListener('click', this.hideNote, true);
        },

        destroyed () {
            window.removeEventListener('scroll', this.scroll);
            document.removeEventListener('click', this.hideNote, true);
        }


    }

</script>
