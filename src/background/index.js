import { onConnect } from '../shared/runtime';

onConnect.log('onConnect');

const connections = new Map();

chrome.runtime.onConnect.addListener(port => {
  console.log('onConnect =>', { port });
  /** @type {ListenerFn<Msg.Init>} */
  // const listenerFn = (msg, source, emit) => {
  //   if (msg.type === 'INIT') {
  //     // conns[msg.payload.tabId] = port;
  //     connections.set(msg.payload.tabId, port);
  //     return;
  //   }
  // };
  port.onMessage.addListener((msg, source, emit) => {
    console.log({ msg, source, emit });
  })

  // port.onMessage.addListener(listenerFn);

  // port.onDisconnect.addListener(port => {
  //   port.onMessage.removeListener(listenerFn);

  //   connections.entries.forEach(([k, p]) => {
  //     if (p === port) {
  //       connections.delete(k);
  //     }
  //   });
  // });
});
