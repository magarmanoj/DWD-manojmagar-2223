const DOM = {
    photos: document.querySelectorAll('.soortPralines li a img'),
    naam: document.querySelector('#naam'),
    calorieën: document.querySelector('#calorieën'),
    beschrijving: document.querySelector('#beschrijving'),

};

DOM.photos.forEach(photo => {
    photo.addEventListener('click', function(e) {
        e.preventDefault();
        DOM.photos.forEach(active => active.classList.remove('active'));
        photo.classList.add('active');
        DOM.naam.innerHTML = photo.getAttribute('alt');
        DOM.calorieën.innerHTML = photo.parentNode.parentNode.getAttribute('data-calorieën');
        DOM.beschrijving.innerHTML = photo.parentNode.parentNode.getAttribute('data-beschrijving');
    });    
});

