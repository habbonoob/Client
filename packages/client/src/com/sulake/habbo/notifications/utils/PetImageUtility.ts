import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class PetImageUtility {
    static { registerClassName(this, 'com.sulake.habbo.notifications.utils::PetImageUtility'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        PetImageUtility.#initStatics();
        return PetImageUtility._log;
    }

    private static _roomEngine: IRoomEngine;

    constructor(param1: IRoomEngine) {
        PetImageUtility._roomEngine = param1;
    }

    public dispose(): void {
        PetImageUtility._roomEngine = null;
    }

    public getPetImage(param1: number, param2: number, param3: string, param4: number = 3, param5: boolean = false, param6: number = 32, param7: string = null): BitmapData {
        if (PetImageUtility._roomEngine == null) {
            PetImageUtility._log.warn("Pet Image Utility; Pet image creation failed: Room engine is not defined");
            return null;
        }
        let _loc8_: BitmapData = null;
        if (param1 < 0 || param2 < 0) {
            return _loc8_;
        }
        let _loc9_: number = parseInt(param3, 16) >>> 0;
        let _loc10_: number = 0;
        let _loc11_: ImageResult = PetImageUtility._roomEngine.getPetImage(param1, param2, _loc9_ | 0, new Vector3d(45 * param4), param6, null, param5, _loc10_, null, param7);
        if (_loc11_ != null) {
            _loc8_ = _loc11_.data;
        }
        return _loc8_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PetImageUtility.#staticsReady) return;
        PetImageUtility.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PetImageUtility, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.notifications.utils.PetImageUtility"));
    }
}
