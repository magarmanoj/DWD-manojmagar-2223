const min = 1000;
const max = 9999;
const totaalSpeler = 10000;

// eslint-disable-next-line no-magic-numbers
const winst = [0, 2.5, 10, 100, 500];

const trekken = getalGenereren(min, max);

const resultaten = [0, 0, 0, 0, 0];

for (let i = 0; i < totaalSpeler; i++) {
  const speler = getalGenereren(min, max);
  const count = matchingCijfer(trekken, speler);
  resultaten[count]++;
}

console.log('%c// trekking', 'font-size: 20px; color: purple');
console.log(`%c getrokken getal: ${trekken}`, 'font-size: 15px; color: yellow;');

console.log('%c\n// gokken', 'font-size: 20px; color: purple');
console.log(`%c aantal iteraties: ${totaalSpeler}`, 'font-size: 15px;');

console.log('%c\n// resultaten', 'font-size: 20px; color: purple');
console.log(`%c0 juist: ${resultaten[0]}
1 juist: ${resultaten[1]}
2 juist: ${resultaten[2]}
3 juist: ${resultaten[3]}
4 juist: ${resultaten[4]}`, 'font-size: 15px;');

console.log(`%cgemiddelde winst:  €${gemiddeldeWinst(resultaten, totaalSpeler, winst).toFixed(3)}`, 'padding: 15px; background: grey; color: #bda800; font-size: 20px;');

function getalGenereren(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function matchingCijfer(getrokken, speler) {
  const eenheid = 10;
  const hunderdtal = 100;
  const duizendtal = 1000;
  const tienDuizenTal = 10000;

  let count = 0;
  if ((getrokken % eenheid == speler % eenheid)) {
    count++;
  }
  if ((getrokken % hunderdtal == speler % hunderdtal)) {
    count++;
  }
  if ((getrokken % duizendtal == speler % duizendtal)) {
    count++;
  }
  if ((getrokken % tienDuizenTal == speler % tienDuizenTal)) {
    count++;
  }
  return count;   
}


function gemiddeldeWinst(resultaten, totaalSpeler, winst) {
  let totaalWinst = 0;
  for (let i = 0; i < 5; i++) {
    totaalWinst += resultaten[i] * winst[i];
  }
  return totaalWinst / totaalSpeler;
}