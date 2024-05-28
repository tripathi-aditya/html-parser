const { dispatchAppEvent} = window.ticTacToe;

document.getElementById('board').addEventListener('click', handleBoardClick);

function highlightCurrentPlayer(newCurrentPlayer) {
    document.querySelector(`[data-result="${window.ticTacToe.appState.currentPlayer}"]`).classList.remove("current-turn")
    document.querySelector(`[data-result="${newCurrentPlayer}"]`).classList.add("current-turn")
}

function renderBoardState(board){
    (board ? board : window.ticTacToe.appState.board).forEach((cellValue, index) => {
        if(cellValue){
            document.querySelector(`[data-cell-id="${index}"]`).innerHTML = cellValue
        }else {
            document.querySelector(`[data-cell-id="${index}"]`).innerHTML = null;
        }
    });
}


function handleBoardClick(e){
    const {board, currentPlayer} = window.ticTacToe.appState;
    const cell = e.target.getAttribute('data-cell-id');
    const newBoardState = [...board];
    if(newBoardState[cell] == null){
        newBoardState[cell] = currentPlayer;
    dispatchAppEvent("PLAY_TURN", {...window.ticTacToe.appState, board: newBoardState});
    if(checkForWinner(newBoardState)){
        dispatchAppEvent("GAME_END", {currentPlayer})
        return;
    }else if(isDraw(newBoardState)){
        dispatchAppEvent("GAME_DRAW", {})
        return;
    }
    const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    dispatchAppEvent("TOGGLE_TURN", {...window.ticTacToe.appState, currentPlayer: newCurrentPlayer})
    }
    
}


function resetGame() {
    const boardElement = document.getElementById('board');
    boardElement.removeEventListener("click", handleBoardClick);
    boardElement.addEventListener("click", () => {
        dispatchAppEvent("GAME_RESET", {...window.ticTacToe.appState, board: Array(9).fill(null)})
        document.getElementById('board').addEventListener('click', handleBoardClick)
    }, {once: true})
}

function isDraw(board){
  return !board.some(turn => turn === null)  
}

function checkForWinner(board){
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
        return true;
    }
    return false;
}
