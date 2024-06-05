
import { loadIconAssets } from "./assetLoad";
import { resetGame, renderBoardState, highlightCurrentPlayer, updateSoundSettingsUI, updateThemeSettingUI, setGameResultMessage, updateGameScoresUI, resetBoard, updateSettingIcons} from "./mutators";

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
    resetBoard();
}

export function onPlayTurn() {
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