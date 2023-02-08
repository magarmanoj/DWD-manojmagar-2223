
const players = ['Magnus', 'Eline', 'Ding', 'Judith', 'Praggna'];
const scores = [players.length];
const NUM_DICE = 3;


console.log(`
DOBBELSTENEN
============


aantal deelnemers: ${players.length}`)
for(let i = 0; i < players.length; i++){
    console.log(`${players[i]} gooit: `);
    let dice = [NUM_DICE];
    for(let j = 0; j < NUM_DICE; j++){
        dice[j] = Math.floor(Math.random()*7)+1;
    }
    scores[i] = GetTotal(dice);
    console.log(`${DiceToString(dice)} (${scores[i]} punten)`);
    }

console.log(`\nWINNAAR:`);
console.log("%c" + GetWinner(scores, players), "background: yellow; color: black; font-size: 25px;");


function DiceToString(dice){
    let retval = '';
    for( let d of dice){
        switch (d){
            case 1: retval += '⚀ '; break;
            case 2: retval += '⚁ '; break;
            case 3: retval += '⚂ '; break;
            case 4: retval += '⚃ '; break;
            case 5: retval += '⚄ '; break;
            case 6: retval += '⚅ '; break;
            default: break;
        }
    }
    return retval;
}


function GetTotal(dice){
    let total = 0;
    for(let d of dice){
        total += d;
    }
    return total;
}

function GetWinner(totals, names){
    let winnerIndex = 0;
    let draw =  false;
    for(let i = 1; i < totals.length; i++){
        if(totals[i] == totals[winnerIndex]){
            draw = true;
        }else if(totals[i] > totals[winnerIndex]){
            winnerIndex = i;
            draw = false;
        }
    }
    return draw ? 'gelijkspel' : names[winnerIndex];
}