import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { InvokeEvent } from '@habbo-pixi/runtime/events/InvokeEvent';
import { runtimeConfig } from '@habbo-pixi/runtime/runtime/config';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { XML } from '@habbo-pixi/runtime/xml/XML';

const DESCRIPTOR_NS = 'http://ns.adobe.com/air/application/51.3';

/**
 * The running application: its identity (application descriptor, id, runtime version), its launch
 * (an invoke event with the launch arguments, delivered once something listens for it) and its exit
 * (leaving the page dispatches exiting).
 */
export class NativeApplication extends EventDispatcher {
    static #instance: NativeApplication | null = null;

    executeInBackground = false;
    autoExit = true;
    #invokePending = true;

    private constructor() {
        super();
        window.addEventListener('pagehide', () => runGuarded(() => { this.dispatchEvent(new Event(Event.EXITING, false, true)); }));
    }

    static get nativeApplication(): NativeApplication {
        return (NativeApplication.#instance ??= new NativeApplication());
    }

    get applicationID(): string {
        return runtimeConfig.application.id;
    }

    get runtimeVersion(): string {
        return runtimeConfig.application.runtimeVersion;
    }

    /** The application descriptor document (its default namespace is the descriptor namespace). */
    get applicationDescriptor(): XML {
        const a = runtimeConfig.application;
        return new XML(`<application xmlns="${DESCRIPTOR_NS}"><id>${XML.escapeText(a.id)}</id><versionNumber>${XML.escapeText(a.versionNumber)}</versionNumber>`
            + `<versionLabel>${XML.escapeText(a.versionLabel)}</versionLabel><copyright>${XML.escapeText(a.copyright)}</copyright></application>`);
    }

    override addEventListener(type: string, listener: (event: any) => void, useCapture: boolean = false, priority: number = 0, useWeakReference: boolean = false): void {
        super.addEventListener(type, listener, useCapture, priority, useWeakReference);
        if (type === InvokeEvent.INVOKE && this.#invokePending) {
            // the launch is delivered to the first listener, just after it registers
            this.#invokePending = false;
            setTimeout(() => runGuarded(() => {
                this.dispatchEvent(new InvokeEvent(InvokeEvent.INVOKE, false, false, null, runtimeConfig.launchArguments(), 'standard'));
            }), 0);
        }
    }

    /** Close the application (the browser only allows closing windows it opened). */
    exit(errorCode: number = 0): void {
        void errorCode;
        window.close();
    }

    activate(): void {
        window.focus();
    }
}
