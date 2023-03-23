const DOM = {
  buttons: document.querySelectorAll('.sound__background'),
  canvas: document.querySelector('.sound-waveform'),
  times: document.querySelector('.sound-time'),
  searchs: document.querySelector('.inpSearch')
};

const sounds = [];

DOM.buttons.forEach((button, i) => {
  const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
  button.style.backgroundColor = bgcolor;
  button.addEventListener('click', () => {
    const sound = sounds[i];
    if (sound && sound.id) {
      playSound(sound);
    }
  });
});


const apiKey = '2NyW7omHomOYDbyvmxizDsTZxSRLdgxH1JscuTKD';

async function getStatus() {
  const search = 'piano';
  const url = `https://freesound.org/apiv2/search/text/?query=${search}&token=${apiKey}`;
  const resp = await fetch(url);

  if (!resp.ok) return console.log('mislukt');
  const data = await resp.json();
  for (let i = 0; i < 5; i++) {
    const sound = data.results[i];
    sounds.push(sound);
    console.log(sounds);
  }
}

// async function playSound(sound) {
//   const url = `https://freesound.org/apiv2/sounds/${sound.id}/?token=${apiKey}`;
//   const resp = await fetch(url);
//   if (!resp.ok) return console.log('mislukt');

//   const data = await resp.json();
//   const audioContext = new AudioContext();
//   const audioBuffer = await fetch(data.previews['preview-hq-mp3']).then(response => response.arrayBuffer());
//   const audioSource = audioContext.createBufferSource();
//   audioContext.decodeAudioData(audioBuffer, decodedData => {
//     audioSource.buffer = decodedData;
//     audioSource.connect(audioContext.destination);
//     audioSource.start();
//   });
// }

getStatus();


// DOM.searchs.addEventListener('change', getStatus);