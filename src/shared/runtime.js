import * as K from 'kefir';

export const fromChrome = src => K.fromCallback(cb => src.addListener(cb)).toProperty();

export const onConnect = fromChrome(chrome.runtime.onConnect);
export const onBrowserUpdateAvailable = fromChrome(chrome.runtime.onBrowserUpdateAvailable);
