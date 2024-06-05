
// use shadow dom concepts for all type of DOM mutations
import settingsIconSoundOn from "../../public/assets/images/sound-on.svg";
import settingsIconSoundOff from "../../public/assets/images/sound-off.svg";
import settingsIconDarkTheme from "../../public/assets/images/dark-theme.svg";
import settingsIconLightTheme from "../../public/assets/images/light-theme.svg";

import {handleBoardClick} from "./utils";


export function highlightCurrentPlayer() {
    const scoreBoard = document.getElementById("score-board");
    const scoreBoardFrag = document.createDocumentFragment();
    const scores = scoreBoard.cloneNode(true).querySelectorAll(".scores");
    scores.forEach(element => {
        if("toggleTurn" in element.dataset){
            element.classList.toggle("current-turn")
        }
        scoreBoardFrag.append(element)
    })
    scoreBoard.replaceChildren(scoreBoardFrag);
}

export function renderBoardState(){
    const {board} = window.ticTacToe.appState;
    const cellNodes = document.querySelectorAll(".cell");
    board.map((value, index) => {
        const cellContent = cellNodes[index].textContent.trim();
        if(value !== cellContent && cellContent === "" &&  value !== null){
            const textNode = document.createTextNode(value);
            cellNodes[index].append(textNode) 
        }
    })
}

export function resetBoard(){
    const boardFrag = document.createDocumentFragment();
    const cellNodes = document.querySelectorAll(".cell");
    cellNodes.forEach(cell => boardFrag.append(cell.cloneNode()));
    const cellsToUpdate = boardFrag.querySelectorAll(".cell");
    cellsToUpdate.forEach((cell) => {
        const textNode = document.createTextNode("");
            cell.append(textNode);
    });
    document.getElementById("board").replaceChildren(boardFrag);
}

export function resetGame() {
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