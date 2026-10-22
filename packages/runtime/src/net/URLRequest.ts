import type { URLRequestHeader } from './URLRequestHeader';

/** Everything about an HTTP request: URL, method, body and headers. */
export class URLRequest {
    url: string;
    method = 'GET';
    /** A URLVariables (query string / form body), a ByteArray (binary body) or a string. */
    data: any = null;
    contentType: string | null = null;
    requestHeaders: URLRequestHeader[] = [];
    /** Send and store cookies for the request's site. */
    manageCookies = true;
    followRedirects = true;
    cacheResponse = true;
    idleTimeout = 0;

    constructor(url: string = null) {
        this.url = url;
    }
}
