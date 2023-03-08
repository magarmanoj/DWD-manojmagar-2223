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


const filterList = {
    'filter-normal': 'normal',
    'filter-gray': 'gray',
    'filter-sepia': 'sepia',
    'filter-hue': 'hue',
    'filter-blur': 'blur'
};

DOM.filter.forEach(button => {
    button.addEventListener('click', function() {
        DOM.filter.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('after');
        });
        button.classList.add('after');
        DOM.img.classList.remove('normal', 'gray', 'sepia', 'hue', 'blur');
        const list = filterList[button.id];
        DOM.img.classList.remove('normal', 'gray', 'sepia', 'hue', 'blur');
        DOM.img.classList.add(list);
        });

        // button active weg doen doucment.querySelector('button.active').classlist.remove('avtive');
        // btn.classList.add('active');
});

// deze is nog kortere manier (kan nog korter [...] = omzet )

// const filersList = [];
// DOM.filter.forEach(button => {
//     filersList.push(button.dataset.filter);

// });

// DOM.filter.forEach(button => {
//     button.addEventListener('click', function (){
//         for (const filt of filersList){
//             DOM.img.classList.remove(filt);
//         }
//         DOM.img.classList.add(button.dataset.filter);


//     });
// });



// DOM.filter.forEach(button => {
//     button.addEventListener('click', function () {
//         DOM.filter.forEach(btn => {
//             btn.classList.remove('active');
//             btn.classList.remove('after');
//         });
//         button.classList.add('after');
//         DOM.img.classList.remove('normal', 'gray', 'sepia', 'hue', 'blur');
//         switch (button.id) {
//             case 'filter-normal':
//                 DOM.img.classList.add('normal');
//                 break;
//             case 'filter-gray':
//                 DOM.img.classList.add('gray');
//                 break;
//             case 'filter-sepia':
//                 DOM.img.classList.add('sepia');
//                 break;
//             case 'filter-hue':
//                 DOM.img.classList.add('hue');
//                 break;
//             case 'filter-blur':
//                 DOM.img.classList.add('blur');
//                 break;
//             default:
//                 break;
//         }
//     });
// });  NIET GOED WANT ALS JE BUTTON TOEVOEGD OF VERWIJDERED KLOPT DE CODE NIET MEER


DOM.slider.addEventListener('input', function() {
    DOM.img.style.opacity = DOM.slider.value;
    DOM.lblslider.innerHTML = `${Math.round(DOM.slider.value * 100)}%`;
    DOM.filter.forEach(button => {
        button.classList.remove('after');
    });
});
