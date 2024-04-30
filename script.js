let isCurrentX = true;
let cellsByMark = [null, null, null, null, null, null, null, null, null]
let isWinner = null;

function playTurn(e) {
    const playMark = isCurrentX ? document.createTextNode('X') : document.createTextNode('O');
    cellsByMark[e.currentTarget.getAttribute('data-cell-id')] = isCurrentX ? 'X' : 'O'
    e.currentTarget.appendChild(playMark);
    isWinner = checkWinner(isCurrentX);
    if(isWinner){
        let winner = document.querySelector(`[data-result="${isCurrentX ? 'X' : 'O'}"]`)
        winner.appendChild(document.createTextNode('Winner!'))
    }
    isCurrentX = !isCurrentX;
}

const allEqual = (arr) => arr.every(val => val == arr[0] && val != null)

function checkWinner(isX){
    if(
    allEqual([cellsByMark[0], cellsByMark[1], cellsByMark[2]])
    || allEqual([cellsByMark[0], cellsByMark[4], cellsByMark[8]])
    || allEqual([cellsByMark[0], cellsByMark[3], cellsByMark[6]])
    || allEqual([cellsByMark[1], cellsByMark[4], cellsByMark[7]])
    || allEqual([cellsByMark[2], cellsByMark[4], cellsByMark[6]])
    || allEqual([cellsByMark[2], cellsByMark[5], cellsByMark[8]])
    || allEqual([cellsByMark[3], cellsByMark[4], cellsByMark[5]])
    || allEqual([cellsByMark[6], cellsByMark[7], cellsByMark[8]])
    ){
        return isX ? 'X' : 'O';
    }
    return null;
}

function initialise() {
    const cells = document.getElementsByClassName('cell');

    for(let i = 0; i < cells.length; i++){
        cells.item(i).addEventListener('click', playTurn, {once: 'true'})
    }
}


document.addEventListener('DOMContentLoaded', initialise)
