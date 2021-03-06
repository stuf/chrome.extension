// @ts-check
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import { render } from 'react-dom';
import { request } from './network';
import * as F from './filter';

import App from './App';

const state = U.atom({});

const port = chrome.runtime.connect({
  name: 'panel'
});

const filteredRequest =
  request
    .filter(R.pipe(
      R.prop('request'),
      R.allPass([
        F.request.method.isGET,
        F.request.url.isHTTP,
        F.response.status.isOK,
        F.response.type.isNotImage,
      ]),
    ));

render(
  <App
    state={state}
    request={filteredRequest}
    port={port}
  />,
  document.getElementById('app'),
);
