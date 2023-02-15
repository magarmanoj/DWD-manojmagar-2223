
const players = ['Magnus', 'Eline', 'Ding', 'Judith', 'Praggna'];
const scores = [];
const NUM_DICE = 3;


// eslint-disable-next-line no-useless-concat
console.log('%c' + '\nDOBBELSTENEN\n'
+ '============\n\n'
+ 'aantal deelnemers:' + (players.length) + ' \n', 'font-size:15px');
for (let i = 0; i < players.length; i++) {
    const dice = [];
    for (let j = 0; j < NUM_DICE; j++) {
        dice[j] = Math.floor(Math.random() * 7) + 1;
    }
    scores[i] = getTotal(dice);
    console.log('%c' + players[i] + 'gooit: ' + (scores[i]) + ' punten', 'font-size:15px');

    // console.log(`${diceToString(dice)} (${scores[i]} punten)`);
    console.log('%c' + diceToString(dice), 'font-size:35px');
}

console.log('%c\nWINNAAR:', 'font-size: 15px;');
console.log('%c' + getWinner(scores, players), 'border:double; padding: 10px; background: yellow; color: black; font-size: 20px;');


function diceToString(dice) {
    let retval = '';
    for (const d of dice) {
        switch (d) {
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


function getTotal(dice) {
    let total = 0;
    for (const d of dice) {
        total += d;
    }
    return total;
}

function getWinner(totals, names) {
    let winnerIndex = 0;
    let draw = false;
    for (let i = 1; i < totals.length; i++) {
        if (totals[i] == totals[winnerIndex]) {
            draw = true;
        } else if (totals[i] > totals[winnerIndex]) {
            winnerIndex = i;
            draw = false;
        }
    }
    return draw ? 'gelijkspel' : names[winnerIndex];
}