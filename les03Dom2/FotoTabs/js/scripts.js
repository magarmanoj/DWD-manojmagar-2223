const DOM = {
    viewGrid: document.querySelectorAll('.viewGrid'),
    grid: document.querySelector('#grid'),
    navBtn: document.querySelectorAll('.button'),
    figure: document.querySelectorAll('figure'),
    numFound: document.querySelector('#numFound'),
    headerView: document.querySelectorAll('.header__view li a')
    
};


DOM.navBtn.forEach(nav => {
    nav.addEventListener('click', function() {
        for (let i = 0; i < DOM.navBtn.length; i++) {
            DOM.navBtn[i].classList.remove('active');
        }
        nav.classList.add('active');
        const filter = nav.getAttribute('data-filter');
        photoFilter(filter);
    });
});

function photoFilter(filter) {
    DOM.viewGrid.forEach(photo => {  
        photo.innerHTML = '';
        let countPhoto = 0;
        DOM.figure.forEach(btn => {         
            const img = btn.querySelector('img');
            const figcaption = btn.querySelector('figcaption');
            const photoHTML = `<figure data-filters="nacht steden">
                <img src="${img.src}" alt="">
                <figcaption>${figcaption.innerHTML}</figcaption>
             </figure>`;
            const figures = btn.getAttribute('data-filters').split(' ');
            if (filter == figures[0] || filter == figures[1] && filter != 'alle') {   
                countPhoto++;          
                photo.innerHTML += photoHTML;
                DOM.numFound.innerHTML = countPhoto;  
            }
            if (filter == 'alle') {
                countPhoto++; 
                photo.innerHTML += photoHTML;
                DOM.numFound.innerHTML = countPhoto; 
            }                
        });        
    });
}


DOM.headerView.forEach(nav => {
    nav.addEventListener('click', function() {
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
    });
});
