import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICore } from '@/com/sulake/core/runtime/ICore';
import type { ICoreErrorReporter } from '@/com/sulake/core/runtime/ICoreErrorReporter';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { CoreComponentContext } from '@/com/sulake/core/runtime/Component.group';
import { CoreErrorReporter } from '@/com/sulake/core/runtime/CoreErrorReporter';

export class Core {
    static { registerClassName(this, 'com.sulake.core::Core'); }

    public static readonly CORE_SETUP_FRAME_UPDATE_SIMPLE: number = 0;
    public static readonly CORE_SETUP_FRAME_UPDATE_COMPLEX: number = 1;
    public static readonly CORE_SETUP_FRAME_UPDATE_PROFILER: number = 2;
    public static readonly CORE_SETUP_FRAME_UPDATE_EXPERIMENT: number = 4;
    public static readonly CORE_SETUP_FRAME_UPDATE_MASK: number = 15;
    public static readonly CORE_SETUP_DEBUG: number = 15;
    public static readonly ERROR_CATEGORY_DOWNLOAD_CONFIGURATION: number = 1;
    public static readonly ERROR_CATEGORY_DOWNLOAD_LIBRARY: number = 2;
    public static readonly ERROR_CATEGORY_DOWNLOAD_CRITICAL_ASSET: number = 3;
    public static readonly ERROR_CATEGORY_PREPARE_COMPONENT: number = 4;
    public static readonly ERROR_CATEGORY_COMPONENT_RESOURCE_LOAD_ERROR: number = 5;
    public static readonly ERROR_CATEGORY_INTERFACE_AVAILABILITY: number = 6;
    public static readonly ERROR_CATEGORY_PRODUCT_DATA: number = 7;
    public static readonly ERROR_CATEGORY_DOWNLOAD_LOCALIZATION: number = 8;
    public static readonly ERROR_CATEGORY_FINALIZE_PRELOADING: number = 9;
    public static readonly ERROR_CATEGORY_INITIALIZE_CORE: number = 10;
    public static readonly ERROR_CATEGORY_DOWNLOAD_FONT: number = 11;
    public static readonly ERROR_CATEGORY_FURNIDATA_DOWNLOAD: number = 12;
    public static readonly ERROR_CATEGORY_DOWNLOAD_EXTERNAL_VARIABLES: number = 20;
    public static readonly ERROR_CATEGORY_DOWNLOAD_EXTERNAL_VARIABLES_OVERRIDE: number = 21;
    public static readonly ERROR_CATEGORY_COMMMUNICATION_INIT: number = 29;
    public static readonly ERROR_CATEGORY_CONNECT_TO_PROXY: number = 30;
    public static readonly ERROR_UNCAUGHT_ERROR: number = 40;
    public static readonly ERROR_CATEGORY_INTENTIONAL_DEBUG_CRASH: number = 99;
    private static _instance: ICore;

    constructor() {
    }

    public static get version(): string {
        return "0.0.3";
    }

    public static get instance(): ICore {
        return Core._instance;
    }

    public static instantiate(param1: DisplayObjectContainer, param2: number, param3: ICoreErrorReporter = null, param4: Map<any, any> = null): ICore {
        if (Core._instance == null) {
            Core._instance = new CoreComponentContext(param1, param3 ?? new CoreErrorReporter(), param2, param4);
        }
        return Core._instance;
    }

    public static error(param1: string, param2: boolean, param3: number = -1, param4: Error = null): void {
        if (Core._instance) {
            Core._instance.error(param1, param2, param3, param4);
        }
    }

    public static warning(param1: string): void {
        if (Core._instance) {
            Core._instance.warning(param1);
        }
        if (ExternalInterface.available) {
            ExternalInterface.call("FlashExternalInterface.logWarn", param1);
        }
    }

    public static debug(param1: string): void {
        if (Core._instance) {
            Core._instance.debug(param1);
        }
        if (ExternalInterface.available) {
            ExternalInterface.call("FlashExternalInterface.logDebug", param1);
        }
    }

    public static crash(param1: string, param2: number, param3: Error = null): void {
        if (Core._instance) {
            Core._instance.error(param1, true, param2, param3);
        }
    }

    public static purge(): void {
        if (Core._instance) {
            Core._instance.purge();
        }
    }

    public static dispose(): void {
        if (Core._instance != null) {
            Core._instance.dispose();
            Core._instance = null;
        }
    }
}
