window.ticTacToe = {};
(() => {
    const initialState = {
        board: Array(9).fill(null),
        currentPlayer: "X",
        scores: {
            X: 0,
            draw: 0,
            O: 0
        },
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
    const {currentPlayer} = e.detail;
    document.querySelector('[data-message="board-status"]').innerHTML = `Player ${currentPlayer} won the game!`;
    window.ticTacToe.appState.scores[currentPlayer] += 1;
    Object.keys(window.ticTacToe.appState.scores).forEach(scoreType => document.querySelector(`[data-result="score-${scoreType}"]`).innerHTML = window.ticTacToe.appState.scores[scoreType]);
    resetGame(); //manage this

}

function onGameDraw() {
    document.querySelector('[data-message="board-status"]').innerHTML = 'It is a draw!';
    window.ticTacToe.appState.scores.draw += 1;
    Object.keys(window.ticTacToe.appState.scores).forEach(scoreType => document.querySelector(`[data-result="score-${scoreType}"]`).innerHTML = window.ticTacToe.appState.scores[scoreType]);
    resetGame(); //manage this

}

function updateSettings(e){
    //log: applySettings
    // change settings

    const {isDarkTheme} = window.ticTacToe.appState;
    if(isDarkTheme){
        if(!document.body.classList.contains('dark-theme')) {
            document.body.classList.add('dark-theme');
        }
        document.body.classList.remove('light-theme');
    }else{
        if(!document.body.classList.contains('light-theme')) {
            document.body.classList.add('light-theme');
        }
        document.body.classList.remove('dark-theme'); 
    }


}

function onGameReset(e) {
    //log: gameStart
    // reset the game
    renderBoardState(e.detail.board)
    document.querySelector('[data-message="board-status"]').innerHTML = "";
    window.ticTacToe.appState = e.detail;
   
}

function onPlayTurn(e) {
    const {board, currentPlayer} = e.detail;
    renderBoardState(board); // manage this
    window.ticTacToe.appState = {...e.detail}
}


function onToggleTurn(e){
    highlightCurrentPlayer(e.detail.currentPlayer)
    window.ticTacToe.appState = {...e.detail}
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
