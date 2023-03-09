const figBig = document.querySelector('#figBig');
const thumbLinks = document.querySelectorAll('.thumbs a');
const navbuttons = document.querySelectorAll('.navbuttons button');
const body = document.querySelector('body');

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

let photoIndex = 0;

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
   showImage(thumbLinks[photoIndex]);
}

navbuttons.forEach(btn => {
   btn.addEventListener('click', function() {
      if (btn.dataset.richting == 'prev') {
         showPhoto('prev');
      } else {
         showPhoto('next');
      }
   });
});


body.addEventListener('keydown', function(e) {
   if (e.key === 'ArrowRight') {
     showPhoto('next');
   } else if (e.key === 'ArrowLeft') {
     showPhoto('prev');

     // photonummer zijn van 0-4 maar e.key is vanaf 1-5 dus je moet -1 doen voor photoIndex
   } else if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
      // stackoverflow https://stackoverflow.com/questions/11884372/ctrl-number-key-using-javascript-in-browser-to-trigger-an-event 
      // ze gebruiken e.keyCode voor de nummer dus ASCII.
      // e.ctrlKey && /[1-4]/.test(e.key) via
      e.preventDefault();
      photoIndex = e.key;
      showPhoto(photoIndex - 1);
    }
});

