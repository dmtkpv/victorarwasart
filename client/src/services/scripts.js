if (!NODE) {

    const $parent = document.createElement('div');
    const $child = document.createElement('div');
    $parent.style.overflow = 'scroll';
    $parent.appendChild($child);
    document.body.appendChild($parent);
    const scrollbarWidth = ($parent.offsetWidth - $child.offsetWidth);
    document.body.removeChild($parent);

    function resize () {
        const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.documentElement.style.setProperty('--windowWidth', width + 'px');
        document.documentElement.style.setProperty('--windowHeight', height + 'px');
        document.documentElement.style.setProperty('--documentWidth', (width - scrollbarWidth) + 'px');
        window.appRealWidth = width;
        window.appRealHeight = height;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);

}
