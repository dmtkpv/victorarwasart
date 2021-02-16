<!--
    Styles
-->

<style lang="scss">
    .l-modal-inquire {



        // --------------------
        // Common
        // --------------------

        @extend %u-stretch;
        @extend %padding;
        position: fixed;
        display: flex;
        flex-flow: column nowrap;
        overflow: auto;
        background: rgba($black, .8);

        %cell {
            padding: 12px $indent-x;
        }



        // --------------------
        // Window
        // --------------------

        .window {
            position: relative;
            background: $black;
            max-width: 768px;
            width: 100%;
            margin: auto;
            border: 1px solid $white-transparent;
        }



        // --------------------
        // Form
        // --------------------

        .form {

            .heading {
                @extend %cell;
            }

            .row {
                @extend %u-row;
                align-items: stretch;
                border-top: 1px solid $white-transparent;
                .input { flex-grow: 1; }
            }

            &:invalid input[type=submit] {
                visibility: hidden;
            }

        }



        // --------------------
        // Form elements
        // --------------------

        label {
            @extend %cell;
            flex: 0 0 200px;
            border-right: 1px solid $white-transparent;
            @include sm { display: none; }
        }

        .subject {
            @extend %cell;
            white-space: pre-line;
            color: $gray;
        }

        input {
            height: 100%;
            @extend %cell;
        }

        .message {
            height: 200px;
            @extend %cell;
        }

        ::placeholder {
            @include md-xl { color: transparent; }
            @include sm { color: $white; }
        }



        // --------------------
        // Success
        // --------------------

        .success {

            @extend %u-stretch;
            position: absolute;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            background: $black;

            svg {
                margin-top: 36px;
                width: 70px;
            }

        }

    }



</style>



<!--
    Template
-->

<template>
    <div class="l-modal-inquire" @click="close">
        <div class="window">


            <!-- form -->

            <form class="form" @submit="submit">

                <div class="heading">Inquiry</div>

                <div class="row">
                    <label>Subject</label>
                    <div class="input">
                        <p class="subject">{{ subject }}</p>
                    </div>
                </div>

                <div class="row">
                    <label>Name</label>
                    <div class="input">
                        <input type="text" v-model="model.name" required placeholder="Name">
                    </div>
                </div>

                <div class="row">
                    <label>Email</label>
                    <div class="input">
                        <input type="email" v-model="model.email" required placeholder="Email">
                    </div>
                </div>

                <div class="row">
                    <label>Message</label>
                    <div class="input">
                        <textarea class="message" v-model="model.message" required placeholder="Message" />
                    </div>
                </div>

                <div class="row">
                    <label />
                    <div class="input">
                        <input type="submit" value="Send">
                    </div>
                </div>

            </form>


            <!-- success -->

            <div class="success" v-show="success" @click="cancel">
                <p>Your inquiry was sent</p>
                <svg-logo />
            </div>


        </div>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import svgLogo from '$svg/logo'

    export default {

        components: {
            svgLogo
        },

        props: [
            'subject'
        ],

        data () {
            return {
                success: false,
                model: {
                    name: '',
                    email: '',
                    message: ''
                }
            }
        },


        methods: {

            submit (event) {
                event.preventDefault();
                this.$store.commit('cancel', 'email');
                this.$store.dispatch('request', ['email', { ...this.model, subject: this.subject }]);
                this.success = true;
            },

            cancel () {
                this.$store.commit('storage/set', ['inquire', null]);
            },

            close (event) {
                if (event.target === this.$el) this.cancel();
            }

        }

    }

</script>
