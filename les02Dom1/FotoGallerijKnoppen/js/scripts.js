const figBig = document.querySelector('#figBig');
const thumbLinks = document.querySelectorAll('.thumbs a');
const next = document.querySelectorAll('#next');
const prev = document.querySelectorAll('#prev');

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

next.forEach(button => {
    button.addEventListener('click', function() {
        photoIndex++;
        if (photoIndex >= thumbLinks.length) {
            photoIndex = 0;
        }
        handleLinkClicks(thumbLinks[photoIndex]);
    });
});

prev.forEach(button => {
    button.addEventListener('click', function() {
        photoIndex--;
        if (photoIndex < 0) {
            photoIndex = thumbLinks.length - 1;
        }
        handleLinkClicks(thumbLinks[photoIndex]);
    });
});