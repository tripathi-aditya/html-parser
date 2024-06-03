window.ticTacToe = {};
(() => {
    const initialState = {
        board: Array(9).fill(null),
        currentPlayer: "X",
        X: 0,
        draw: 0,
        O: 0,
        isDarkTheme: true,
        isSound: true,
        isAgainstAI: false
    };
    
    const appEvents = new Map([["APPLY_SETTINGS", "applySettings"],
    ["GAME_END", "gameEnd"],
    ["GAME_DRAW", "gameDraw"],
    ["TOGGLE_TURN", "toggleTurn"],
    ["PLAY_TURN", "playTurn"],
    ["GAME_RESET", "gameReset"]])
    
    function dispatchAppEvent(eventName, eventData, element) {
        const {events} = window.ticTacToe;
        if(events.has(eventName)){
            if(eventData){
                window.ticTacToe.appState = eventData;
            }
            (element ? element : document).dispatchEvent(new CustomEvent(events.get(eventName)), eventData)
            console.log(`${events.get(eventName)} dispatched`, eventData)
            //log: event dispatched <eventName>, <eventData>
        }
        // log: trying to raise incorrect event 
    }    
    
    window.ticTacToe = {appState: initialState, events: appEvents, dispatchAppEvent}

})();



function onGameEnd(e){
    // log: gameEnd
    // change UI and app state
    const {appState} = window.ticTacToe;
    const {currentPlayer} = appState;
    document.querySelector('[data-message="board-status"]').innerHTML = `Player ${currentPlayer} won the game!`;
    document.querySelector(`[data-result="score-${currentPlayer}"]`).innerHTML = appState[currentPlayer];
    resetGame(); //manage this

}

function onGameDraw() {
    document.querySelector('[data-message="board-status"]').innerHTML = 'It is a draw!';
    document.querySelector(`[data-result="score-draw"]`).innerHTML = window.ticTacToe.appState.draw;
    resetGame(); //manage this

}

function updateSettings(){
    //log: applySettings
    // change settings

    const {isDarkTheme, isSound} = window.ticTacToe.appState;
    const buttonIcon = document.getElementById("setting-icon-theme");
    const soundIcon = document.getElementById("setting-icon-sound");
    if(isDarkTheme){
        buttonIcon.src = "../assets/images/dark-theme.svg"
        if(!document.body.classList.contains('dark-theme')) {
            document.body.classList.add('dark-theme');
        }
        document.body.classList.remove('light-theme');
    }else{
        buttonIcon.src = "../assets/images/light-theme.svg"
        if(!document.body.classList.contains('light-theme')) {
            document.body.classList.add('light-theme');
        }
        document.body.classList.remove('dark-theme'); 
    }

    soundIcon.src = isSound ? "../assets/images/sound-on.svg" : "../assets/images/sound-off.svg"


}

function onGameReset() {
    //log: gameStart
    // reset the game
    document.querySelector('[data-message="board-status"]').innerHTML = "";
    renderBoardState()
}

function onPlayTurn() {
    playTurnAudio();
    renderBoardState();
}


function onToggleTurn(){
    highlightCurrentPlayer();
}




function attachListeners() {
    const {events} = window.ticTacToe;
    for(let [eventLabel, eventName] of events){
        switch(eventName){
            case events.get("TOGGLE_TURN"):
                document.addEventListener(eventName, onToggleTurn) 
                break;
            case events.get("GAME_END"):
                document.addEventListener(eventName, onGameEnd)
                break;
            case events.get("GAME_DRAW"):
                document.addEventListener(eventName, onGameDraw)
                break;
            case events.get("APPLY_SETTINGS"):
                document.addEventListener(eventName, updateSettings)
                break;
            case events.get("GAME_RESET"):
                document.addEventListener(eventName, onGameReset)
                break;
            case events.get("PLAY_TURN"):
                document.addEventListener(eventName, onPlayTurn)
                break;
            default:
                break;
        }
    }

}
document.addEventListener("DOMContentLoaded", attachListeners)
