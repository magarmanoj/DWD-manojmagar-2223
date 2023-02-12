const links = document.querySelectorAll(' #model a');
const img = document.querySelector('img');
const figcap = document.querySelector(' #figShoe figcaption');

const photos = [
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/armory-black.jpg', caption: 'Armory Black' },
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/gym-red.jpg', caption: 'Gym Red' },
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/pinksicle.jpg', caption: 'Pinksicle' },
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/royal-blue.jpg', caption: 'Royal Blue' },
];


links.forEach((lnk, index) => {
    lnk.addEventListener('click', function(e) {
        e.preventDefault();     
        img.src = photos[index].src;
        figcap.innerHTML = `JORDAN 1 MAIN ${photos[index].caption}`;            
    });
});
