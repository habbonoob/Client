import { asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IResourceManager } from '@/com/sulake/core/assets/IResourceManager';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindowRenderer } from '@/com/sulake/core/window/graphics/IWindowRenderer';
import type { IInputEventTracker } from '@/com/sulake/core/window/IInputEventTracker';
import type { IWidgetFactory } from '@/com/sulake/core/window/IWidgetFactory';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowFactory } from '@/com/sulake/core/window/IWindowFactory';
import type { IInternalWindowServices } from '@/com/sulake/core/window/services/IInternalWindowServices';
import type { IEventProcessor } from '@/com/sulake/core/window/utils/IEventProcessor';
import type { IEventQueue } from '@/com/sulake/core/window/utils/IEventQueue';
import type { IWindowParser } from '@/com/sulake/core/window/utils/IWindowParser';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { isILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import { IDisposable, isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Classes, DesktopController, MouseEventProcessor, ServiceManager, SubstituteParentController, TabletEventProcessor, WindowParser } from '@/com/sulake/core/window/Classes.group';
import { isIGraphicContextHost } from '@/com/sulake/core/window/graphics/IGraphicContextHost';
import { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import { EventProcessorState } from '@/com/sulake/core/window/utils/EventProcessorState';
import { MouseEventQueue } from '@/com/sulake/core/window/utils/MouseEventQueue';
import { TabletEventQueue } from '@/com/sulake/core/window/utils/tablet/TabletEventQueue';

export class WindowContext implements IWindowContext, IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.core.window::WindowContext'); }

    public static readonly INPUT_MODE_MOUSE: number = 0;
    public static readonly INPUT_MODE_TOUCH: number = 1;
    public static readonly ERROR_UNKNOWN: number = 0;
    public static readonly ERROR_INVALID_WINDOW: number = 1;
    public static readonly ERROR_WINDOW_NOT_FOUND: number = 2;
    public static readonly ERROR_WINDOW_ALREADY_EXISTS: number = 3;
    public static readonly ERROR_UNKNOWN_WINDOW_TYPE: number = 4;
    public static readonly ERROR_DURING_EVENT_HANDLING: number = 5;
    public static inputEventQueue: IEventQueue;
    private static inputEventProcessor: IEventProcessor;
    private static inputModeFlag: number = 0;
    private static _renderer: IWindowRenderer;
    private static stage: Stage;

    declare public inputEventTrackers: IInputEventTracker[];

    declare private _linkEventTrackers: ILinkEventTracker[];

    declare private _SafeStr_6300: EventProcessorState;

    declare protected _localization: ICoreLocalizationManager;

    declare protected _rootDisplayObject: DisplayObjectContainer;

    protected _throwErrors: boolean = true;

    declare protected _lastError: Error;

    protected _lastErrorCode: number = -1;

    declare protected _windowServices: IInternalWindowServices;

    declare protected _SafeStr_4485: IWindowParser;

    declare protected _SafeStr_5099: IWindowFactory;

    declare protected _SafeStr_4843: IWidgetFactory;

    declare protected _resourceManager: IResourceManager;

    declare protected _SafeStr_2264: IDesktopWindow;

    declare protected _SafeStr_4569: SubstituteParentController;

    private _disposed: boolean = false;
    private _SafeStr_2489: boolean = false;
    private _rendering: boolean = false;

    declare private _name: string;

    declare private _configuration: ICoreConfiguration;

    constructor(param1: string, param2: IWindowRenderer, param3: IWindowFactory, param4: IWidgetFactory, param5: IResourceManager, param6: ICoreLocalizationManager, param7: ICoreConfiguration, param8: DisplayObjectContainer, param9: Rectangle, param10: ILinkEventTracker[]) {
        this._name = param1;
        WindowContext._renderer = param2;
        this._localization = param6;
        this._configuration = param7;
        this._rootDisplayObject = param8;
        this._windowServices = new ServiceManager(this, param8);
        this._SafeStr_5099 = param3;
        this._SafeStr_4843 = param4;
        this._resourceManager = param5;
        this._SafeStr_4485 = new WindowParser(this);
        this.inputEventTrackers = new Array<IInputEventTracker>(0).fill(null);
        this._linkEventTrackers = param10;
        if (!WindowContext.stage) {
            if (this._rootDisplayObject instanceof Stage) {
                WindowContext.stage = this._rootDisplayObject instanceof Stage ? this._rootDisplayObject : null;
            } else if (this._rootDisplayObject.stage) {
                WindowContext.stage = this._rootDisplayObject.stage;
            }
        }
        Classes.init();
        if (param9 == null) {
            param9 = new Rectangle(0, 0, 800, 600);
        }
        this._SafeStr_2264 = new DesktopController("_CONTEXT_DESKTOP_" + this._name, this, param9);
        this._SafeStr_2264.limits.maxWidth = param9.width | 0;
        this._SafeStr_2264.limits.maxHeight = param9.height | 0;
        this._rootDisplayObject.addChild(this._SafeStr_2264.getDisplayObject());
        this._rootDisplayObject.doubleClickEnabled = true;
        this._rootDisplayObject.addEventListener("resize", this.stageResizedHandler);
        this._SafeStr_6300 = new EventProcessorState(WindowContext._renderer, this._SafeStr_2264, this._SafeStr_2264, null, null, null, this.inputEventTrackers);
        WindowContext.inputMode = 0;
        this._SafeStr_4569 = new SubstituteParentController(this);
    }

    public static get inputMode(): number {
        return WindowContext.inputModeFlag;
    }

    public static set inputMode(param1: number) {
        if (WindowContext.inputEventQueue) {
            if (isIDisposable(WindowContext.inputEventQueue)) {
                castGuarded(WindowContext.inputEventQueue, isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
            }
        }
        if (WindowContext.inputEventProcessor) {
            if (isIDisposable(WindowContext.inputEventProcessor)) {
                castGuarded(WindowContext.inputEventProcessor, isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
            }
        }
        switch (param1) {
            case WindowContext.INPUT_MODE_MOUSE:
                WindowContext.inputEventQueue = new MouseEventQueue(WindowContext.stage);
                WindowContext.inputEventProcessor = new MouseEventProcessor();
                try {
                } catch (e) {
                }
                break;
            case 1:
                WindowContext.inputEventQueue = new TabletEventQueue(WindowContext.stage);
                WindowContext.inputEventProcessor = new TabletEventProcessor();
                try {
                } catch (e) {
                }
                break;
            default:
                WindowContext.inputMode = WindowContext.INPUT_MODE_MOUSE;
                throw new Error("Unknown input mode " + param1);
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            this._rootDisplayObject.removeEventListener("resize", this.stageResizedHandler);
            this._rootDisplayObject.removeChild(asInstanceOf(castGuarded(this._SafeStr_2264, isIGraphicContextHost, "com.sulake.core.window.graphics.IGraphicContextHost").getGraphicContext(true), DisplayObject));
            this._SafeStr_2264.destroy();
            this._SafeStr_2264 = null;
            this._SafeStr_4569.destroy();
            this._SafeStr_4569 = null;
            if (isIDisposable(this._windowServices)) {
                castGuarded(this._windowServices, isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
            }
            this._windowServices = null;
            this._SafeStr_4485.dispose();
            this._SafeStr_4485 = null;
            WindowContext._renderer = null;
            this._localization = null;
            this._rootDisplayObject = null;
            this._SafeStr_5099 = null;
            this._SafeStr_4843 = null;
            this._resourceManager = null;
        }
    }

    public getLastError(): Error {
        return this._lastError;
    }

    public getLastErrorCode(): number {
        return this._lastErrorCode;
    }

    public handleError(param1: number, param2: Error): void {
        this._lastError = param2;
        this._lastErrorCode = param1;
        if (this._throwErrors) {
            throw param2;
        }
    }

    public flushError(): void {
        this._lastError = null;
        this._lastErrorCode = -1;
    }

    public getWindowServices(): IInternalWindowServices {
        return this._windowServices;
    }

    public getWindowParser(): IWindowParser {
        return this._SafeStr_4485;
    }

    public getWindowFactory(): IWindowFactory {
        return this._SafeStr_5099;
    }

    public getDesktopWindow(): IDesktopWindow {
        return this._SafeStr_2264;
    }

    public findWindowByName(param1: string): IWindow {
        return this._SafeStr_2264.findChildByName(param1);
    }

    public findWindowByTag(param1: string): IWindow {
        return this._SafeStr_2264.findChildByTag(param1);
    }

    public groupChildrenWithTag(param1: string, param2: any[], param3: number = 0): number {
        return this._SafeStr_2264.groupChildrenWithTag(param1, param2, param3);
    }

    public registerLocalizationListener(param1: string, param2: IWindow): void {
        this._localization.registerListener(param1, isILocalizable(param2) ? param2 : null);
    }

    public removeLocalizationListener(param1: string, param2: IWindow): void {
        this._localization.removeListener(param1, isILocalizable(param2) ? param2 : null);
    }

    public create(param1: string, param2: string, param3: number, param4: number, param5: number, param6: Rectangle, param7: (...args: any[]) => any, param8: IWindow, param9: number, param10: any[] = null, param11: string = "", param12: any[] = null): IWindow {
        let _loc14_: IWindow = null;
        let _loc13_: any = Classes.getWindowClassByType(param3);
        if (_loc13_ == null) {
            this.handleError(4, new Error("Failed to solve implementation for window \"" + param1 + "\"!"));
            return null;
        }
        if (param8 == null) {
            if (param5 & 0x10) {
                param8 = this._SafeStr_4569;
            }
        }
        _loc14_ = new _loc13_(param1, param3, param4, param5, this, param6, param8 ?? this._SafeStr_2264, param7, param10, param12, param9);
        _loc14_.dynamicStyle = param11;
        if (param2 && param2.length) {
            _loc14_.caption = param2;
        }
        return _loc14_;
    }

    public destroy(param1: IWindow): boolean {
        if (param1 == this._SafeStr_2264) {
            this._SafeStr_2264 = null;
        }
        if (param1.state != 1073741824) {
            param1.destroy();
        }
        return true;
    }

    public invalidate(param1: IWindow, param2: Rectangle, param3: number): void {
        if (!this.disposed) {
            WindowContext._renderer.addToRenderQueue(param1, param2, param3);
        }
    }

    public update(param1: number): void {
        let _loc2_: Error = null;
        this._SafeStr_2489 = true;
        if (this._lastError) {
            _loc2_ = this._lastError;
            this._lastError = null;
            throw _loc2_;
        }
        WindowContext.inputEventProcessor.process(this._SafeStr_6300, WindowContext.inputEventQueue);
        this._SafeStr_2489 = false;
    }

    public render(param1: number): void {
        this._rendering = true;
        WindowContext._renderer.render();
        this._rendering = false;
    }

    private stageResizedHandler = (param1: Event): void => {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        if (this._SafeStr_2264 != null && !this._SafeStr_2264.disposed) {
            if (this._rootDisplayObject instanceof Stage) {
                _loc2_ = castTo(this._rootDisplayObject, Stage).stageWidth;
                _loc3_ = castTo(this._rootDisplayObject, Stage).stageHeight;
            } else {
                _loc2_ = this._rootDisplayObject.width | 0;
                _loc3_ = this._rootDisplayObject.height | 0;
            }
            if (_loc2_ >= 10 && _loc3_ >= 10) {
                this._SafeStr_2264.limits.maxWidth = _loc2_;
                this._SafeStr_2264.limits.maxHeight = _loc3_;
                this._SafeStr_2264.width = _loc2_;
                this._SafeStr_2264.height = _loc3_;
            }
        }
    };

    public addMouseEventTracker(param1: IInputEventTracker): void {
        if (this.inputEventTrackers.indexOf(param1) < 0) {
            this.inputEventTrackers.push(param1);
        }
    }

    public removeMouseEventTracker(param1: IInputEventTracker): void {
        let _loc2_: number = this.inputEventTrackers.indexOf(param1);
        if (_loc2_ > -1) {
            this.inputEventTrackers.splice(_loc2_, 1);
        }
    }

    public getResourceManager(): IResourceManager {
        return this._resourceManager;
    }

    public getWidgetFactory(): IWidgetFactory {
        return this._SafeStr_4843;
    }

    public get linkEventTrackers(): ILinkEventTracker[] {
        return this._linkEventTrackers;
    }

    get [IWindowContext](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
