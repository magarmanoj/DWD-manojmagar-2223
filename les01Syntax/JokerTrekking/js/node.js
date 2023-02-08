const min = 1000;
const max = 9999;
const totaalSpeler = 10000;

// const winst = [0, 2.5, 10, 100, 500];
let trekken = getalGenereren();
let play = getalGenereren()

console.log(`
//trekking 
    
getrokken getal: ${trekken}`);
console.log(`
//gokken 
    
aantal iteraties: ${totaalSpeler}`);
console.log(`
//resultaten
    
0 juist: 
1 juist: 
2 juist: 
3 juist:
4 juist: 

gemiddelde winst: ${gemiddeldeWinst()}`);

for (let i = 0; i < totaalSpeler; i++) { /* empty */ }




function getalGenereren() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function matchingCijfer(getrokken, speler) {
    getrokken = trekken.toString();
    speler = play.toString();
    let matched = 0;
    for (let i = 0; i < speler; i++) {
        if (trekken[i] == play[i]) {
            matched++;
        }
    } return matched;
}


function gemiddeldeWinst(){

}
