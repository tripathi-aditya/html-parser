import settingsIconSoundOn from "../../public/assets/images/sound-on.svg";
import settingsIconSoundOff from "../../public/assets/images/sound-off.svg";
import settingsIconDarkTheme from "../../public/assets/images/dark-theme.svg";
import settingsIconLightTheme from "../../public/assets/images/light-theme.svg";


export function loadIconAssets() {
    new Image().src = settingsIconSoundOn;
    new Image().src = settingsIconSoundOff;
    new Image().src = settingsIconLightTheme;
    new Image().src = settingsIconDarkTheme;

    const {dispatchAppEvent} = window.ticTacToe;
    dispatchAppEvent("RENDER_ASSETS_READY")
}

export function getSettingsIconSoundOn() {
    return settingsIconSoundOn;
}

export function getSettingsIconSoundOff() {
    return settingsIconSoundOff;
}

export function getSettingsIconDarkTheme() {
    return settingsIconDarkTheme;
}

export function getSettingsIconLightTheme() {
    return settingsIconLightTheme;
}