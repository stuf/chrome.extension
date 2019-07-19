import * as R from 'kefir.ramda';

//

const eq = R.equals;
const prefixed = R.startsWith;
const suffixed = R.startsWith;
const matches = R.test;
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
  method: {
    isGET: requestMethodIs(eq('GET')),
    isPOST: requestMethodIs(eq('POST')),
  },

  url: {
    isHTTP: requestURLIs(prefixed('http')),
    isWebsocket: requestURLIs(prefixed('ws')),
    isPrefixedWith: (prefix) => requestURLIs(prefixed(prefix)),
    matchesWith: (regex) => requestURLIs(matches(regex)),
  },
};

export const response = {
  status: {
    isOK: responseStatusIs(eq(200)),
    isRedirect: responseStatusIs(eq(302)),
    isNotOK: responseStatusIs(C(eq(200))),
  },
  type: {
    isJSON: responseMimeTypeIs(eq('application/json')),
    isNotJSON: responseMimeTypeIs(C(eq('application/json'))),

    isImage: responseMimeTypeIs(prefixed('image/')),
    isNotImage: responseMimeTypeIs(C(prefixed('image/'))),
  },
};
