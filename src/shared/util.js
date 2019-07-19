import * as K from 'kefir';
import * as U from 'karet.util';
import * as I from 'infestines';

//

/**
 * @template T
 * @param {chrome.events.Event<T>} src
 * @param {Function} fn
 * @return {K.Property<T, any>}
 */
export const fromChrome = (src, fn) => K.stream(emitter => {
  if (!src.addListener) {
    console.error('Given source %s does not have an `addListener` method.', src);
  }

  const listenerFn = (value) => emitter.emit(fn ? fn(value) : value);

  src.addListener(listenerFn);
}).toProperty();

//
