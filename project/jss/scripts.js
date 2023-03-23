const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
document.querySelector('#demobutton .sound__background').style.backgroundColor = bgcolor;


// const buttons = document.querySelectorAll('.sound__background');
// buttons.forEach((button) => {
//   const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
//   button.style.backgroundColor = bgcolor;
// });

// const apiKey = '2NyW7omHomOYDbyvmxizDsTZxSRLdgxH1JscuTKD';
// const search = 'piano';
// const url = `https://freesound.org/apiv2/search/text/?query=${search}&token=${apiKey}`;


// const DOM = {
//   canvas: document.querySelector('#sound-waveform'),
//   times: document.querySelector('#sound-time')
// };

// async function getStatus() {
//   const resp = await fetch(url);

//   if (!resp.ok) return console.log('mislukt');
//   const data = await resp.json();
//   DOM.canvas.innerHTML = data.value;
//   console.log(data);
// }
// getStatus();