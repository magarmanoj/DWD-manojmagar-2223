const figBig = document.querySelector('#figBig');
const thumbLinks = document.querySelectorAll('.thumbs a');

function showImage(lnk) {
   figBig.querySelector('img').src = lnk.href;
   figBig.querySelector('figcaption').innerHTML = lnk.querySelector('img').alt;
   document.querySelector('.thumbs .active').classList.remove('active');
   lnk.classList.add('active');
}

thumbLinks.forEach(lnk => {
   lnk.addEventListener('click', function(e) {
      e.preventDefault();
      showImage(lnk);
   });
});
