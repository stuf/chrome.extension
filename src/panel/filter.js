import * as R from 'kefir.ramda';

//

const eq = R.equals;
const prefixed = R.startsWith;
const suffixed = R.startsWith;
const C = R.complement;

export const pathIs = R.flip(R.pathSatisfies);

//

export const inRequest = R.concat(['request']);
export const inResponse = R.concat(['response']);

//

//

export const requestURLIs = pathIs(inRequest(['url']));
export const requestMethodIs = pathIs(inRequest(['method']));

export const responseStatusIs = pathIs(inResponse(['status']));
export const responseMimeTypeIs = pathIs(inResponse(['content', 'mimeType']));

//

export const request = {
  isHTTP: requestURLIs(prefixed('http')),
  isWebsocket: requestURLIs(prefixed('ws')),
  isGET: requestMethodIs(eq('GET')),
  isPOST: requestMethodIs(eq('POST')),
};

export const response = {
  status: {
    isOK: responseStatusIs(eq(200)),
    isRedirect: responseStatusIs(eq(302)),
    isNotOK: responseStatusIs(C(eq(200))),
  },
};
