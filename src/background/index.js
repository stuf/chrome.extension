import { onConnect } from '../shared/runtime';

chrome.runtime.onConnect.addListener(port => {
  console.log('onConnect =>', { port });

  port.onMessage.addListener((msg, source, emit) => {
    console.groupCollapsed(msg.request.request.url);
    console.log('request =>\t%O', msg.request);
    console.groupCollapsed('Request data');
    console.log('%O', msg.data);
    console.groupEnd();
    console.groupEnd();
  })
});
