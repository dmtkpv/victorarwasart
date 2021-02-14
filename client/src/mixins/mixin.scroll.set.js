import cssVars from 'unitless!$styles/abstract/vars'

export default function (key, param) {
    return {

        methods: {

            resize () {
                if (window.innerWidth > cssVars.smMax) this[param] = false;
            }

        },

        watch: {

            [param] (value) {
                this.$store.commit('scroll/set', { [key]: value });
            }

        },

        mounted () {
            window.addEventListener('resize', this.resize);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }
}