
let board = Array(9).fill(null)
let currentPlayer = "X";  //symbol
const scores = {
    X: 0,
    draw: 0,
    O: 0
}


function toggleCurrentPlayer() {
    document.querySelector(`[data-result="${currentPlayer}"]`).classList.remove("current-turn")
    currentPlayer =  currentPlayer === "X" ? "O" : "X";
    document.querySelector(`[data-result="${currentPlayer}"]`).classList.add("current-turn")
}


function renderBoardState(){
    board.forEach((cellValue, index) => {
        if(cellValue){
            document.querySelector(`[data-cell-id="${index}"]`).innerHTML = cellValue
        }else {
            document.querySelector(`[data-cell-id="${index}"]`).innerHTML = null;
        }
    });
}

function updateBoardState(e){
    const baordCellIndex = e.target.getAttribute('data-cell-id')
    if(board[baordCellIndex] === null){
        board[baordCellIndex] = currentPlayer;
        return true;
    }
    return false;
   
}


function handleBoardClick(e){
    if(!updateBoardState(e)){
        return;
    };
    renderBoardState();
    const winner = checkWinner(currentPlayer)
    if(winner || !board.some(turn => turn === null)){
        document.dispatchEvent(new CustomEvent("gameEnd", {detail: {isDraw: winner ? false : true, winner}, bubbles: true}))
        return;
    }
    toggleCurrentPlayer();
}



function handleResults(e){
    const {winner, isDraw} = e.detail;

    if(isDraw){
        scores['draw'] = scores['draw'] + 1;
        document.querySelector('[data-message="board-status"]').innerHTML = 'It is a draw!'
    }else{
        scores[winner] = scores[winner] + 1;
        document.querySelector('[data-message="board-status"]').innerHTML = `Player ${winner} won the game!`
    }
    Object.keys(scores).forEach(scoreType => document.querySelector(`[data-result="score-${scoreType}"]`).innerHTML = scores[scoreType]);
    const boardElement = document.getElementById('board');
    boardElement.removeEventListener("click", handleBoardClick);
    boardElement.addEventListener("click", () => {
        resetGame();
        document.getElementById('board').addEventListener('click', handleBoardClick)
    }, {once: true})
    
}

function resetGame() {
    board = Array(9).fill(null);
    document.querySelectorAll(`[data-result]`).forEach(player => player.classList.remove("current-turn"))
    currentPlayer= "X";
    document.querySelector(`[data-result="${currentPlayer}"]`).classList.add("current-turn")
    renderBoardState();


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
