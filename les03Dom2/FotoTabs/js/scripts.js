const DOM = {
    viewGrid: document.querySelectorAll('.viewGrid'),
    grid: document.querySelector('#grid'),
    navBtnFilters: document.querySelectorAll('.nav__filters a'),
    figures: document.querySelectorAll('figure'),
    numFound: document.querySelector('#numFound'),
    headerView: document.querySelectorAll('.header__view li a')

};


DOM.navBtnFilters.forEach(nav => {
    nav.addEventListener('click', function(){
        totaalFigure = 0
        document.querySelector('.nav__filters a.active').classList.remove('active'),
        nav.classList.add('active');
        // photoFilter(filter);
        DOM.figures.forEach(figure =>{
            figure.classList.remove('hidden');
            if (!figure.dataset.filters.includes(nav.innerHTML) && (nav.innerHTML != 'alle')){
                figure.classList.add('hidden');
                totaalFigure++;
            }
            numFound.innerHTML = DOM.figures.length - totaalFigure;
        });
    });
});

// function photoFilter(filter) {
//     DOM.viewGrid.forEach(photo => {
//         photo.innerHTML = '';
//         let countPhoto = 0;
//         DOM.figure.forEach(btn => {
//             const img = btn.querySelector('img');
//             const figcaption = btn.querySelector('figcaption');
//             const photoHTML = `<figure data-filters="nacht steden">
//                 <img src="${img.src}" alt="">
//                 <figcaption>${figcaption.innerHTML}</figcaption>
//                 </figure>`;
//             const figures = btn.getAttribute('data-filters').split(' ');
//             if (filter == figures[0] || filter == figures[1] && filter != 'alle') {
//                 countPhoto++;
//                 photo.innerHTML += photoHTML;
//                 DOM.numFound.innerHTML = countPhoto;
//             }
//             if (filter == 'alle') {
//                 countPhoto++;
//                 photo.innerHTML += photoHTML;
//                 DOM.numFound.innerHTML = countPhoto;
//             }
//         });
//     });
// };
// niet goed want als je innerHTML veranderd dan kloppen uw code niet meer en is ook taalafhankelijk 
// EN PROBEER ZO VEEL MOGELIJK GEEN HTML CODE TE GEBRUIKEN MAAR MEER CLASS, DATA-ATTRIBUTE EN ZO.


DOM.headerView.forEach(nav => {
    nav.addEventListener('click', function(){
        for (let i = 0; i < DOM.headerView.length; i++) {
            DOM.headerView[i].classList.remove('active');
        }
        nav.classList.add('active');
        if (nav.id == 'lnkViewGrid') {
            DOM.grid.classList.remove('viewList');
            DOM.grid.classList.add('viewGrid');
        } else if (nav.id == 'lnkViewList') {
            DOM.grid.classList.remove('viewGrid');
            DOM.grid.classList.add('viewList');
        }
        const activeFilter = document.querySelector('.nav__filters a.active');
        activeFilter.click();
    });
});

DOM.numFound.innerHTML = DOM.figures.length;