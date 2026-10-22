import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboCommunicationDemoBootstrap } from '@/com/sulake/bootstrap/HabboCommunicationDemoBootstrap';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboCommunicationDemoCom_manifest_binAsset = embedBytes("communication/HabboCommunicationDemoCom_manifest.bin");
const login_window_binAsset = embedBytes("communication/login_window.bin");
const error_popup_binAsset = embedBytes("communication/error_popup.bin");
const login_environment_list_item_binAsset = embedBytes("communication/login_environment_list_item.bin");

export class HabboCommunicationDemoCom extends SimpleApplication {
    static { registerClassName(this, 'HabboCommunicationDemoCom'); }

    static #staticsReady = false;

    public static manifest = HabboCommunicationDemoCom_manifest_binAsset;

    public static login_window = login_window_binAsset;

    public static error_popup = error_popup_binAsset;

    public static login_environment_list_item = login_environment_list_item_binAsset;

    public static get requiredClasses(): any[] {
        HabboCommunicationDemoCom.#initStatics();
        return HabboCommunicationDemoCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboCommunicationDemoCom.#initStatics();
        HabboCommunicationDemoCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboCommunicationDemoCom.#staticsReady) return;
        HabboCommunicationDemoCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboCommunicationDemoCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", new Array(HabboCommunicationDemoBootstrap));
    }
}
