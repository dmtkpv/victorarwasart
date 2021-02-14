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


        // line

        @extend %line;
        &:before {
            right: $column-width;
            @include md {  display: none }
        }


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
    // Note
    // --------------------

    .l-article-note {

        @extend %padding;

        span {
            display: block;
            font-size: 10px;
            margin-bottom: 6px;
            color: $red;
            @include sm-md { display: none }
        }

        img {
            width: 100%;
            margin-bottom: $indent-y;
        }

        @include lg-xl {
            position: absolute;
            right: 0;
            width: $column-width;
            padding-top: 0;
            padding-bottom: 0;
            margin-top: -18px;

        }

        @include sm-md {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-width: 300px;
            overflow: auto;
            background: $black;
            border-left: 1px solid $white-transparent;
            z-index: 10;
            &:not(.active) { display: none; }
        }

    }


</style>



<!--
    Template
-->

<template>
    <article class="l-article">
        <div class="l-article-content" v-html="content" ref="content" />
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
                notes: []
            }
        },

        methods: {

            setNotes () {
                const $refs = this.$refs.content.querySelectorAll('[data-reference]');
                $refs.forEach(($ref, i) => {
                    let text = $ref.getAttribute('data-text');
                    let image = $ref.getAttribute('data-image');
                    if (image) image = `${this.baseURL}/assets/${image}`;
                    const $note = createNote(text, image, i);
                    $ref.onclick = () => $note.classList.add('active');
                    $note.onclick = () => $note.classList.remove('active');
                    $ref.parentNode.insertBefore($note, $ref);
                });
            }

        },

        watch: {

            content () {
                this.$nextTick(this.setNotes);
            }

        },

        mounted () {
            this.setNotes();
        }

    }

</script>
