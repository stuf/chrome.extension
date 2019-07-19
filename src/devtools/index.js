const title = 'JORMA';
const icon = '';
const pagePath = 'panel.html';
const callback = () => {};

chrome.devtools.panels.create(title, icon, pagePath, callback);
