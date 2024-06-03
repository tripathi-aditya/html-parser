import {onToggleTurn, onGameEnd, onGameDraw, updateSettings, onGameReset, onPlayTurn} from "./eventListeners";
import {handleBoardClick, toggleSound, toggleTheme, preloadAssets} from "./utils";

function init() {
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
    preloadAssets();

}

function hydrate() {

    //attach app events
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

    //attach user events
    document.getElementById('board').addEventListener('click', handleBoardClick);
    document.getElementById('toggle-theme').addEventListener('click', toggleTheme);
    document.getElementById('toggle-sound').addEventListener('click', toggleSound);

    // apply settings, update to use the one saved in local-storage
    preloadAssets();
    window.ticTacToe.dispatchAppEvent("APPLY_SETTINGS")

    // load music
}

export default {
    init,
    hydrate
};