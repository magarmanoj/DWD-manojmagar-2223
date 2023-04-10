const DOM = {
  dashboardFavs: document.querySelector('.dashBoard_list'),
  list: document.querySelector('.list'),
  lblMsgList: document.querySelector('#lblMsgList'),

  delete: document.querySelector('.delete'),
  start: document.querySelector('.start'),
  stop: document.querySelector('.stop'),
  clearAll: document.querySelector('.clearAll'),

  sectionMiddle:document.querySelector('.section_middle'),

  buttonsBackground: document.querySelectorAll('.sound__background'),
  searchs: document.querySelector('#inpSearch'),
  btnSearch: document.querySelector('.btnSearch'),
  buttons: document.querySelectorAll('.sound__button'),
  favoriten: document.querySelectorAll('.favorite'),
  durations: document.querySelector('.sound-time'),
  wave: document.querySelector('.sound-waveform'),
  msg: document.querySelector('#lblMsg'),
  email: document.querySelector('.email'),

  randomGif: document.querySelector('.randomGif')
};

let currentAudio = null;
let infos = [];
const apiKey = '2NyW7omHomOYDbyvmxizDsTZxSRLdgxH1JscuTKD';
const preview = 'preview-hq-mp3';
const savedSounds = JSON.parse(localStorage.getItem('savedSounds')) || [];

// add hidden css to sectionMiddle or randomGIF
DOM.sectionMiddle.classList.add('hidden');
DOM.randomGif.classList.add('hidden');

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

// shows the Images depending on whether its in dashboard or not 
function showImageTime(index, dashBoard, savedSounds) {
  const sound = dashBoard ? savedSounds[index] : infos[index];

  DOM.durations.textContent = Math.round(sound.duration);
  DOM.wave.src = sound.images.waveform_l;

  if (dashBoard || infos.length > 0) {
    DOM.wave.classList.remove('hidden');
    DOM.durations.classList.remove('hidden');
  } else {
    DOM.wave.classList.add('hidden');
  }
}

// buttons and sound 
function playSound(sound) {
  const audio = new Audio(sound.previews[preview]);
  const duration = Math.round(sound.duration);

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

    // removes gif wanneer er geen geluiden meer afgespeeld is of klaar is 
    removeGif();
  });

  // https://developer.chrome.com/blog/play-request-was-interrupted/
  const playPromise = currentAudio.play();

  if (playPromise != undefined) {
    playPromise.catch((error) => {
        if (error.name == 'AbortError') {
          // Als de fout een "AbortError" is, probeer dan opnieuw het geluid af te spelen
          return currentAudio.play();
        }
        console.error('Error playing audio:', error);
      }).catch((error) => {
        console.error('Error playing audio after retry:', error);
      });
  }
  DOM.randomGif.classList.remove('hidden');
  getRandomGif();
}

// Eventlistener to buttons and toggle active 
DOM.buttons.forEach((button, i) => {
  button.addEventListener('click', function() {
    const sound = infos[i];
    DOM.buttons.forEach((clicked) => {
      if (clicked != this) {
        clicked.classList.remove('active');
      }
    });
    this.classList.toggle('active');

    // check if the button is toggled on before playing the sound
    if (this.classList.contains('active')) {
      // check if there is currently a sound playing and if it is the same as the one associated with the clicked button
      if (currentAudio != null && currentAudio.src == sound.previews[preview]) {
        currentAudio.pause();
        currentAudio = null;
        removeGif();
      } else {
        playSound(sound);
      }

      // false because this is not a dashboard.
      showImageTime(i, false, savedSounds);
    } else {
      // if the button is toggled off, pause the sound and remove any associated GIF
      if (currentAudio != null && currentAudio.src == sound.previews[preview]) {
        currentAudio.pause();
        currentAudio = null;
        removeGif();
      }
    }
  });
});


// localstorage data in dashboard after refreshing the page
savedSounds.forEach((sound, index) => {
  createLi(sound, index, DOM.list, true);
});
DOM.dashboardFavs.appendChild(DOM.list);

