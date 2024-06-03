(() => {
const { dispatchAppEvent} = window.ticTacToe;

document.getElementById('toggle-theme').addEventListener('click', toggleTheme);
document.getElementById('toggle-sound').addEventListener('click', toggleSound);
// document.getElementById('toggle-against-ai').addEventListener('click', toggleAgainstAI);


function toggleTheme() {
    const {appState} = window.ticTacToe;
    dispatchAppEvent("APPLY_SETTINGS", {...appState, isDarkTheme: !appState.isDarkTheme })
 }

 function toggleSound(){
   const {appState} = window.ticTacToe;
   dispatchAppEvent("APPLY_SETTINGS", {...appState, isSound: !appState.isSound })
    
 }

 function toggleAgainstAI(){
    // todo
 }})();