const figBig = document.querySelector('#figBig');
const thumbLinks = document.querySelectorAll('.thumbs a');
const photoIndex = [];
const next = document.querySelectorAll('#next');
const prev = document.querySelectorAll('#prev');

thumbLinks.forEach((lnk, index) => {
    lnk.addEventListener('click', handleLinkClicks);
    photoIndex.push(index);
    console.log(photoIndex);
});
function handleLinkClicks(e) {
    e.preventDefault();
    figBig.querySelector('img').src = this.href;
    figBig.querySelector('figcaption').innerHTML = this.querySelector('img').alt;
}

next.forEach((button, index) => {
    button.addEventListener('click', function () {
        photoIndex.push(index);
        console.log(photoIndex);

        const next = photoIndex[index]++;
        const nextThumb = thumbLinks[next];
        figBig.querySelector('img').src = nextThumb.href;
        figBig.querySelector('figcaption').innerHTML = nextThumb.querySelector('img').alt;
    });
});


prev.forEach((button, index) => {
    button.addEventListener('click', function() {
        photoIndex.push(index);
        console.log(photoIndex);

        const next = photoIndex[index]--;
        const nextThumb = thumbLinks[next];
        figBig.querySelector('img').src = nextThumb.href;
        figBig.querySelector('figcaption').innerHTML = nextThumb.querySelector('img').alt;
    });
});