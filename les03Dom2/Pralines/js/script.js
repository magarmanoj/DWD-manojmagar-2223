const DOM = {
    photos: document.querySelectorAll('.soortPralines li img'),
    naam: document.querySelector('#naam'),
    calorieën: document.querySelector('#calorieën'),
    beschrijving: document.querySelector('#beschrijving'),

};

DOM.photos.forEach(photo => {
    photo.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('img.active').classList.remove('active');
        photo.classList.add('active');

        DOM.naam.innerHTML = photo.getAttribute('alt');
        DOM.calorieën.innerHTML = photo.parentNode.dataset.calorieën;
        DOM.beschrijving.innerHTML = photo.parentNode.dataset.beschrijving;
    });    
});

