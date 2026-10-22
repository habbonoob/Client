import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { UncaughtErrorEvents } from '@habbo-pixi/runtime/events/UncaughtErrorEvents';
import { setUncaughtErrorTarget } from '@habbo-pixi/runtime/runtime/uncaught';
import { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import { DisplayObject, displayState } from './DisplayObject';
import type { Loader } from './Loader';

/**
 * Information about a loaded file: the application itself, or something a Loader loaded (its
 * contentLoaderInfo, which also dispatches the loading events).
 */
export class LoaderInfo extends EventDispatcher {
    static #application: LoaderInfo | null = null;

    readonly #loader: Loader | null;
    readonly uncaughtErrorEvents = new UncaughtErrorEvents();
    url: string | null = null;
    loaderURL: string | null = null;
    bytesLoaded = 0;
    bytesTotal = 0;
    contentType: string | null = null;
    content: DisplayObject | null = null;
    applicationDomain: ApplicationDomain | null = null;
    parameters: Record<string, string> = {};
    width = 0;
    height = 0;

    constructor(loader: Loader | null) {
        super();
        this.#loader = loader;
    }

    /** The Loader that loaded this file (null for the application). */
    get loader(): Loader | null {
        return this.#loader;
    }

    /**
     * Describe the application: its root object, URL and start-up parameters (the page's query
     * string). Uncaught errors are reported through its uncaughtErrorEvents from now on.
     */
    static forApplication(root: DisplayObject): LoaderInfo {
        const info = new LoaderInfo(null);
        info.url = info.loaderURL = location.href;
        info.content = root;
        info.applicationDomain = ApplicationDomain.currentDomain;
        info.contentType = 'application/javascript';
        new URLSearchParams(location.search).forEach((v, k) => { info.parameters[k] = v; });
        LoaderInfo.#application = info;
        setUncaughtErrorTarget(info.uncaughtErrorEvents);
        return info;
    }

    static {
        // a display object's loaderInfo: the file its root came from
        displayState.loaderInfoOf = (o: DisplayObject) => {
            const app = LoaderInfo.#application;
            // the stage, and what the application puts straight onto it, belong to the application
            if (app && (o === o.stage || o.parent === o.stage && o.stage)) return app;
            const root = o.root;
            if (!root) return null;
            if (app && app.content === root) return app;
            const p = root.parent as { contentLoaderInfo?: LoaderInfo } | null;
            return p?.contentLoaderInfo ?? null;
        };
    }
}
