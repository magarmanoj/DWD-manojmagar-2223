// const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
// document.querySelector('#demobutton .sound__background').style.backgroundColor = bgcolor;

const buttons = document.querySelectorAll('.sound__background');
buttons.forEach((button) => {
  const bgcolor = `rgb(${+Math.random() * 255}, ${+Math.random() * 255}, ${+Math.random() * 255})`;
  button.style.backgroundColor = bgcolor;
});

