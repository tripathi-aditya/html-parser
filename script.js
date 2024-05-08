
let board = [null, null, null, null, null, null, null, null, null]

const players = [{name: "", symbol: "X"}, {name: "", symbol: "O"}];

let currentPlayer = "X";  //symbol


function toggleCurrentPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


function renderBoardState(){
    board.forEach((cellValue, index) => {
        if(cellValue){
            document.querySelector(`[data-cell-id="${index}"]`).innerHTML = cellValue
        }
    });
}

function updateBoardState(e){
    const baordCellIndex = e.target.getAttribute('data-cell-id')
    board[baordCellIndex] = currentPlayer;
}


function handleBoardClick(e){
    updateBoardState(e);
    renderBoardState();
    const winner = checkWinner(currentPlayer)
    if(winner) document.dispatchEvent(new CustomEvent("gameEnd", {detail: {isDraw: false, winner}}))
    if(!board.some(turn => turn === null)) document.dispatchEvent(new CustomEvent("gameEnd", {detail: {isDraw: true}}))
    toggleCurrentPlayer();
}


function handleResults(e){
    const {winner} = e.detail;
    let winnerElement = document.querySelector(`[data-result="${winner}"]`)
    winnerElement.appendChild(document.createTextNode('Winner!'))
    document.getElementById('board').removeEventListener("click", handleBoardClick);

}

document.getElementById('board').addEventListener('click', handleBoardClick);
document.addEventListener("gameEnd", handleResults)




function checkWinner(currentPlayer){
    const allEqual = (arr) => arr.every(val => val == arr[0] && val != null)
    if(
    allEqual([board[0], board[1], board[2]])
    || allEqual([board[0], board[4], board[8]])
    || allEqual([board[0], board[3], board[6]])
    || allEqual([board[1], board[4], board[7]])
    || allEqual([board[2], board[4], board[6]])
    || allEqual([board[2], board[5], board[8]])
    || allEqual([board[3], board[4], board[5]])
    || allEqual([board[6], board[7], board[8]])
    ){
        return currentPlayer;
    }
    return null;
}
