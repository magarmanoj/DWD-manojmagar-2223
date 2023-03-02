const DOM = {
    filterWrapper: document.querySelectorAll('.filter-wrapper'),
    filters: document.querySelector('.filters'),
    normal: document.querySelector('#filter-normal'),
    gray: document.querySelector('#filter-gray'),
    sepia: document.querySelector('#filter-sepia'),
    hue: document.querySelector('#filter-hue'),
    blur: document.querySelector('#filter-blur')
};

DOM.filterWrapper.forEach(lnk => {
    DOM.filters.addEventListener('click', function() {
        document.querySelector('.filter').classList.remove('filter');
        lnk.classList.add('normal');
        lnk.classList.add('gray');
        lnk.classList.add('sepia');
        lnk.classList.add('hue');
        lnk.classList.add('blur');

        console.log('ssdsd');
    });    
});
