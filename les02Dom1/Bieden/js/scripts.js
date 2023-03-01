const inpNaam = document.querySelector('#naam');
const inpBod = document.querySelector('#bod');
const btn = document.querySelector('button');
const msg = document.querySelector('#lblMsg');
let hoogsteBod = 0;
let hoogsteBidder = '';

btn.addEventListener('click', function(e) {
    e.preventDefault();
    const huidigBod = parseFloat(inpBod.value);
    const huidigBidder = inpNaam.value;
    if (huidigBod > hoogsteBod) {
        hoogsteBod = huidigBod;
        hoogsteBidder = huidigBidder;
        msg.innerHTML = `gefeliciteerd! je hebt momenteel het hoogste bod met een bod van €${hoogsteBod}!`;
    } 
    else if (huidigBod == '' || hoogsteBidder == '') {
        msg.innerHTML = 'er is nog geen bod uitgebracht';
    }
    else if (huidigBod < hoogsteBod) {  
        msg.innerHTML = `jammer! ${hoogsteBidder} heeft een hoger bod`;
    } 
});

