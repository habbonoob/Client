import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFocusWindow } from '@/com/sulake/core/window/components/IFocusWindow';
import type { IFocusManagerService } from '@/com/sulake/core/window/services/IFocusManagerService';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { FocusEvent } from '@habbo-pixi/runtime/events/FocusEvent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFocusWindow } from '@/com/sulake/core/window/components/IFocusWindow';

export class FocusManager implements IFocusManagerService {
    static { registerClassName(this, 'com.sulake.core.window.services::FocusManager'); }

    constructor(param1: DisplayObject) {
        this._SafeStr_2427 = param1.stage;
        this._SafeStr_2427.addEventListener("activate", this.onActivateEvent);
        this._SafeStr_2427.addEventListener("focusOut", this.onFocusEvent);
        this._SafeStr_2427.addEventListener("keyFocusChange", this.onFocusEvent);
        this._SafeStr_2427.addEventListener("mouseFocusChange", this.onFocusEvent);
    }

    declare private _SafeStr_2427: Stage;

    private _array: IFocusWindow[] = [];
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_2427.removeEventListener("activate", this.onActivateEvent);
            this._SafeStr_2427.removeEventListener("focusOut", this.onFocusEvent);
            this._SafeStr_2427.removeEventListener("keyFocusChange", this.onFocusEvent);
            this._SafeStr_2427.removeEventListener("mouseFocusChange", this.onFocusEvent);
            this._SafeStr_2427 = null;
            this._disposed = true;
            this._array = null;
        }
    }

    public registerFocusWindow(param1: IFocusWindow): void {
        if (param1 != null) {
            if (this._array.indexOf(param1) == -1) {
                this._array.push(param1);
                if (this._SafeStr_2427.focus == null) {
                    param1.focus();
                }
            }
        }
    }

    public removeFocusWindow(param1: IFocusWindow): void {
        let _loc2_: number = 0;
        if (param1 != null) {
            _loc2_ = this._array.indexOf(param1);
            if (_loc2_ > -1) {
                this._array.splice(_loc2_, 1);
            }
        }
        if (this._SafeStr_2427.focus == null) {
            this.resolveNextFocusTarget();
        }
    }

    private resolveNextFocusTarget(): IFocusWindow {
        let _loc1_: IFocusWindow = null;
        let _loc2_: number = this._array.length;
        while (_loc2_-- != 0) {
            _loc1_ = asGuarded(this._array[_loc2_], isIFocusWindow);
            if (!_loc1_.disposed) {
                _loc1_.focus();
                break;
            }
            this._array.splice(_loc2_, 1);
        }
        return _loc1_;
    }

    private onActivateEvent = (param1: Event): void => {
        if (this._SafeStr_2427.focus == null) {
            this.resolveNextFocusTarget();
        }
    };

    private onFocusEvent = (param1: FocusEvent): void => {
        if (this._SafeStr_2427.focus == null) {
            this.resolveNextFocusTarget();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
