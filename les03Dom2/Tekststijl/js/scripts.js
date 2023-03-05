const DOM = {
  slider: document.querySelector('#slider1'),
  lblslider: document.querySelector('#sliderVal'),
  tekst: document.querySelector('.randomTekst p'),
  kleur: document.querySelector('#kleur'),
  stijlBtn: document.querySelectorAll('button'),
  stijl1: document.querySelector('.stijl1'),
  stijl2: document.querySelector('.stijl2'),
  stijl3: document.querySelector('.stijl3'),
  checkboxes: document.querySelectorAll('input[type="checkbox"]')
};

DOM.stijlBtn.forEach(btn => {
  btn.addEventListener('click', function () {
    console.log(btn.id);
    DOM.tekst.classList.remove('style1', 'style2', 'style3');
    if (btn.id == 'stijl1') {
      btn.classList.add('button');
      DOM.tekst.classList.add('style1');
    } else if (btn.id == 'stijl2') {
      DOM.tekst.classList.add('style2');
    } else if (btn.id == 'stijl3') {
      DOM.tekst.classList.add('style3');
    }
  });
});

DOM.slider.addEventListener('input', function () {
  DOM.lblslider.innerHTML = `${DOM.slider.value}px`;
  DOM.tekst.style.fontSize = `${DOM.slider.value}px`;
});

DOM.kleur.addEventListener('input', function () {
  DOM.tekst.style.color = DOM.kleur.value;
});

DOM.checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const effect = checkbox.getAttribute('data-effect');
    if (checkbox.checked) {
      DOM.tekst.classList.add(effect);
    } else {
      DOM.tekst.classList.remove(effect);
    }
  });
});
