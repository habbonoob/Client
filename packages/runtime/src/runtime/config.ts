// Runtime settings the browser needs that the original platform provided some other way: the
// application's identity, its launch arguments, and how a host/port pair from the client's
// configuration becomes a WebSocket URL. Adjust before the client starts (main.ts).

export const runtimeConfig = {
    /** The application's identity (it had an application descriptor as a desktop app). */
    application: {
        id: 'com.sulake.habbo',
        versionNumber: '1.0.0',
        versionLabel: '1.0.0',
        copyright: '',
        /** Version reported as the runtime's (the SDK the client was built against). */
        runtimeVersion: '51.3.4.0',
    },

    /**
     * Launch arguments, as the client parses them ("-name value" pairs): taken from the page's
     * query string, so ?environment=en&sso-token=abc becomes -environment en -sso-token abc.
     */
    launchArguments: (): string[] => {
        const args: string[] = [];
        new URLSearchParams(location.search).forEach((v, k) => args.push('-' + k, v));
        return args;
    },

    /**
     * The WebSocket URL for Socket.connect(host, port). Default: ws(s)://host:port, matching the
     * page's protocol; a loopback host (the configuration's "localhost") means the machine that
     * served the page when it was opened from another machine. A hotel on the page's own host and
     * web port (a deployed hotel, its website and client on one origin) is reached at the page's
     * /game path, where the web front sends WebSockets on to the game port. Servers behind another
     * WebSocket proxy set this to point at the proxy.
     */
    socketUrl: (host: string, port: number): string => {
        const secure = location.protocol === 'https:';
        const scheme = secure ? 'wss' : 'ws';
        const webPort = Number(location.port || (secure ? 443 : 80));
        if (host === location.hostname && port === webPort) return `${scheme}://${location.host}/game`;
        const loopback = (h: string) => h === 'localhost' || h === '::1' || h === '[::1]' || h.startsWith('127.');
        const target = loopback(host) && !loopback(location.hostname) ? location.hostname : host;
        return `${scheme}://${target}:${port}`;
    },

    /**
     * Where a read (GET/HEAD) of another site goes. The desktop app read any site; a page may only
     * read those that allow it (CORS), and Habbo's gamedata doesn't. Default: through the dev/preview
     * server's /__remote reader (vite.config.ts). A deployed client (built with VITE_REMOTE_READS=mirror)
     * has no such server, and reads the hotel server's asset mirror instead (/mirror/<host>/<path>).
     * Return the URL unchanged to read directly.
     */
    remoteUrl: (url: string): string => {
        if (import.meta.env.VITE_REMOTE_READS === 'mirror') {
            const remote = new URL(url);
            return `/mirror/${remote.host}${remote.pathname}${remote.search}`;
        }
        return `${import.meta.env.BASE_URL}__remote?url=${encodeURIComponent(url)}`;
    },

    /** Whether frame timing shows in the page's top-left corner (runtime/frameStats). Off with ?fps=0. */
    showFrameStats: (): boolean => new URLSearchParams(location.search).get('fps') !== '0',
};
