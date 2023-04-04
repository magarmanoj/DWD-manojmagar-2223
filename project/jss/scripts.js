const DOM = {
  dashboardFavs: document.querySelector('.dashBoard_text'),
  buttonsBackground: document.querySelectorAll('.sound__background'),
  searchs: document.querySelector('#inpSearch'),
  buttons: document.querySelectorAll('.sound__button'),
  favoriten: document.querySelectorAll('.fav_icon'),
  durations: document.querySelector('.sound-time'),
  wave: document.querySelector('.sound-waveform'),
  msg: document.querySelector('#lblMsg'),
  email: document.querySelector('.email')
};


let currentAudio = null;
let infos = [];
const apiKey = '2NyW7omHomOYDbyvmxizDsTZxSRLdgxH1JscuTKD';
const preview = 'preview-hq-mp3';

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

  infos = [];
  for (let i = 0; i < eersteVierSounds.length; i++) {
    infos.push(eersteVierSounds[i]);
    console.log(infos);
  }
  return infos;
}

function showImageTime(index) {
  const sound = infos[index];
  DOM.durations.textContent = sound.duration;
  DOM.wave.src = sound.images.waveform_l;
  if (infos.length > 0) {
    DOM.wave.classList.remove('hidden');
  } else {
    DOM.wave.classList.add('hidden');
  }
}

// search bar
if (DOM.searchs) {
  DOM.searchs.addEventListener('input', () => {
    const searchTerm = DOM.searchs.value;
    if (searchTerm === '') {
      DOM.msg.textContent = 'Geef een zoekterm in';
    } else {
      DOM.msg.textContent = '';
    }
  });

  DOM.searchs.addEventListener('keyup', async (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      const searchTerm = DOM.searchs.value;
      if (searchTerm === '') {
        DOM.msg.textContent = 'Geef een zoekterm in';
      }
      await getStatus(searchTerm);
      DOM.searchs.value = '';
      DOM.buttons.forEach(button => button.classList.remove('active'));
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
    }
  });
}

// buttons and sound 
function playSound(sound) {
  const audio = new Audio(sound.previews[preview]);

  // al sound aan het spelen ==>  pasue ELSE currentAudio is audio (new sound)
  if (currentAudio != null) {
    currentAudio.pause();
  }
  currentAudio = audio;
  audio.play();
}

DOM.buttons.forEach((button, i) => {
  button.addEventListener('click', function () {
    const sound = infos[i];
    DOM.buttons.forEach((clicked) => {
      if (clicked != this) {
        clicked.classList.remove('active');
      }
    });

    this.classList.toggle('active');

    // checks als er sound aan het spelen is en of het zelfde sound is dan vorige ==> pause ELSE playSound
    if (currentAudio != null && currentAudio.src == sound.previews[preview]) {
      currentAudio.pause();
      currentAudio = null;
    } else {
      playSound(sound);
    }
    showImageTime(i);
  });
});

// favorite
DOM.favoriten.forEach((fav) => {
  fav.addEventListener('click', function (e) {
    e.preventDefault();
    const index = parseInt(e.target.parentNode.getAttribute('data-index'));
    const sound = infos[index];

    let savedSounds = localStorage.getItem('savedSounds') || '';
    if (localStorage.getItem('savedSounds')) {
      savedSounds += JSON.parse(localStorage.getItem('savedSounds'));
    }

    // Check if sound is already saved in the dashboard
    if (savedSounds.includes(sound.name)) {
      console.log('Sound already in dashboard');
      return;
    }
    savedSounds += `${sound.name}\n`;
    localStorage.setItem('savedSounds', JSON.stringify(savedSounds));
    DOM.dashboardFavs.innerHTML += savedSounds;
  });
});

// localStorage.clear();

// extra redrict to email
DOM.email.addEventListener('click', function () {
  window.location.href = 'mailto:manoj.magar@student.odisee.be';
});
