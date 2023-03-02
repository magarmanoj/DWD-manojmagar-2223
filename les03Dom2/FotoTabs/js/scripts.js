const DOM = {
    viewGrid: document.querySelectorAll('.viewGrid'),
    navBtn: document.querySelectorAll('.button'),
    nacht: document.querySelectorAll('figure[data-filters="nacht steden"]')
};


for (let i = 0; i < DOM.navBtn.length; i++) {
    DOM.navBtn[i].addEventListener('click', function() {
        for (let j = 0; j < DOM.navBtn.length; j++) {
            DOM.navBtn[j].classList.remove('active');
        }
        DOM.navBtn[i].classList.add('active');
        if (DOM.navBtn[i].getAttribute('data-filter') == 'nacht') {
            for (let k = 0; k < DOM.nacht.length; k++) {
                if (DOM.nacht[k].getAttribute('data-filters') == 'nacht steden') {
                    DOM.nacht.classList.remove('')
                  DOM.nacht[k].style.display = 'block';
                } else {
                  DOM.nacht[k].style.display = 'none';
                }
        }  
    }     
    });
}

