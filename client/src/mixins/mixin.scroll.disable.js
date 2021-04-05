export default {

    data () {
        return {
            scrollStartY: 0
        }
    },

    computed: {

        disabledScroll () {
            return this.$store.getters['scroll/disabled']
        }

    },

    watch: {

        disabledScroll (value) {
            if (NODE) return;
            document.body.style.overflow = value ? 'hidden' : '';
        }

    },

    methods: {

        getPageY (event) {
            return (event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0] || event).pageY;
        },

        getScrollableNode ($node) {
            while ($node) {
                if ($node.scrollHeight > $node.clientHeight) return $node;
                $node = $node.parentNode;
            }
            return document.body;
        },

        preventScroll (event) {
            if (event.cancelable) event.preventDefault();
        },

        scrollStart (event) {
            this.scrollStartY = this.getPageY(event);
        },

        scrollMove (event) {
            if (!this.disabledScroll) return;
            let $node = this.getScrollableNode(event.target);
            if ($node === document.body) return this.preventScroll(event);
            let pageY = this.getPageY(event);
            if ($node.scrollTop === 0 && pageY > this.scrollStartY) return this.preventScroll(event);
            if ($node.scrollHeight - $node.scrollTop === $node.clientHeight && pageY < this.scrollStartY) return this.preventScroll(event);
        }

    },

    mounted () {
        document.addEventListener('touchstart', this.scrollStart);
        document.addEventListener('touchmove', this.scrollMove, { passive: false });
    },

    destroyed () {
        document.removeEventListener('touchstart', this.scrollStart);
        document.removeEventListener('touchmove', this.scrollMove);
    }

}