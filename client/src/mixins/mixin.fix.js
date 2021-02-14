export default function ({ minTop, maxTop }) {
    return {

        data () {
            return {
                $nav: null,
                $header: null,
                scrollY: 0,
                scrollDown: false,
                elementTop: 0,
                elementFixed: false
            }
        },

        methods: {

            minTop,
            maxTop,

            getHeight (node) {
                return this[node] ? this[node].offsetHeight : 0
            },

            setScroll () {
                this.scrollY = window.scrollY;
            }

        },

        watch: {

            async '$route.path' () {
                await this.$nextTick()
                this.$header = document.querySelector('.l-header');
            },

            scrollDown (value) {
                if (value && this.elementFixed) {
                    this.$el.style.position = 'absolute';
                    this.$el.style.top = this.scrollY + this.elementTop + 'px';
                    this.elementFixed = false;
                }
                else if (this.elementTop < this.minTop()) {
                    this.$el.style.position = 'absolute';
                    this.$el.style.top = this.scrollY + this.minTop() + 'px';
                }
            },

            scrollY (curr, prev) {
                this.scrollDown = curr > prev;
                this.elementTop = this.$el.getBoundingClientRect().top;
                if (!this.elementFixed && this.elementTop > this.maxTop()) {
                    this.$el.style.position = 'fixed';
                    this.$el.style.top = this.maxTop() + 'px';
                    this.elementFixed = true;
                }
            }

        },

        mounted () {
            this.$nav = document.querySelector('.l-nav');
            this.$header = document.querySelector('.l-header');
            this.setScroll();
            window.addEventListener('scroll', this.setScroll);
        },

        destroyed () {
            window.removeEventListener('scroll', this.setScroll);
        }

    }
}