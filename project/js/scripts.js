const DOM = {
  dashboardFavs: document.querySelector('.dashBoard_list'),
  list: document.querySelector('.list'),
  lblMsgList: document.querySelector('#lblMsgList'),

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
  }
  return infos;
}

// search bar
if (DOM.searchs) {
  DOM.searchs.addEventListener('input', () => {
    const searchTerm = DOM.searchs.value;
    if (searchTerm == '') {
      DOM.msg.textContent = 'Geef een zoekterm in';
    } else {
      DOM.msg.textContent = '';
    }
  });

  DOM.searchs.addEventListener('keyup', async(event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      const searchTerm = DOM.searchs.value;
      if (searchTerm == '') {
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
    currentAudio.currentTime = 0;
  }
  currentAudio = audio;
  audio.addEventListener('timeupdate', function() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = (duration % 60);

    DOM.durations.textContent = `Time: ${minutes}:${seconds}s / ${durationMinutes}:${durationSeconds} s`;
  });
  audio.addEventListener('ended', function() {
    currentAudio = null;
  });
  const playPromise = currentAudio.play();
  if (playPromise !== undefined) {
    playPromise
      .catch((error) => {
        if (error.name === 'AbortError') {
          // Als de fout een "AbortError" is, probeer dan opnieuw het geluid af te spelen
          return currentAudio.play();
        }
        console.error('Error playing audio:', error);
      })
      .catch((error) => {
        console.error('Error playing audio after retry:', error);
      });
  }
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

function createLi(sound, index, appendList) {
  const li = document.createElement('li');
  li.textContent = sound.name;
  li.classList.toggle('selected');
  li.addEventListener('click', function() {
    li.classList.toggle('background');
    showImageTime(index, true);
    togglePlayButton();
    startButton(sound);
    stopButton(sound);
  });
  appendList.appendChild(li);
}

const savedSounds = JSON.parse(localStorage.getItem('savedSounds')) || [];
savedSounds.forEach((savedSound, index) => {
  const sound = JSON.parse(savedSound);
  createLi(sound, index, DOM.list);
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
    console.log(savedSounds);
    for (let i = 0; i < savedSounds.length; i++) {
      const savedSound = JSON.parse(savedSounds[i]);
      if (savedSound.id == sound.id) {
        console.log('Sound already in dashboard');
        return;
      }
    }
    savedSounds.push(JSON.stringify(sound));
    localStorage.setItem('savedSounds', JSON.stringify(savedSounds));
    createLi(sound, index, DOM.dashboardFavs.firstElementChild);
    showImageTime(index, false);
  });
});


function showImageTime(index, dashBoard) {
  if (dashBoard) {
    const sound = savedSounds[index];
    const savedSoundArray = JSON.parse(sound);
    DOM.durations.textContent = Math.round(savedSoundArray.duration);
    DOM.wave.src = savedSoundArray.images.waveform_l;
  }
  else 
  {
    const sound = infos[index];
    DOM.durations.textContent = Math.round(sound.duration);
    DOM.wave.src = sound.images.waveform_l;
  }
  
  if (dashBoard || infos.length > 0) {
    DOM.wave.classList.remove('hidden');
    DOM.durations.classList.remove('hidden');
  } else {
    DOM.wave.classList.add('hidden');
  }
}


function startButton(sound) {
  DOM.start.addEventListener('click', function() {
    if (currentAudio == null || currentAudio.src != sound.previews[preview]) {
      playSound(sound);
    }
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

DOM.clearAll.addEventListener('click', function() {
  DOM.list.textContent = '';

  // want als je gwn localStorage.clear(); en er is geen items meer wordt het localStorage null wat later error geeft
  if (localStorage.getItem('savedSounds') != null) {
    localStorage.clear();
    localStorage.setItem('savedSounds', JSON.stringify([]));
  } else {
    localStorage.setItem('savedSounds', JSON.stringify([]));
  }
});

function togglePlayButton() {
  const selectedItems = DOM.list.querySelectorAll('.background');
  if (selectedItems.length == 1) {
    DOM.start.disabled = false;
    DOM.lblMsgList.textContent = '';
  } else {
    DOM.start.disabled = true;
    DOM.lblMsgList.textContent = 'More then 1 items is slected or none';
  }
}


// extra redrict to email
DOM.email.addEventListener('click', function() {
  window.location.href = 'mailto:manoj.magar@student.odisee.be';
});