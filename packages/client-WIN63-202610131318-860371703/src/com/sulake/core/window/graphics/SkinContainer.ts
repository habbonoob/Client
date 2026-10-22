import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISkinContainer } from '@/com/sulake/core/window/graphics/ISkinContainer';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { DefaultAttStruct } from '@/com/sulake/core/window/utils/DefaultAttStruct';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class SkinContainer implements ISkinContainer {
    static { registerClassName(this, 'com.sulake.core.window.graphics::SkinContainer'); }

    private static readonly MAX_STYLE_COUNT: number = 100;
    protected static statesByRenderPriority: any[];
    private _disposed: boolean = false;

    declare private _SafeStr_3193: Map<any, any>;

    declare private _SafeStr_3830: Map<any, any>;

    declare private _SafeStr_3650: Map<any, any>;

    declare private _SafeStr_3749: Map<any, any>;

    constructor() {
        this._SafeStr_3193 = new Dictionary();
        this._SafeStr_3830 = new Dictionary();
        this._SafeStr_3650 = new Dictionary();
        this._SafeStr_3749 = new Dictionary();
        if (SkinContainer.statesByRenderPriority == null) {
            SkinContainer.statesByRenderPriority = [];
            SkinContainer.statesByRenderPriority.push(64);
            SkinContainer.statesByRenderPriority.push(32);
            SkinContainer.statesByRenderPriority.push(16);
            SkinContainer.statesByRenderPriority.push(8);
            SkinContainer.statesByRenderPriority.push(4);
            SkinContainer.statesByRenderPriority.push(2);
            SkinContainer.statesByRenderPriority.push(1);
            SkinContainer.statesByRenderPriority.push(0);
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._SafeStr_3193 = null;
        this._SafeStr_3830 = null;
        this._SafeStr_3650 = null;
        this._SafeStr_3749 = null;
        this._disposed = true;
    }

    public addSkinRenderer(param1: number, param2: number, param3: string, param4: ISkinRenderer, param5: XML, param6: DefaultAttStruct): void {
        if (this._SafeStr_3193.get(param1) == null) {
            this._SafeStr_3193.set(param1, new Array(100));
        }
        this._SafeStr_3193.get(param1)[param2] = param4;
        if (this._SafeStr_3830.get(param1) == null) {
            this._SafeStr_3830.set(param1, new Array(100));
        }
        this._SafeStr_3830.get(param1)[param2] = param6;
        if (this._SafeStr_3650.get(param1) == null) {
            this._SafeStr_3650.set(param1, new Array(100));
        }
        this._SafeStr_3650.get(param1)[param2] = param5;
        if (this._SafeStr_3749.get(param1) == null) {
            this._SafeStr_3749.set(param1, new Array(100));
        }
        this._SafeStr_3749.get(param1)[param2] = param3 != null && param3.length > 0 ? param3 : param2.toString();
    }

    public getSkinRendererByTypeAndStyle(param1: number, param2: number): ISkinRenderer {
        let _loc3_: ISkinRenderer = null;
        let _loc4_: any[] = this._SafeStr_3193.get(param1);
        if (_loc4_) {
            _loc3_ = _loc4_[param2];
            if (!_loc3_ && param2 != 0) {
                _loc3_ = _loc4_[0];
            }
        }
        return _loc3_;
    }

    public skinRendererExists(param1: number, param2: number): boolean {
        return !!(this._SafeStr_3193.get(param1) && this._SafeStr_3193.get(param1)[param2]);
    }

    public getDefaultAttributesByTypeAndStyle(param1: number, param2: number): DefaultAttStruct {
        let _loc3_: DefaultAttStruct = null;
        let _loc4_: any[] = this._SafeStr_3830.get(param1);
        if (_loc4_) {
            _loc3_ = _loc4_[param2];
            if (!_loc3_ && param2 != 0) {
                _loc3_ = _loc4_[0];
            }
        }
        return _loc3_;
    }

    public getWindowLayoutByTypeAndStyle(param1: number, param2: number): XML {
        let _loc3_: any[] = this._SafeStr_3650.get(param1);
        if (_loc3_ == null) {
            return null;
        }
        if (_loc3_[param2] == null) {
            return _loc3_[0];
        }
        return _loc3_[param2];
    }

    public getIntentByTypeAndStyle(param1: number, param2: number): string {
        let _loc3_: any[] = this._SafeStr_3749.get(param1);
        return stringOrNull(_loc3_ != null && _loc3_[param2] != null ? _loc3_[param2] : null);
    }

    public getTheActualState(param1: number, param2: number, param3: number): number {
        let _loc5_: number = 0;
        let _loc4_: ISkinRenderer = this.getSkinRendererByTypeAndStyle(param1, param2);
        if (_loc4_) {
            for (_loc5_ of SkinContainer.statesByRenderPriority ?? []) {
                if ((param3 & _loc5_) == _loc5_) {
                    if (_loc4_.isStateDrawable(_loc5_ >>> 0)) {
                        return _loc5_ >>> 0;
                    }
                }
            }
        }
        return 0;
    }

    get [IDisposable](): true {
        return true;
    }
}
