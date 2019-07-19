// @ts-check
import * as React from 'karet';
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

/**
 *
 * @param {{ port: chrome.runtime.Port, request: K.Property<InterceptedRequest, any>, state: any }} props
 */
const App = ({ port, request, state }) => {
  const requestCount = U.foldPast(R.add(1), 0, request);

  const requestURLs = U.thru(
    request,
    U.mapValue(R.pipe(
      L.get(['request', L.pick({
        url: ['request', 'url'],
        mimeType: ['response', 'content', 'mimeType'],
      })]),
      R.of,
    )),
    U.foldPast(R.concat, []),
  );

  // Side-effects

  /**
   * For every request, post a message to the background page script.
   */
  const postRequests = U.thru(
    request,
    U.consume(value => {
      port.postMessage(value);
    }),
  );

  /**
   * Create a "effects sink" of all side-effects we want to perform.
   */
  const effects = U.parallel([
    postRequests,
  ]);

  //

  return (
    <main>
      {/* Add the effects sink into the VDOM, causing it to be activated
          when this component is mounted. */}
      {U.sink(effects)}
      <fieldset>
        <legend>Requests ({requestCount})</legend>

        {U.thru(
          requestURLs,
          U.mapElems((url, i) =>
            <div key={i}>
              {U.stringify(url)}
            </div>)
        )}
      </fieldset>
    </main>
  );
};

export default App;

//
