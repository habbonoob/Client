import type { ApplicationDomain } from './ApplicationDomain';

/** Options for Loader.load / loadBytes. */
export class LoaderContext {
    checkPolicyFile: boolean;
    applicationDomain: ApplicationDomain | null;
    securityDomain: unknown;
    allowCodeImport = true;

    constructor(checkPolicyFile: boolean = false, applicationDomain: ApplicationDomain = null, securityDomain: unknown = null) {
        this.checkPolicyFile = checkPolicyFile;
        this.applicationDomain = applicationDomain;
        this.securityDomain = securityDomain;
    }
}
