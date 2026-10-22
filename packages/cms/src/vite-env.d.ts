/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** The hotel's name, as the website shows it. */
    readonly VITE_HOTEL_NAME?: string;
    /** Where the client is served (default /client/). */
    readonly VITE_CLIENT_PATH?: string;
    /** The client's environment id (default hotel; dev against a local server). */
    readonly VITE_CLIENT_SERVER?: string;
}
