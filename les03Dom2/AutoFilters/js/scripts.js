const DOM = {
    img: document.querySelector('#van'),
    filter: document.querySelectorAll('.filter'),
    normal: document.querySelector('#filter-normal'),
    gray: document.querySelector('#filter-gray'),
    sepia: document.querySelector('#filter-sepia'),
    hue: document.querySelector('#filter-hue'),
    blur: document.querySelector('#filter-blur'),
    slider: document.querySelector('#slider1'),
};

DOM.filter.forEach(button => {
    button.addEventListener('click', function() {
        DOM.img.classList.remove('normal', 'gray', 'sepia', 'hue', 'blur');
        switch (button.id) {
            case 'filter-normal':
                DOM.img.classList.add('normal');
                break;
            case 'filter-gray':
                DOM.img.classList.add('gray');
                break;
            case 'filter-sepia':
                DOM.img.classList.add('sepia');
                break;
            case 'filter-hue':
                DOM.img.classList.add('hue');
                break;
            case 'filter-blur':
                DOM.img.classList.add('blur');
                break;                  
            default:
                break;
        }
    });
});

DOM.slider.addEventListener('input', function() {
    DOM.img.style.opacity = DOM.slider.value;
});
