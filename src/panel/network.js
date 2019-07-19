import * as K from 'kefir';
import { fromChrome } from '../shared/util';

/**
 * @type {K.Property<InterceptedRequest, any>};
 */
export const request =
  fromChrome(chrome.devtools.network.onRequestFinished)
    .flatMapLatest(req =>
      K.combine(
        [K.fromCallback(cb => req.getContent(cb))],
        [K.constant(req)],
      ).toProperty())
    .map(([data, request]) => ({ data, request }));
