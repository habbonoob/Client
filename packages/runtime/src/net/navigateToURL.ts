import type { URLRequest } from './URLRequest';
import { URLVariables } from './URLVariables';

/** Open a URL in a browser window (`window`: a target name like '_blank' or '_self'). */
export function navigateToURL(request: URLRequest, window: string = null): void {
    let url = request.url;
    if (request.data != null && (request.method ?? 'GET').toUpperCase() === 'GET') {
        const q = request.data instanceof URLVariables ? request.data.toString() : String(request.data);
        if (q) url += (url.includes('?') ? '&' : '?') + q;
    }
    globalThis.open(url, window ?? '_blank');
}