// favorite
document.querySelector('.favorite').addEventListener('click', function(e) { 
  if (!e.target.classList.contains('material-symbols-outlined')) return;
  const btnFav = e.target;
  e.preventDefault();

  if (infos == '') return; 
  const index = parseInt(btnFav.getAttribute('data-index'));
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
  createLi(sound, index, document.querySelector('.list'), false);
  showImageTime(index, false, savedSounds);
  togglePlayButton();
});

// creates a li in ul for the dashboard list
function createLi(sound, index, appendList, dashBoard) {
  const li = document.createElement('li');
  li.textContent = sound.name;
  li.classList.toggle('selected');
  li.addEventListener('click', function() {
    li.classList.toggle('background');
    if (dashBoard) {
      showImageTime(index, true, savedSounds);
    } else {
      showImageTime(index, false, infos);
    }
    startButton(sound);
    stopButton(sound);
    togglePlayButton();
  });
  appendList.appendChild(li);
}

// start button
function startButton(sound) {
  DOM.start.addEventListener('click', function() {
    if (currentAudio == null || currentAudio.src != sound.previews[preview]) return playSound(sound);
  });
}

// stop button
function stopButton(sound) {
  DOM.stop.addEventListener('click', function() {
    if (currentAudio != null && currentAudio.src == sound.previews[preview]) {
      currentAudio.pause();
      currentAudio = null;
      DOM.list.querySelectorAll('.selected').forEach(function(li) {
        li.classList.remove('background');
      });
    }
    DOM.randomGif.classList.add('hidden');
    removeGif();
  });
}

// detele button
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
  selectedItems.length = 0;
  DOM.randomGif.classList.add('hidden');
  removeGif();
});

// clear button
DOM.clearAll.addEventListener('click', function() {
  DOM.list.textContent = '';
  DOM.randomGif.classList.add('hidden');
  removeGif();

  // want als je gwn localStorage.clear(); en er is geen items meer wordt het localStorage null wat later error geeft
  if (localStorage.getItem('savedSounds') != null) {
    localStorage.clear();
    localStorage.setItem('savedSounds', JSON.stringify([]));
  } else {
    localStorage.setItem('savedSounds', JSON.stringify([]));
  }
});

// check if more then 1 item is selected in dashboard or none
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

// search bar
function searchBar() {
  const searchTerm = DOM.searchs.value;
    if (searchTerm == '') {
      DOM.msg.textContent = 'Geef een zoekterm in';
    } else {
      DOM.msg.textContent = '';
      getStatus(searchTerm);
      DOM.buttons.forEach(button => button.classList.remove('active'));
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
      DOM.sectionMiddle.classList.remove('hidden');
    }
}

if (DOM.searchs) {
  DOM.searchs.addEventListener('input', () => {
    const searchTerm = DOM.searchs.value;
    if (searchTerm == '') return DOM.msg.textContent = 'Geef een zoekterm in';
    DOM.msg.textContent = '';
  });

  DOM.searchs.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      searchBar();
    }
  });
}

if (DOM.btnSearch) {
  DOM.btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchBar();
  });
}

// extra redrict to email and api random gif
DOM.email.addEventListener('click', function() {
  window.location.href = 'mailto:manoj.magar@student.odisee.be';
});


// get a random dancing GIF
const apiKeyGiphy = '7nqMzUz44OfqKOghBu5edOL7hw63QUS6';

async function getRandomGif() {
  const search = 'dancing';
  const limit = 50;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&q=${search}&limit=${limit}`;
  const resp = await fetch(url);

  if (!resp.ok) return console.log('Request failed');
  const data = await resp.json();
  const rnd = Math.floor(Math.random() * data.data.length);

  const gifUrl = data.data[rnd].images.original.url;
  DOM.randomGif.innerHTML = `<img src="${gifUrl}">`;
}

function removeGif() {
  DOM.randomGif.innerHTML = '';
  DOM.randomGif.classList.add('hidden');
}

