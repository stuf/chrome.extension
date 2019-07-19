import { onConnect } from '../shared/runtime';

chrome.runtime.onConnect.addListener(port => {
  console.log('onConnect =>', { port });

  port.onMessage.addListener((msg, source, emit) => {
    console.groupCollapsed(msg.request.request.url);
    console.log('data =>\t%O', msg.data);
    console.log('request =>\t%O', msg.request);
    console.groupEnd();
  })
});
