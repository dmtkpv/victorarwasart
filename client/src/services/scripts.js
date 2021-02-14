if (!NODE) {

    function resize () {
        const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.documentElement.style.setProperty('--windowWidth', width + 'px');
        document.documentElement.style.setProperty('--windowHeight', height + 'px');
        window.appRealWidth = width;
        window.appRealHeight = height;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);

}
