
import { resetGame, renderBoardState, highlightCurrentPlayer, updateSoundSettingsUI, updateThemeSettingUI, setGameResultMessage, updateGameScoresUI} from "./mutators";

export function onGameEnd(){
    updateGameScoresUI(false);
    setGameResultMessage(false);
    resetGame(); 

}

export function onGameDraw() {
    updateGameScoresUI(true);
    setGameResultMessage(true);
    resetGame();

}

export function updateSettings(){
    updateThemeSettingUI();
    updateSoundSettingsUI();
}

export function onGameReset() {
    setGameResultMessage();
    renderBoardState()
}

export function onPlayTurn() {
    // playTurnAudio();
    renderBoardState();
}

export function onToggleTurn(){
    highlightCurrentPlayer();
}


