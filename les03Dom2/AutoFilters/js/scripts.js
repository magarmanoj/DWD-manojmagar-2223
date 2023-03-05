const DOM = {
    img: document.querySelector('#van'),
    filter: document.querySelectorAll('.filter'),
    normal: document.querySelector('#filter-normal'),
    gray: document.querySelector('#filter-gray'),
    sepia: document.querySelector('#filter-sepia'),
    hue: document.querySelector('#filter-hue'),
    blur: document.querySelector('#filter-blur'),
    slider: document.querySelector('#slider1'),
    lblslider: document.querySelector('#slider1-val')
};

DOM.filter.forEach(button => {
    button.addEventListener('click', function() {
        DOM.filter.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('after');        
        });
        button.classList.add('after');
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

// andere manier om te maken (gebruik van list)
// const filterList = {
//     'filter-normal': 'normal',
//     'filter-gray': 'grayscale',
//     'filter-sepia': 'sepia',
//     'filter-hue': 'hue',
//     'filter-blur': 'blur'
// };

// DOM.filter.forEach(button => {
//     button.addEventListener('click', function() {
//         DOM.filter.forEach(btn => {
//             btn.classList.remove('active');
//             btn.classList.remove('after');        
//         });
//         button.classList.add('after');
//         const list = filterList[button.id];
//         DOM.img.classList.remove('normal', 'gray', 'sepia', 'hue', 'blur');
//         DOM.img.classList.add(list);
//         });
// });


DOM.slider.addEventListener('input', function() {
    DOM.img.style.opacity = DOM.slider.value;
    DOM.lblslider.innerHTML = `${DOM.slider.value * 100}%`;
});
