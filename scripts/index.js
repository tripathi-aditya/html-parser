window.ticTacToe = {};
const initialState = {
    board: Array(9).fill(null),
    currentPlayer: "X",
    scores: {
        X: 0,
        draw: 0,
        O: 0
    },
    settings: {
        isDarkTheme: true,
        isSound: true,
        isAgainstAI: false
    }
};

const appEvents = new Map([["APPLY_SETTINGS", "applySettings"],
["GAME_END", "gameEnd"],
["SHUFFLE_TURN", "shuffleTurn"], // who starts?
["CHANGE_TURN", "changeTurn"],
["GAME_RESET", "gameReset"]])
   

function dispatchAppEvent(eventName, eventData) {
    const {events} = window.ticTacToe;
    if(events.has(eventName)){
        window.dispatchEvent(new CustomEvent(events.get(eventName), {detail: eventData, bubbles: true}))
        //log: event dispatched <eventName>, <eventData>
    }
    // log: trying to raise incorrect event 
}



window.ticTacToe = {appState: initialState, events: appEvents, dispatchAppEvent}


