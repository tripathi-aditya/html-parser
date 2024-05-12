const appSettings = {
    dark: true,
    soundOn: true,
}

document.addEventListener("applySettings", applySettings)
document.addEventListener("DOMContentLoaded", () => document.dispatchEvent(new CustomEvent("applySettings", {detail: appSettings})))



document.getElementById('toggle-theme').addEventListener('click', toggleTheme)


function toggleTheme() {
    appSettings.dark = !appSettings.dark;
    document.dispatchEvent(new CustomEvent("applySettings", {detail: appSettings}));
 }
 
 
 function applySettings(e){
     if(appSettings.dark){
         document.body.classList.add('dark-theme');
         document.body.classList.remove('light-theme');
     }else{
         document.body.classList.add('light-theme');
         document.body.classList.remove('dark-theme'); 
     }
 }