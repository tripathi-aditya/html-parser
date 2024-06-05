export function isDraw(board){
    return !board.some(turn => turn === null)  
  }
  
  
  export function checkForWinner(board){
      // improve this
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


 export function handleBoardClick(e){
    const {appState, dispatchAppEvent} = window.ticTacToe;
    const cell = e.target.getAttribute('data-cell-id');
    const newBoardState = [...appState.board];
    if(newBoardState[cell] == null){
        newBoardState[cell] = appState.currentPlayer;
        dispatchAppEvent("PLAY_TURN", {...appState, board: newBoardState});
    if(checkForWinner(newBoardState)){
        const {currentPlayer} = appState;
        dispatchAppEvent("GAME_END", {...appState, [currentPlayer]: appState[currentPlayer] + 1})
        return;
    }else if(isDraw(newBoardState)){
        dispatchAppEvent("GAME_DRAW", {...appState, draw: appState.draw + 1})
        return;
    }
    const newCurrentPlayer = appState.currentPlayer === 'X' ? 'O' : 'X';
    dispatchAppEvent("TOGGLE_TURN", {...window.ticTacToe.appState, currentPlayer: newCurrentPlayer})
    }
}

export function toggleTheme() {
    const {appState, dispatchAppEvent} = window.ticTacToe;
    dispatchAppEvent("APPLY_SETTINGS", {...appState, isDarkTheme: !appState.isDarkTheme })
 }

export function toggleSound(){
   const {appState, dispatchAppEvent} = window.ticTacToe;
   dispatchAppEvent("APPLY_SETTINGS", {...appState, isSound: !appState.isSound })
    
 }


 export function loadRenderAssets() {
    window.ticTacToe.dispatchAppEvent("LOAD_RENDER_ASSETS")
 }