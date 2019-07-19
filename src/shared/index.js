export const chrome = {
  onConnect: (fn) => {
    chrome.runtime.onConnect.addListener(fn);
  },

  offConnect: (fn) => {
    chrome.runtime.onConnect.removeListener(fn);
  }
};
