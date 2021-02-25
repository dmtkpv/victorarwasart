export default {

    methods: {

        scrollMore () {
            const wh = window.innerHeight;
            const sh = document.documentElement.scrollHeight;
            const st = document.documentElement.scrollTop;
            if (st > sh - wh * 3) this.$emit('more');
        }

    },

    mounted () {
        document.addEventListener('scroll', this.scrollMore);

    },

    unmounted () {
        document.removeEventListener('scroll', this.scrollMore);
    }

}