
import { getSettingsIconDarkTheme, getSettingsIconLightTheme, getSettingsIconSoundOff, getSettingsIconSoundOn } from "./assetLoad";
import {handleBoardClick, toggleSound, toggleTheme} from "./utils";


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
    document.body.classList.toggle('dark-theme', isDarkTheme);
    updateSettingIcons();
}

export function updateSettingIcons() {
    const { isSound, isDarkTheme} = window.ticTacToe.appState;
    const settings = document.getElementById('settings');
    const buttons = settings.cloneNode(true).querySelectorAll('.setting-toggle');
    const settingsFrag = document.createDocumentFragment();
    buttons.forEach((element) => {
        const soundSetting = element.querySelector('#setting-icon-sound');
        const themeSetting = element.querySelector('#setting-icon-theme');
        if(soundSetting){
            soundSetting.src = isSound ? getSettingsIconSoundOn() : getSettingsIconSoundOff();
            element.addEventListener('click', toggleSound);
        }
        else if(themeSetting) {
            themeSetting.src = isDarkTheme ? getSettingsIconDarkTheme() : getSettingsIconLightTheme();
            element.addEventListener('click', toggleTheme);
        }
        settingsFrag.append(element);
    })
    settings.replaceChildren(settingsFrag);
}

export function updateSoundSettingsUI() {
    updateSettingIcons();
}

export function updateGameScoresUI(isDraw) {
    if(isDraw){
        document.querySelector(`[data-result="score-draw"]`).textContent = window.ticTacToe.appState.draw;
        return;
    }
    const {appState} = window.ticTacToe;
    const {currentPlayer} = appState;
    document.querySelector(`[data-result="score-${currentPlayer}"]`).textContent = appState[currentPlayer];
    
}


export function setGameResultMessage(isDraw){
    if(isDraw){
        document.querySelector('[data-message="board-status"]').textContent = "It's a Draw!";
        return;
    }else if (isDraw === false) {
        const {currentPlayer} = window.ticTacToe.appState;

        document.querySelector('[data-message="board-status"]').textContent = `Player ${currentPlayer} won the game!`;
        return;
    }
    document.querySelector('[data-message="board-status"]').textContent = "";

}