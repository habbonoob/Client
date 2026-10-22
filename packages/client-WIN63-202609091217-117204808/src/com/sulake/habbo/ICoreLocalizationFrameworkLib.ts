import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { HabboLocalizationEvent } from '@/com/sulake/core/localization/enum/HabboLocalizationEvent';
import { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import { ILocalizationDefinition } from '@/com/sulake/core/localization/ILocalizationDefinition';
import { IIDCoreLocalizationManager } from '@/com/sulake/iid/IIDCoreLocalizationManager';

export class ICoreLocalizationFrameworkLib {
    static { registerClassName(this, 'ICoreLocalizationFrameworkLib'); }

    static #staticsReady = false;

    public static get IIDCoreLocalizationManager(): any {
        ICoreLocalizationFrameworkLib.#initStatics();
        return ICoreLocalizationFrameworkLib.IIDCoreLocalizationManager;
    }
    public static set IIDCoreLocalizationManager(value: any) {
        ICoreLocalizationFrameworkLib.#initStatics();
        ICoreLocalizationFrameworkLib.IIDCoreLocalizationManager = value;
    }

    public static get ICoreLocalizationManager(): any {
        ICoreLocalizationFrameworkLib.#initStatics();
        return ICoreLocalizationFrameworkLib.ICoreLocalizationManager;
    }
    public static set ICoreLocalizationManager(value: any) {
        ICoreLocalizationFrameworkLib.#initStatics();
        ICoreLocalizationFrameworkLib.ICoreLocalizationManager = value;
    }

    public static get ILocalizationDefinition(): any {
        ICoreLocalizationFrameworkLib.#initStatics();
        return ICoreLocalizationFrameworkLib.ILocalizationDefinition;
    }
    public static set ILocalizationDefinition(value: any) {
        ICoreLocalizationFrameworkLib.#initStatics();
        ICoreLocalizationFrameworkLib.ILocalizationDefinition = value;
    }

    public static get ILocalizable(): any {
        ICoreLocalizationFrameworkLib.#initStatics();
        return ICoreLocalizationFrameworkLib.ILocalizable;
    }
    public static set ILocalizable(value: any) {
        ICoreLocalizationFrameworkLib.#initStatics();
        ICoreLocalizationFrameworkLib.ILocalizable = value;
    }

    public static get ILocalization(): any {
        ICoreLocalizationFrameworkLib.#initStatics();
        return ICoreLocalizationFrameworkLib.ILocalization;
    }
    public static set ILocalization(value: any) {
        ICoreLocalizationFrameworkLib.#initStatics();
        ICoreLocalizationFrameworkLib.ILocalization = value;
    }

    public static get HabboLocalizationEvent(): any {
        ICoreLocalizationFrameworkLib.#initStatics();
        return ICoreLocalizationFrameworkLib.HabboLocalizationEvent;
    }
    public static set HabboLocalizationEvent(value: any) {
        ICoreLocalizationFrameworkLib.#initStatics();
        ICoreLocalizationFrameworkLib.HabboLocalizationEvent = value;
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ICoreLocalizationFrameworkLib.#staticsReady) return;
        ICoreLocalizationFrameworkLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ICoreLocalizationFrameworkLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("IIDCoreLocalizationManager", null);
        set("ICoreLocalizationManager", null);
        set("ILocalizationDefinition", null);
        set("ILocalizable", null);
        set("ILocalization", null);
        set("HabboLocalizationEvent", null);
        set("IIDCoreLocalizationManager", IIDCoreLocalizationManager);
        set("ICoreLocalizationManager", ICoreLocalizationManager);
        set("ILocalizationDefinition", ILocalizationDefinition);
        set("ILocalizable", ILocalizable);
        set("ILocalization", ILocalization);
        set("HabboLocalizationEvent", HabboLocalizationEvent);
    }
}
