
import { loadIconAssets } from "./assetLoad";
import { resetGame, renderBoardState, highlightCurrentPlayer, updateSoundSettingsUI, updateThemeSettingUI, setGameResultMessage, updateGameScoresUI, resetBoard, updateSettingIcons} from "./mutators";
import { playGameOverAudio, playTurnAudio } from "./utils";

export function onGameEnd(){
    playGameOverAudio();
    updateGameScoresUI(false);
    setGameResultMessage(false);
    resetGame(); 

}

export function onGameDraw() {
    playGameOverAudio();
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
    resetBoard();
}

export function onPlayTurn() {
    playTurnAudio();
    renderBoardState();
}

export function onToggleTurn(){
    highlightCurrentPlayer();
}


export function onAssetsLoaded() {
    updateSettingIcons();
}

export function downloadRenderAssets() {
    loadIconAssets();
}