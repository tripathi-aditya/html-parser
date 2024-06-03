
// use shadow dom concepts for all type of DOM mutations
import settingsIconSoundOn from "../assets/images/sound-on.svg";
import settingsIconSoundOff from "../assets/images/sound-off.svg";
import settingsIconDarkTheme from "../assets/images/dark-theme.svg";
import settingsIconLightTheme from "../assets/images/light-theme.svg";

import {handleBoardClick} from "./utils";


export function highlightCurrentPlayer() {
    const {currentPlayer} = window.ticTacToe.appState;
    const nonCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.querySelector(`[data-result="${nonCurrentPlayer}"]`).classList.remove("current-turn")
    document.querySelector(`[data-result="${currentPlayer}"]`).classList.add("current-turn")
}

export function renderBoardState(){
    window.ticTacToe.appState.board.forEach((cellValue, index) => {
        if(cellValue){
            document.querySelector(`[data-cell-id="${index}"]`).innerHTML = cellValue
        }else {
            document.querySelector(`[data-cell-id="${index}"]`).innerHTML = null;
        }
    });
}

export function resetGame() {
    playGameOverAudio();
    const boardElement = document.getElementById('board');
    boardElement.removeEventListener("click", handleBoardClick);
    boardElement.addEventListener("click", () => {
        window.ticTacToe.dispatchAppEvent("GAME_RESET", {...window.ticTacToe.appState, board: Array(9).fill(null)})
        document.getElementById('board').addEventListener('click', handleBoardClick)
    }, {once: true})
}

export function updateThemeSettingUI() {
    const {isDarkTheme} = window.ticTacToe.appState;

    const buttonIcon = document.getElementById("setting-icon-theme");
    if(isDarkTheme){
        buttonIcon.src = settingsIconDarkTheme;
        if(!document.body.classList.contains('dark-theme')) {
            document.body.classList.add('dark-theme');
        }
        document.body.classList.remove('light-theme');
    }else{
        buttonIcon.src = settingsIconLightTheme;
        if(!document.body.classList.contains('light-theme')) {
            document.body.classList.add('light-theme');
        }
        document.body.classList.remove('dark-theme'); 
    }

}

export function updateSoundSettingsUI() {
    const { isSound} = window.ticTacToe.appState;
  
    const soundIcon = document.getElementById("setting-icon-sound");

    soundIcon.src = isSound ? settingsIconSoundOn : settingsIconSoundOff;
}

export function updateGameScoresUI(isDraw) {
    if(isDraw){
        document.querySelector(`[data-result="score-draw"]`).innerHTML = window.ticTacToe.appState.draw;
        return;
    }
    const {appState} = window.ticTacToe;
    const {currentPlayer} = appState;
    document.querySelector(`[data-result="score-${currentPlayer}"]`).innerHTML = appState[currentPlayer];
    
}


export function setGameResultMessage(isDraw){
    if(isDraw){
        document.querySelector('[data-message="board-status"]').innerHTML = "It's a Draw!";
        return;
    }else if (isDraw === false) {
        const {currentPlayer} = window.ticTacToe.appState;
        document.querySelector('[data-message="board-status"]').innerHTML = `Player ${currentPlayer} won the game!`;
        return;
    }
    document.querySelector('[data-message="board-status"]').innerHTML = "";

}