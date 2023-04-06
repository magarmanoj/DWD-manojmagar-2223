const DOM = {
  dashboardFavs: document.querySelector('.dashBoard_list'),
  list: document.querySelector('.list'),
  selectedItems: document.querySelectorAll('.selected'),
  delete: document.querySelector('.delete'),
  start: document.querySelector('.start'),
  stop: document.querySelector('.stop'),
  clearAll: document.querySelector('.clearAll'),

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
const savedSounds = JSON.parse(localStorage.getItem('savedSounds')) || [];

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

function showImageTime(index, dashBoard) {
  let sound;
  if (dashBoard) {
    sound = savedSounds[index];
  }
  else 
  {
    sound = infos[index];
  }
  DOM.durations.textContent = Math.round(sound.duration);
  DOM.wave.src = sound.images.waveform_l;
  if (dashBoard || infos.length > 0) {
    DOM.wave.classList.remove('hidden');
    DOM.durations.classList.remove('hidden');
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

  DOM.searchs.addEventListener('keyup', async(event) => {
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
  audio.addEventListener('timeupdate', function() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = (duration % 60);

    DOM.durations.textContent = `${minutes}:${seconds}s / ${durationMinutes}:${durationSeconds} s`;
  });
  audio.play();
}

DOM.buttons.forEach((button, i) => {
  button.addEventListener('click', function() {
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

    // false want dit is geen dashboard.
    showImageTime(i, false);
  });
});

savedSounds.forEach((sound, index) => {
  createLi(sound, index, DOM.list);
  startButton(sound);
  stopButton(sound);
});
DOM.dashboardFavs.appendChild(DOM.list);

// favorite
DOM.favoriten.forEach((fav) => {
  fav.addEventListener('click', function(e) {
    e.preventDefault();
    const index = parseInt(e.target.parentNode.getAttribute('data-index'));
    const sound = infos[index];

    // Check if sound is already saved in the dashboard
    const savedSounds = JSON.parse(localStorage.getItem('savedSounds')) || [];
    for (let i = 0; i < savedSounds.length; i++) {
      if (savedSounds[i].id == sound.id) {
        console.log('Sound already in dashboard');
      return;
      }
    }
    savedSounds.push(sound);
    localStorage.setItem('savedSounds', JSON.stringify(savedSounds));
    createLi(sound, index, DOM.dashboardFavs.firstElementChild);
    startButton(sound);
    stopButton(sound);
    showImageTime(index, true);
  });
});

DOM.delete.addEventListener('click', function() {
  const selectedItems = DOM.dashboardFavs.querySelectorAll('.background');
  selectedItems.forEach(item => {
    const itemName = item.textContent;
    const index = savedSounds.indexOf(itemName);
    savedSounds.splice(index, 1);
    localStorage.setItem('savedSounds', JSON.stringify(savedSounds));
    item.remove();
    if (currentAudio != null) {
      currentAudio.pause();
      currentAudio = null;
    }
    DOM.wave.classList.add('hidden');
    DOM.durations.classList.add('hidden');
  });
});

function createLi(sound, index, appendList) {
  const li = document.createElement('li');
  li.textContent = sound.name;
  li.classList.toggle('selected');
  li.addEventListener('click', function() {
    li.classList.toggle('background');
    showImageTime(index, true);
    // togglePlayButton();
  });
  appendList.appendChild(li);
}

function startButton(sound) {
  DOM.start.addEventListener('click', function() {
    playSound(sound);
  });
}

function stopButton(sound) {
  DOM.stop.addEventListener('click', function() {
    if (currentAudio != null && currentAudio.src == sound.previews[preview]) {
      currentAudio.pause();
      currentAudio = null;
      DOM.list.querySelectorAll('.selected').forEach(function(li) {
        li.classList.remove('background');
      });
    }
  });
}

DOM.clearAll.addEventListener('click', function() {
  DOM.list.textContent = '';
});

// function togglePlayButton() {
//   if (DOM.selectedItems.length == 1) {
//     DOM.start.disabled = false;
//   } else {
//     DOM.start.disabled = true;
//   }
// }


// extra redrict to email
DOM.email.addEventListener('click', function() {
  window.location.href = 'mailto:manoj.magar@student.odisee.be';
});
