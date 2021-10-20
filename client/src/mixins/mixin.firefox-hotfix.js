/**
 * .l-modal-artwork
 * .l-artwork-images img glitches on transition (FF)
 * because of .l-modal-artwork position fixed
 */

export default {

    mounted () {

        const fix = () => {
            document.body.offsetHeight; // forces reflow
            this.firefoxHotFix = requestAnimationFrame(fix);
        }

        fix()

    },

    destroyed () {
        cancelAnimationFrame(this.firefoxHotFix);
    }

}
