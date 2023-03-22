// const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
// document.querySelector('#demobutton .sound__background').style.backgroundColor = bgcolor;

const buttons = document.querySelectorAll('.sound__background');
buttons.forEach((button) => {
  // eslint-disable-next-line no-magic-numbers
  const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
  button.style.backgroundColor = bgcolor;
});

const DOM = {
  stats: document.querySelector('.stats')
};

async function getStatus() {
  const apiKey = '4xmKl1khhOcc0dd4FVoWln1OajsH1zwRcQpMdtkC';
  const url = `https://freesound.org/apiv2/search/text/?query=piano&token=${apiKey}`;
  const resp = await fetch(url);

  if (!resp.ok) return console.log('mislukt');
  const data = await resp.json();
  DOM.stats.innerHTML = `${data}`;
}
getStatus();