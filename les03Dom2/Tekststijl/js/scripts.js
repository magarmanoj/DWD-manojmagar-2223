const DOM = {
    slider: document.querySelector('#slider1'),
    lblslider: document.querySelector('#sliderVal'),
    tekstAchtergrond: document.querySelector('.randomTekst'),

    tekst: document.querySelector('.randomTekst p'),
    kleur: document.querySelector('#kleur'),
    stijlBtn: document.querySelectorAll('button'),
    stijl1: document.querySelector('.stijl1'),
    stijl2: document.querySelector('.stijl2'),
    stijl3: document.querySelector('.stijl3')
};

DOM.stijlBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        console.log(btn.id);
        DOM.tekst.classList.remove('style1', 'style2', 'style3');
        if (btn.id == 'stijl1') {
            DOM.tekst.classList.add('style1');
          } else if (btn.id == 'stijl2') {
            DOM.tekst.classList.add('style2');
          } else if (btn.id == 'stijl3') {
            DOM.tekst.classList.add('style3');
          }
    });
});

DOM.slider.addEventListener('input', function() {
    DOM.lblslider.innerHTML = `${DOM.slider.value}px`;
    DOM.tekst.style.fontSize = `${DOM.slider.value}px`;
});

DOM.kleur.addEventListener('input', function() {
    DOM.tekst.style.color = DOM.kleur.value;
});

// // als de checkbox wordt aangevinkt, wordt de tekst in het vet gezet, als deze niet wordt aangeduid (else), dan wordt het effect niet meer toegepast op de tekst
// DOM.vet.onclick = function() {
//     if (DOM.vet.checked == true) {
//         DOM.tekst.classList.add('vet');
//     }
//     if (DOM.vet.checked == false) {
//         DOM.tekst.classList.remove('vet');
//     }
// };

// // als de checkbox wordt aangevinkt, wordt de tekst in italics gezet, als deze niet wordt aangeduid (else), dan wordt het effect niet meer toegepast op de tekst
// DOM.schuin.onclick = function() {
//     if (DOM.schuin.checked == true) {
//         DOM.tekst.classList.add('italic');
//     }
//     if (DOM.schuin.checked == false) {
//         DOM.tekst.classList.remove('italic');
//     }
// };

// // als de checkbox wordt aangevinkt, wordt de tekst in CAPS gezet, als deze niet wordt aangeduid (else), dan wordt het effect niet meer toegepast op de tekst
// DOM.hoofdletter.onclick = function() {
//     if (DOM.hoofdletter.checked == true) {
//         DOM.tekst.classList.add('upper');
//     }
//     if (DOM.hoofdletter.checked == false) {
//         DOM.tekst.classList.remove('upper');
//     }
// };
