import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { EventListenerStruct } from '@/com/sulake/core/runtime/events/EventListenerStruct';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class WindowEventDispatcher implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.events::WindowEventDispatcher'); }

    private static readonly _SafeStr_7891: number = 0;
    private static readonly _SafeStr_8594: number = 1;
    private static readonly _SafeStr_7746: number = 2;

    constructor(param1: IWindow) {
    }

    private _SafeStr_2557: Map<any, any> = new Dictionary();

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    declare private _error: Error;

    protected _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get error(): Error {
        return this._error;
    }

    public addEventListener(param1: string, param2: (...args: any[]) => any, param3: number = 0): void {
        let _loc6_: any[] = this._SafeStr_2557.get(param1);
        let _loc4_: EventListenerStruct = new EventListenerStruct(param2, false, param3);
        if (!_loc6_) {
            _loc6_ = [_loc4_];
            this._SafeStr_2557.set(param1, _loc6_);
        } else {
            for (const _loc5_ of _loc6_ ?? []) {
                if (_loc5_.callback == param2) {
                    return;
                }
                if (param3 > _loc5_.priority) {
                    _loc6_.splice(_loc6_.indexOf(_loc5_), 0, _loc4_);
                    return;
                }
            }
            _loc6_.push(_loc4_);
        }
    }

    public removeEventListener(param1: string, param2: (...args: any[]) => any): void {
        let _loc4_: any[] = null;
        let _loc5_: any = 0;
        if (!this._disposed) {
            _loc4_ = this._SafeStr_2557.get(param1);
            if (_loc4_) {
                _loc5_ = 0;
                for (const _loc3_ of _loc4_ ?? []) {
                    if (_loc3_.callback == param2) {
                        _loc4_.splice(_loc5_, 1);
                        _loc3_.callback = null;
                        if (_loc4_.length == 0) {
                            this._SafeStr_2557.delete(param1);
                        }
                        return;
                    }
                    _loc5_++;
                }
            }
        }
    }

    public dispatchEvent(param1: WindowEvent): boolean {
        let _loc3_: any[] = null;
        let _loc4_: (...args: any[]) => any = null;
        let _loc5_: any[] = null;
        if (!this._disposed) {
            this._result = 0;
            _loc3_ = this._SafeStr_2557.get(param1.type);
            if (_loc3_) {
                _loc5_ = [];
                for (const _loc2_ of _loc3_ ?? []) {
                    _loc5_.push(_loc2_.callback);
                }
                while (_loc5_.length > 0) {
                    _loc4_ = _loc5_.shift();
                    _loc4_(param1);
                }
            }
            this._result = (param1.isDefaultPrevented() ? 1 : 0) >>> 0;
            return this._result == 0;
        }
        return false;
    }

    public hasEventListener(param1: string): boolean {
        return this._disposed ? false : this._SafeStr_2557.get(param1) != null;
    }

    public dispose(): void {
        let _loc1_: any;
        let _loc2_: any[] = null;
        if (!this._disposed) {
            for (const _loc3_ of this._SafeStr_2557?.keys() ?? []) {
                _loc2_ = asGuarded(this._SafeStr_2557.get(_loc3_), Array.isArray);
                for (_loc1_ of _loc2_ ?? []) {
                    _loc1_.callback = null;
                }
                this._SafeStr_2557.delete(_loc3_);
            }
            this._SafeStr_2557 = null;
            this._disposed = true;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
