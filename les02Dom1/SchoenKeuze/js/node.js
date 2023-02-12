const links = document.querySelectorAll(' #model a');
const img = document.querySelector('img');
const figCap = document.querySelector(' #figShoe figcaption span');

// form checking

const frmOrder = document.querySelector('#frmOrder');
const inpEmail = frmOrder.querySelector('#inpEmail');
const inpMaat = frmOrder.querySelector('#selMeasure');
const msgEmail = frmOrder.querySelector('#msgEmail');
const msgMaat = frmOrder.querySelector('#msgMeasure');

const chkBox = document.querySelectorAll('#accessoires input');

const lblMsg = document.querySelector('#lblMessage');
let naamAccess = '';
let totaalPrijs = 54.99;


const photos = [
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/armory-black.jpg' },
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/gym-red.jpg' },
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/pinksicle.jpg' },
    { src: 'http://127.0.0.1:5500/les02Dom1/SchoenKeuze/img/royal-blue.jpg' },
];


links.forEach((lnk, index) => {
    lnk.addEventListener('click', function(e) {
        e.preventDefault();     
        img.src = photos[index].src;

        // Remove the active class from all links
        links.forEach(link => link.classList.remove('selected'));

        // Add the active class to the clicked link
        lnk.classList.add('selected');
  
        // inplaats van lijst te maken kan je ook direct img veranderen 
        // img.src = lnk.href; of img.querySelector('img').src = lnk.href;
        figCap.innerHTML = lnk.textContent;
    });
});


// disable HTML5 validation
frmOrder.setAttribute('novalidate', 'novalidate');


// form checking
frmOrder.addEventListener('submit', function(e) {
    e.preventDefault();
    let totaalErrors = 0;

    msgEmail.innerHTML = '';
    msgMaat.innerHTML = '';

    if (inpEmail.value == '') {
        msgEmail.innerHTML = 'email mag niet leeg zijn';
        totaalErrors++;
    }

    if (inpMaat.value == '') {
        msgMaat.innerHTML = 'selecteer je maat!';
        totaalErrors++;
    }

    chkBox.forEach(checkbox => {
        if (checkbox.checked) {
            totaalPrijs += +checkbox.value;
            naamAccess += ', ' + checkbox.name;
        }       
    });

    if (totaalErrors == 0) {
        let newNaamAccess = '';
        for (let i = 2; i < naamAccess.length; i++) {
            newNaamAccess += naamAccess[i];
        }

        // andere manier:
        // naamAccess = naamAccess.substr(2); of naamAccess = naamAccess.slice(2);

        naamAccess = newNaamAccess;
        lblMsg.innerHTML = `Je keuze: ${figCap.innerHTML}, maat ${inpMaat.value}, ${naamAccess} (totaalprijs: €${Math.round(totaalPrijs * 100) / 100})`;
        naamAccess = '';
        totaalPrijs = 54.99;
    }
});
