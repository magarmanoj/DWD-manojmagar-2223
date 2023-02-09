const min = 1000;
const max = 9999;
const totaalSpeler = 10000;

const winst = [0, 2.5, 10, 100, 500];

const trekken = getalGenereren();
const resultaten = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

for (let i = 0; i < totaalSpeler; i++) {
  const speler = getalGenereren();
  const gelijk = matchingCijfer(trekken, speler);
  resultaten[gelijk]++;
}


console.log(`%c
//trekking 
    
getrokken getal: ${trekken}`, 'font-size: 15px;');
console.log(`%c
//gokken 
    
aantal iteraties: ${totaalSpeler}`, 'font-size: 15px;');
console.log(`%c
//resultaten
    
0 juist: ${resultaten[0]}
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
    /* const getrokkenStr = getrokken.toString();
    const spelerStr = speler.toString();*/

    for (let i = 0; i < getrokken; i++) {
      if (speler[i] % 10 === getrokken[i] % 10) {
        resultaten[1]++;
      }
      if (speler[i] % 100 == getrokken[i] % 100) {
        resultaten[2]++;
      }
      if (speler[i] % 1000 == getrokken[i] % 1000) {
        resultaten[3]++;
      } else {
        resultaten[0]++;
      }
    }
    return resultaten;
}


function gemiddeldeWinst() {
  let totaalWinst = 0;
  for (let i = 0; i < 5; i++) {
    totaalWinst += resultaten[i] * winst[i];
  }
  return totaalWinst / totaalSpeler;
}