import cssVars from 'unitless!$styles/abstract/vars'

export default function ({ minTop, maxTop }) {
    return {

        data () {
            return {
                $nav: null,
                $header: null,
                scrollY: 0,
                scrollDown: false,
                elementTop: 0,
                elementFixed: false,
                fixInitiated: false
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
            },

            fixNormalize () {
                if (!this.fixInitiated) return;
                const navTop = this.$nav.getBoundingClientRect().top;
                window.scrollTo(0, this.scrollY + navTop);
            },

            fixResize () {
                this.fixInitiated = window.innerWidth <= cssVars.smMax;
            },

            fixDestroy () {
                window.removeEventListener('scroll', this.setScroll);
                this.scrollY = 0;
                this.scrollDown = false;
                this.elementFixed = false;
                this.$el.style.position = '';
                this.$el.style.top = '';
            },

            fixInit () {
                window.addEventListener('scroll', this.setScroll);
                this.setScroll();
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
            },

            fixInitiated (value) {
                if (value) this.fixInit();
                else this.fixDestroy();
            }

        },

        mounted () {
            this.$nav = document.querySelector('.l-nav');
            this.$header = document.querySelector('.l-header');
            this.fixResize();
            window.addEventListener('resize', this.fixResize);

        },

        destroyed () {
            this.fixDestroy();
            window.removeEventListener('resize', this.fixResize);
        }

    }
}