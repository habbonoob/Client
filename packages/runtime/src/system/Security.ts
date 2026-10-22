/**
 * Cross-domain permissions. In the browser, which sites the client may talk to is decided by the
 * servers (CORS headers) rather than by policy files or allow lists in the client, so these calls
 * have nothing to change.
 */
export class Security {
    static readonly APPLICATION: string = 'application';
    static readonly REMOTE: string = 'remote';
    static readonly LOCAL_TRUSTED: string = 'localTrusted';
    static readonly sandboxType = 'application';

    static allowDomain(...domains: any[]): void {
        void domains;
    }

    static allowInsecureDomain(...domains: any[]): void {
        void domains;
    }

    static loadPolicyFile(url: string): void {
        void url;
    }
}
