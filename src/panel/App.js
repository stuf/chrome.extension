// @ts-check
import * as React from 'karet';
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

/**
 *
 * @param {{ port: chrome.runtime.Port, request: K.Property<InterceptedRequest, any>}} props
 */
const App = ({ port, request }) => {
  const requestCount = U.foldPast(R.add(1), 0, request);

  const requestURLs = U.thru(
    request,
    U.mapValue(R.pipe(
      R.path(['request', 'request', 'url']),
    )),
    U.foldPast((xs, x) => [...xs, x], []),
  );

  requestURLs.log('url');

  return (
    <main>
      <fieldset>
        <legend>Requests ({requestCount})</legend>

        <pre><code>{U.thru(
          requestURLs,
        )}</code></pre>
      </fieldset>
    </main>
  );
};

export default App;

//
