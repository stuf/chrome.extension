declare type RequestMethod = 'GET' | 'POST' | 'DELETE';
declare type RequestHttpVersion = 'http/1.1';
declare type RequestISODate = string;

declare interface IRequest {
  bodySize: number;
  cookies: any[];
  headers: Array<IHeader>;
  headersSize: number;
  httpVersion: RequestHttpVersion;
  method: RequestMethod;
  queryString: any[];
  url: string;
}

declare interface IResponse {
  bodySize: number;
  content: IResponseContent;
  cookies: any[];
  headers: Array<IHeader>;
  headersSize: number;
  httpVersion: RequestHttpVersion;
  redirectUrl: string;
  status: number;
  statusText: string;
}

declare interface IResponseContent {
  size: number;
  mimeType: string;
}

declare interface IHeader {
  name: string;
  value: string;
}

declare interface IRequestTimings {
  blocked: number;
  connect: number;
  dns: number;
  receive: number;
  send: number;
  ssl: number;
  wait: number;

  // wtf is this
  _blocked_queueing?: number;
}

declare interface NetworkRequest extends chrome.devtools.network.Request {
  cache?: boolean;
  connection?: string;
  pageref?: string;
  request: IRequest;
  response: IResponse;
  serverIPAddress: string;
  startedDateTime: RequestISODate;
  time: number;
  timings: IRequestTimings;

  // internal?
  _initiator?: object;
  _priority?: string;
  _resourceType?: string;
}

declare interface InterceptedRequest<T> {
  data: T;
  request: NetworkRequest;
}
