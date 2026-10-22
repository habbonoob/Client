import { runtimeConfig } from '@habbo-pixi/runtime/runtime/config';

/** The operating system as a desktop runtime reports it ("Windows 10", "Mac OS 10.15", "Linux"). */
function operatingSystem(): { os: string; code: string; manufacturer: string } {
    const ua = navigator.userAgent;
    const win = /Windows NT (\d+\.\d+)/.exec(ua);
    if (win) return { os: win[1] === '10.0' ? 'Windows 10' : `Windows NT ${win[1]}`, code: 'WIN', manufacturer: 'Adobe Windows' };
    const mac = /Mac OS X (\d+[._]\d+(?:[._]\d+)?)/.exec(ua);
    if (mac) return { os: `Mac OS ${mac[1].replace(/_/g, '.')}`, code: 'MAC', manufacturer: 'Adobe Macintosh' };
    if (/Android/.test(ua)) return { os: `Linux ${(/Android ([\d.]+)/.exec(ua)?.[1]) ?? ''}`.trim(), code: 'AND', manufacturer: 'Android Linux' };
    if (/iPhone|iPad/.test(ua)) return { os: 'iPhone OS', code: 'IOS', manufacturer: 'Adobe iOS' };
    return { os: 'Linux', code: 'LNX', manufacturer: 'Adobe Linux' };
}

/** The system the client runs on, in the formats the client parses. */
export class Capabilities {
    static readonly isDebugger = false;
    static readonly playerType: string = 'Desktop';
    static readonly hasAudio = true;
    static readonly hasMP3 = true;
    static readonly hasIME = true;
    static readonly avHardwareDisable = false;
    static readonly localFileReadDisable = false;
    static readonly supports32BitProcesses = true;
    static readonly supports64BitProcesses = true;

    static get os(): string {
        return operatingSystem().os;
    }

    static get manufacturer(): string {
        return operatingSystem().manufacturer;
    }

    /** "<platform> <major>,<minor>,<revision>,<build>" */
    static get version(): string {
        return `${operatingSystem().code} ${runtimeConfig.application.runtimeVersion.replace(/\./g, ',')}`;
    }

    static get language(): string {
        return (navigator.language || 'en').split('-')[0];
    }

    static get languages(): string[] {
        return [...(navigator.languages ?? [navigator.language])];
    }

    static get screenResolutionX(): number {
        return Math.round(screen.width * (window.devicePixelRatio || 1));
    }

    static get screenResolutionY(): number {
        return Math.round(screen.height * (window.devicePixelRatio || 1));
    }

    static get screenDPI(): number {
        return Math.round(96 * (window.devicePixelRatio || 1));
    }

    static get pixelAspectRatio(): number {
        return 1;
    }

    static get cpuArchitecture(): string {
        return /arm|aarch64/i.test(navigator.userAgent) ? 'ARM' : 'x86';
    }

    /** The capabilities as one URL-encoded string. */
    static get serverString(): string {
        const e = encodeURIComponent;
        const pairs: [string, string][] = [
            ['A', 't'], ['SA', 't'], ['SV', 't'], ['EV', 't'], ['MP3', 't'], ['AE', 't'], ['VE', 't'], ['ACC', 'f'], ['PR', 't'],
            ['SP', 't'], ['SB', 'f'], ['DEB', Capabilities.isDebugger ? 't' : 'f'], ['V', Capabilities.version], ['M', Capabilities.manufacturer],
            ['R', `${Capabilities.screenResolutionX}x${Capabilities.screenResolutionY}`], ['COL', 'color'], ['AR', '1.0'], ['OS', Capabilities.os],
            ['ARCH', Capabilities.cpuArchitecture], ['L', Capabilities.language], ['IME', 't'], ['PT', Capabilities.playerType],
            ['AVD', 'f'], ['LFD', 'f'], ['WD', 'f'], ['TLS', 't'], ['DP', String(Capabilities.screenDPI)],
        ];
        return pairs.map(([k, v]) => `${k}=${e(v)}`).join('&');
    }
}
