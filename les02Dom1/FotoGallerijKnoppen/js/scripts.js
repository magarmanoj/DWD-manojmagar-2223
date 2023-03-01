const figBig = document.querySelector('#figBig');
const thumbLinks = document.querySelectorAll('.thumbs a');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

let photoIndex = 0;

thumbLinks.forEach((lnk) => {
    lnk.addEventListener('click', function(e) {
        e.preventDefault();
        handleLinkClicks(lnk);
    });
});

function handleLinkClicks(e) {
    figBig.querySelector('img').src = e.href;
    figBig.querySelector('figcaption').innerHTML = e.querySelector('img').alt;
}

function showPhoto(photoNr) {
    if (photoNr == 'next') {
        photoIndex++;
        if (photoIndex >= thumbLinks.length) {
            photoIndex = 0;
        }
    }
    else {
        photoIndex--;
        if (photoIndex < 0) {
            photoIndex = thumbLinks.length - 1;
        }  
    }
    handleLinkClicks(thumbLinks[photoIndex]);
}

next.addEventListener('click', function() {
    showPhoto('next');
});

prev.addEventListener('click', function() {
    showPhoto('prev');
});

