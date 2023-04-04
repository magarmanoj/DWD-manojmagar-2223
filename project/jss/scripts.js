const DOM = {
  dashboardFavs: document.querySelector('.dashBoard_list'),

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
  const eersteVierGeluiden = data.results.slice(0, 4);

  infos = [];
  for (let i = 0; i < eersteVierGeluiden.length; i++) {
    infos.push(eersteVierGeluiden[i]);
    console.log(infos);
  }
  return infos;
}

function showImageTime(index) {
  const sound = infos[index];
  DOM.durations.textContent = Math.round(sound.duration);
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
  const duration = Math.round(sound.duration);

  // al sound aan het spelen ==>  pasue ELSE currentAudio is audio (new sound)
  if (currentAudio != null) {
    currentAudio.pause();
  }
  currentAudio = audio;
  audio.addEventListener('timeupdate', function () {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = (duration % 60);

    DOM.durations.textContent = `${minutes}:${seconds}s / ${durationMinutes}:${durationSeconds} s`;
  });
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

DOM.dashboardFavs.innerHTML = localStorage.getItem('savedSounds');

// favorite
DOM.favoriten.forEach((fav) => {
  fav.addEventListener('click', function (e) {
    e.preventDefault();
    const index = parseInt(e.target.parentNode.getAttribute('data-index'));
    const sound = infos[index];

    // Check if sound is already saved in the dashboard
    const savedSounds = JSON.parse(localStorage.getItem('savedSounds')) || [];
    if (savedSounds.includes(sound.name)) {
      console.log('Sound already in dashboard');
      return;
    }
    savedSounds.push(sound.name);
    localStorage.setItem('savedSounds', JSON.stringify(savedSounds));
    DOM.dashboardFavs.innerHTML += `${sound.name}\n`;
  });
});


// localStorage.clear();
// extra redrict to email
DOM.email.addEventListener('click', function () {
  window.location.href = 'mailto:manoj.magar@student.odisee.be';
});