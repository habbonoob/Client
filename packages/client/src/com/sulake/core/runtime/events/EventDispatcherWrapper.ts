import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { EventListenerStruct } from '@/com/sulake/core/runtime/events/EventListenerStruct';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class EventDispatcherWrapper implements IEventDispatcher, IDisposable {
    static { registerClassName(this, 'com.sulake.core.runtime.events::EventDispatcherWrapper'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        EventDispatcherWrapper.#initStatics();
        return EventDispatcherWrapper._log;
    }

    private static readonly _SafeStr_7891: number = 0;
    private static readonly _SafeStr_8594: number = 1;
    private static readonly _SafeStr_7746: number = 2;

    constructor(param1: IEventDispatcher = null) {
        this.initInstanceFields();
        this._SafeStr_2546 = new EventDispatcher(param1 ? param1 : this);
    }

    declare private _SafeStr_2546: EventDispatcher;

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

    public addEventListener(param1: string, param2: (...args: any[]) => any, param3: boolean = false, param4: number = 0, param5: boolean = false): void {
        let _loc8_: any[] = this._SafeStr_2557.get(param1);
        let _loc6_: EventListenerStruct = new EventListenerStruct(param2, param3, param4, param5);
        if (!_loc8_) {
            _loc8_ = [_loc6_];
            this._SafeStr_2557.set(param1, _loc8_);
            this._SafeStr_2546.addEventListener(param1, this.eventProcessor);
        } else {
            for (const _loc7_ of _loc8_ ?? []) {
                if (_loc7_.callback == param2 && _loc7_.useCapture == param3) {
                    return;
                }
                if (param4 > _loc7_.priority) {
                    _loc8_.splice(_loc8_.indexOf(_loc7_), 0, _loc6_);
                    return;
                }
            }
            _loc8_.push(_loc6_);
        }
    }

    public removeEventListener(param1: string, param2: (...args: any[]) => any, param3: boolean = false): void {
        let _loc5_: any[] = null;
        let _loc6_: any = 0;
        if (!this._disposed) {
            _loc5_ = this._SafeStr_2557.get(param1);
            if (_loc5_) {
                _loc6_ = 0;
                for (const _loc4_ of _loc5_ ?? []) {
                    if (_loc4_.callback == param2 && _loc4_.useCapture == param3) {
                        _loc5_.splice(_loc6_, 1);
                        _loc4_.callback = null;
                        if (_loc5_.length == 0) {
                            this._SafeStr_2557.delete(param1);
                            this._SafeStr_2546.removeEventListener(param1, this.eventProcessor);
                        }
                        return;
                    }
                    _loc6_++;
                }
            }
        }
    }

    public hasEventListener(param1: string): boolean {
        return this._disposed ? false : this._SafeStr_2557.get(param1) != null;
    }

    public callEventListeners(param1: string): void {
        let _loc3_: any[] = this._SafeStr_2557.get(param1);
        if (_loc3_) {
            for (const _loc2_ of _loc3_ ?? []) {
                _loc2_.callback(null);
            }
        }
    }

    public willTrigger(param1: string): boolean {
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
                this._SafeStr_2546.removeEventListener(stringOrNull(_loc3_), this.eventProcessor);
            }
            this._SafeStr_2557 = null;
            this._SafeStr_2546 = null;
            this._disposed = true;
        }
    }

    public dispatchEvent(param1: Event): boolean {
        if (!this._disposed) {
            this._result = 0;
            this._SafeStr_2546.dispatchEvent(param1);
            if (this._result == 2) {
                if (this._error != null) {
                    Core.crash("Error caught when handling " + getQualifiedClassName(param1) + ": " + this._error.message, (this._error.errorID ?? 0), this._error);
                } else {
                    Core.crash("Error caught when handling " + getQualifiedClassName(param1) + ". No error data available!", 0, this._error);
                }
            }
            return this._result == 0;
        }
        return false;
    }

    private eventProcessor = (param1: Event): void => {
        let _loc4_: (...args: any[]) => any = null;
        let _loc5_: any[] = null;
        let _loc3_: any[] = this._SafeStr_2557.get(param1.type);
        if (_loc3_) {
            _loc5_ = [];
            for (const _loc2_ of _loc3_ ?? []) {
                _loc5_.push(_loc2_.callback);
            }
            while (_loc5_.length > 0) {
                try {
                    _loc4_ = _loc5_.shift();
                    _loc4_(param1);
                    continue;
                } catch (e) {
                    EventDispatcherWrapper._log.error(e.stack);
                    this._result = 2;
                    this._error = e;
                }
                return;
            }
        }
        this._result = (param1.isDefaultPrevented() ? 1 : 0) >>> 0;
    };

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (EventDispatcherWrapper.#staticsReady) return;
        EventDispatcherWrapper.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(EventDispatcherWrapper, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.core.runtime.events.EventDispatcherWrapper"));
    }

    get [IDisposable](): true {
        return true;
    }
}
