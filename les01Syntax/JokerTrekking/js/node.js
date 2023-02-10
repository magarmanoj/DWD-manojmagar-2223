const min = 1000;
const max = 9999;
const totaalSpeler = 10000;

const winst = [0, 2.5, 10, 100, 500];

const trekken = getalGenereren();

const resultaten = [0, 0, 0, 0, 0];

for (let i = 0; i < totaalSpeler; i++) {
  const speler = getalGenereren();
  const count = matchingCijfer(trekken, speler);
  resultaten[count]++;
}

console.log('%c//trekking', 'font-size: 20px; color: purple');
console.log(`%c getrokken getal: ${trekken}`, 'font-size: 15px; color: yellow;');

console.log('%c\n//gokken', 'font-size: 20px; color: purple');
console.log(`%c aantal iteraties: ${totaalSpeler}`, 'font-size: 15px;');

console.log('%c\n//resultaten', 'font-size: 20px; color: purple');
console.log(`%c0 juist: ${resultaten[0]}
1 juist: ${resultaten[1]}
2 juist: ${resultaten[2]}
3 juist: ${resultaten[3]}
4 juist: ${resultaten[4]}
`, 'font-size: 15px;');

console.log(`%cgemiddelde winst:  € ${gemiddeldeWinst().toFixed(3)}`, 'padding: 15px; background: grey; color: yellow; font-size: 20px;');

function getalGenereren() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function matchingCijfer(getrokken, speler) {   
    const geTrokken = getrokken;
    const spelers = speler;

    let count = 0;
    if ((geTrokken % 10 == spelers % 10)) {
      count++;
    }
    if ((geTrokken % 100 == spelers % 100)) {
      count++;
    }
    if ((geTrokken % 1000 == spelers % 1000)) {
      count++;
    }
    if ((geTrokken % 10000 == spelers % 10000)) {
      count++;
    }
    return count;
}


function gemiddeldeWinst() {
  let totaalWinst = 0;
  for (let i = 0; i < 5; i++) {
    totaalWinst += resultaten[i] * winst[i];
  }
  return totaalWinst / totaalSpeler;
}