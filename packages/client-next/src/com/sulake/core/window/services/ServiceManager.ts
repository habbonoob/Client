import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { IFocusManagerService } from '@/com/sulake/core/window/services/IFocusManagerService';
import type { IGestureAgentService } from '@/com/sulake/core/window/services/IGestureAgentService';
import type { IInternalWindowServices } from '@/com/sulake/core/window/services/IInternalWindowServices';
import type { IMouseDraggingService } from '@/com/sulake/core/window/services/IMouseDraggingService';
import type { IMouseListenerService } from '@/com/sulake/core/window/services/IMouseListenerService';
import type { IMouseScalingService } from '@/com/sulake/core/window/services/IMouseScalingService';
import type { IToolTipAgentService } from '@/com/sulake/core/window/services/IToolTipAgentService';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WindowMouseDragger, WindowMouseListener, WindowMouseScaler, WindowToolTipAgent } from '@/com/sulake/core/window/Classes.group';
import { FocusManager } from '@/com/sulake/core/window/services/FocusManager';
import { GestureAgentService } from '@/com/sulake/core/window/services/GestureAgentService';

export class ServiceManager implements IInternalWindowServices, IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.services::ServiceManager'); }

    declare private _SafeStr_7319: number;
    static { (this.prototype as any)._SafeStr_7319 = 0; }

    declare private _root: DisplayObject;

    private _disposed: boolean = false;

    declare private _SafeStr_3152: IWindowContext;

    declare private _SafeStr_3976: IMouseDraggingService;

    declare private _SafeStr_4205: IMouseScalingService;

    declare private _SafeStr_3962: IMouseListenerService;

    declare private _SafeStr_4031: IFocusManagerService;

    declare private _SafeStr_4019: IToolTipAgentService;

    declare private _SafeStr_3927: IGestureAgentService;

    constructor(param1: IWindowContext, param2: DisplayObject) {
        this._SafeStr_7319 = 0;
        this._root = param2;
        this._SafeStr_3152 = param1;
        this._SafeStr_3976 = new WindowMouseDragger(param2);
        this._SafeStr_4205 = new WindowMouseScaler(param2);
        this._SafeStr_3962 = new WindowMouseListener(param2);
        this._SafeStr_4031 = new FocusManager(param2);
        this._SafeStr_4019 = new WindowToolTipAgent(param2);
        this._SafeStr_3927 = new GestureAgentService();
    }

    public dispose(): void {
        if (this._SafeStr_3976 != null) {
            this._SafeStr_3976.dispose();
            this._SafeStr_3976 = null;
        }
        if (this._SafeStr_4205 != null) {
            this._SafeStr_4205.dispose();
            this._SafeStr_4205 = null;
        }
        if (this._SafeStr_3962 != null) {
            this._SafeStr_3962.dispose();
            this._SafeStr_3962 = null;
        }
        if (this._SafeStr_4031 != null) {
            this._SafeStr_4031.dispose();
            this._SafeStr_4031 = null;
        }
        if (this._SafeStr_4019 != null) {
            this._SafeStr_4019.dispose();
            this._SafeStr_4019 = null;
        }
        if (this._SafeStr_3927 != null) {
            this._SafeStr_3927.dispose();
            this._SafeStr_3927 = null;
        }
        this._root = null;
        this._SafeStr_3152 = null;
        this._disposed = true;
    }

    public getMouseDraggingService(): IMouseDraggingService {
        return this._SafeStr_3976;
    }

    public getMouseScalingService(): IMouseScalingService {
        return this._SafeStr_4205;
    }

    public getMouseListenerService(): IMouseListenerService {
        return this._SafeStr_3962;
    }

    public getFocusManagerService(): IFocusManagerService {
        return this._SafeStr_4031;
    }

    public getToolTipAgentService(): IToolTipAgentService {
        return this._SafeStr_4019;
    }

    public getGestureAgentService(): IGestureAgentService {
        return this._SafeStr_3927;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
