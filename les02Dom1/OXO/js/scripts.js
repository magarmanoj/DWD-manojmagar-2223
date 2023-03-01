const btn = document.querySelectorAll('.col_tile');
const winner = document.querySelector('.winner span');
const gelijk = document.querySelector('#draw');
const reset = document.querySelector('.reset');

let currentTurn = 'X';


function buttonClick(event) {
    event.target.textContent = currentTurn;
    event.target.disabled = true;
    checkWinner();

    if (currentTurn == 'X') {
        currentTurn = 'O';
    }
    else {
        currentTurn = 'X';
    }
}

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', buttonClick);
}

function checkWinner() {
    let win = false;
    
    const combinatie = [
        [0, 1, 2], // horizontaal
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // verticaal
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonaal
        [6, 4, 2]
    ];


    combinatie.forEach(function(combo) { 
        if (btn[combo[0]].textContent == btn[combo[1]].textContent && btn[combo[1]].textContent == btn[combo[2]].textContent && btn[combo[0]].textContent != ' ') {
            // eslint-disable-next-line no-useless-concat
            winner.innerHTML = 'winner: ' + 'player ' + currentTurn;
            win = true;
            for (let i = 0; i < btn.length; i++) {
                btn[i].removeEventListener('click', buttonClick);
            }
        }
    });
    if (!win) {
        gameDraw();
    } else {
        return win;
    }
}

function gameDraw() {
    let draw = true;
    for (let i = 0; i < btn.length; i++) {
        if (btn[i].innerHTML == ' ') {
            draw = false;
            return draw;
        }
    }
    if (draw) {
        gelijk.innerHTML = 'Winner: No winner, game it is draw';
    }
    return draw;
}

function resetGame() {
    for (let i = 0; i < btn.length; i++) {
        btn[i].textContent = ' ';
        btn[i].disabled = false;
        btn[i].addEventListener('click', buttonClick);
    }
    winner.innerHTML = ' ';
    gelijk.innerHTML = ' ';
    currentTurn = 'X';
}

reset.addEventListener('click', resetGame);