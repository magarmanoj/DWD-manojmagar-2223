const DOM = {
  buttonsBackground: document.querySelectorAll('.sound__background'),
  canvas: document.querySelector('.sound-waveform'),
  times: document.querySelector('.sound-time'),
  searchs: document.querySelector('#inpSearch'),
  buttons: document.querySelector('.sound__button')
};

const sounds = [];

DOM.buttonsBackground.forEach((button, i) => {
  const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
  button.style.backgroundColor = bgcolor;
  const search = button.dataset.searchTerm;
  let soundInfo = getStatus(search);
  DOM.buttons.addEventListener('click', () => {
    soundInfo = sounds[i];
    playSound(soundInfo);
  });
});

const apiKey = '2NyW7omHomOYDbyvmxizDsTZxSRLdgxH1JscuTKD';

async function getStatus(search) {
  const url = `https://freesound.org/apiv2/search/text/?query=${search}&token=${apiKey}`;
  const resp = await fetch(url);

  if (!resp.ok) return console.log('mislukt');
  const data = await resp.json();
  const eersteVierSounds = data.results.slice(0, 4);
  sounds.push(eersteVierSounds);
  console.log(sounds);
  return eersteVierSounds;
}

if (DOM.searchs) {
  DOM.searchs.addEventListener('keyup', async(event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchTerm = DOM.searchs.value;
      await getStatus(searchTerm);
      DOM.searchs.value = '';
    }
  });
}
