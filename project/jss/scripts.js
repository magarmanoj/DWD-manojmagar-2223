const DOM = {
  buttonsBackground: document.querySelectorAll('.sound__background'),
  canvas: document.querySelector('.sound-waveform'),
  times: document.querySelector('.sound-time'),
  searchs: document.querySelector('#inpSearch'),
  buttons: document.querySelectorAll('.sound__button'),
  favoriten: document.querySelectorAll('.fav_icon'),


  durations: document.querySelector('.sound-time'),
  wave: document.querySelector('.sound-waveform')
  
};

let sounds = [];
const apiKey = '2NyW7omHomOYDbyvmxizDsTZxSRLdgxH1JscuTKD';

DOM.buttonsBackground.forEach((button) => {
  // eslint-disable-next-line no-magic-numbers
  const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
  button.style.backgroundColor = bgcolor;
});

// van FreeSound API geluiden opvragen
async function getStatus(search) {
  const url = `https://freesound.org/apiv2/search/text/?query=${search}&token=${apiKey}&fields=id,name,previews,duration,images`;
  const resp = await fetch(url);

  if (!resp.ok) return console.log('mislukt');
  const data = await resp.json();
  const eersteVierSounds = data.results.slice(0, 4);

  sounds = [];
  for (let i = 0; i < eersteVierSounds.length; i++) {
    sounds.push(eersteVierSounds[i]);
  }
  return eersteVierSounds;
}

// search bar
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

// buttons and sound 
let currentAudio = null;

function playSound(sound) {
  const audio = new Audio(sound.previews['preview-hq-mp3']);

  // al sound aan het spelen ==>  pasue ELSE currentAudio is audio (new sound)
  if (currentAudio != null) {
    currentAudio.pause();
  }
  currentAudio = audio;
  audio.play();
}

DOM.buttons.forEach((button, i) => {
  button.addEventListener('click', function() {
    const sound = sounds[i];
    console.log(`button is clicked and sound is: ${sound.id}`);

    // checks als er sound aan het spelen is en of het zelfde sound is dan vorige ==> pause ELSE playSound
    if (currentAudio != null && currentAudio.src == sound.previews['preview-hq-mp3']) {
      currentAudio.pause();
      currentAudio = null;
    } else {
      playSound(sound);
    }
  });
});

// favorite
DOM.favoriten.forEach(fav => {
  fav.addEventListener('click', function(e) {
    e.preventDefault();
  });
});
