const DOM = {
    photos: document.querySelectorAll('.soortPralines li a img'),
    naam: document.querySelector('#naam'),
    calorieën: document.querySelector('#calorieën'),
    beschrijving: document.querySelector('#beschrijving'),
};

DOM.photos.forEach(photo => {
    photo.addEventListener('click', function(e) {
        e.preventDefault();
        DOM.naam.innerHTML = photo.dataset.naam;
        console.log(photo.dataset.naam);
        DOM.calorieën.innerHTML = photo.dataset.calorieën;
        DOM.beschrijving.innerHTML = photo.dataset.beschrijving;
    });    
});