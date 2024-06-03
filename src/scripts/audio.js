const playerTurnAudio = new Map([
    ['X', "../../public/assets/sounds/play-turn-x.wav"],
    ['O', "../../public/assets/sounds/play-turn-o.wav"]
])

function playTurnAudio() {
    const {currentPlayer, isSound} = window.ticTacToe.appState;
    if(!isSound) return;
    const audio = new Audio(playerTurnAudio.get(currentPlayer));
    audio.play();
}


function playGameOverAudio() {
    if(!window.ticTacToe.appState.isSound) return;
    const audio = new Audio("../../public/assets/sounds/game-over.wav");
    audio.play();
}