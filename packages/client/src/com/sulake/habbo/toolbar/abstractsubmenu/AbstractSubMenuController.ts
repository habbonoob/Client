import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { SubMenuController } from '@/com/sulake/habbo/toolbar/abstractsubmenu/SubMenuController';
import type { BottomBarLeft } from '@/com/sulake/habbo/toolbar/BottomBarLeft';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class AbstractSubMenuController implements SubMenuController {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.abstractsubmenu::AbstractSubMenuController'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        AbstractSubMenuController.#initStatics();
        return AbstractSubMenuController._log;
    }

    constructor(param1: HabboToolbar, param2: BottomBarLeft, param3: string, param4: string) {
        this.onToolbarClick = this.onToolbarClick.bind(this);
        this.initInstanceFields();
        this._unseenItemCounters = new UtilsMap();
        this._toolbar = param1;
        this._toolbarView = param2;
        this._iconId = param4;
        this._toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
        let _loc5_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName(param3), XmlAsset);
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc5_.content, XML), 2), isIWindowContainer);
        this._window.visible = false;
        this._window.procedure = this.windowProcedure;
    }

    declare private _toolbarView: BottomBarLeft;

    declare private _iconId: string;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _toolbar: HabboToolbar;

    protected get toolbar(): HabboToolbar {
        return this._toolbar;
    }

    declare private _window: IWindowContainer;

    protected get window(): IWindowContainer {
        return this._window;
    }

    declare private _unseenItemCounters: UtilsMap;

    protected get unseenItemCounters(): UtilsMap {
        return this._unseenItemCounters;
    }

    protected get toolbarView(): BottomBarLeft {
        return this._toolbarView;
    }

    public toggleVisibility(): void {
        this._window.visible = !this._window.visible;
        this.reposition();
    }

    public reposition(): void {
        this._window.x = 3;
        this._window.y = this._toolbarView.window.top - this._window.height;
    }

    public getIconPosition(param1: string): Rectangle {
        let _loc2_: Rectangle = null;
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_) {
            _loc2_ = _loc3_.rectangle;
            _loc2_.x += this._window.x + _loc3_.width / 2;
            _loc2_.y += this._window.y + _loc3_.height / 2;
            this._window.visible = true;
        }
        return _loc2_;
    }

    public getIcon(param1: string): IWindow {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_) {
            this._window.visible = true;
        }
        return _loc2_;
    }

    public getUnseenItemCounter(param1: string): IWindowContainer {
        let _loc2_: IWindowContainer = null;
        let _loc4_: any = param1;
        if (!_loc4_) {
            AbstractSubMenuController._log.warn("[Toolbar] Unknown icon type for unseen item counter for iconId: " + param1);
        }
        let _loc3_: IWindowContainer = asGuarded(this._unseenItemCounters.getValue(param1), isIWindowContainer);
        if (!_loc3_) {
            _loc3_ = this._toolbar.windowManager.createUnseenItemCounter();
            _loc2_ = asGuarded(this._window.findChildByName(stringOrNull(_loc4_)), isIWindowContainer);
            if (_loc2_) {
                _loc2_.addChild(_loc3_);
                _loc3_.x = _loc2_.width - _loc3_.width - 5;
                _loc3_.y = 5;
                this._unseenItemCounters.add(param1, _loc3_);
            }
        }
        return _loc3_;
    }

    public setUnseenItemCount(param1: string, param2: number): void {
        let _loc3_: IWindowContainer = this.getUnseenItemCounter(param1);
        if (!_loc3_) {
            return;
        }
        if (param2 < 0) {
            _loc3_.visible = true;
            _loc3_.findChildByName("count").caption = " ";
        } else if (param2 > 0) {
            _loc3_.visible = true;
            _loc3_.findChildByName("count").caption = param2.toString();
        } else {
            _loc3_.visible = false;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
        this._toolbarView = null;
        this._toolbar = null;
        this._disposed = true;
    }

    protected onSubMenuItemClick(param1: string): void {
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc6_: IRegionWindow = null;
        let _loc5_: IStaticBitmapWrapperWindow = null;
        let _loc3_: IStaticBitmapWrapperWindow = null;
        let _loc4_: ITextWindow = null;
        if (isIRegionWindow(param2)) {
            _loc6_ = isIRegionWindow(param2) ? param2 : null;
            _loc5_ = asGuarded(_loc6_.findChildByName(param2.name + "_icon_color"), isIStaticBitmapWrapperWindow);
            _loc3_ = asGuarded(_loc6_.findChildByName(param2.name + "_icon_grey"), isIStaticBitmapWrapperWindow);
            _loc4_ = asGuarded(_loc6_.findChildByName("field_text"), isITextWindow);
            switch (param1.type) {
                case "WME_OVER":
                    if (_loc5_ != null && _loc3_ != null) {
                        _loc5_.visible = true;
                        _loc3_.visible = false;
                        if (_loc4_ != null) {
                            _loc4_.textColor = 2215924;
                        }
                    }
                    break;
                case "WME_OUT":
                    if (_loc5_ != null && _loc3_ != null) {
                        _loc5_.visible = false;
                        _loc3_.visible = true;
                        if (_loc4_ != null) {
                            _loc4_.textColor = 16777215;
                        }
                    }
                    break;
                case "WME_CLICK":
                    this._window.visible = false;
                    if (this._toolbar != null) {
                        this.onSubMenuItemClick(param2.name);
                    }
            }
        }
    };

    protected onToolbarClick(param1: HabboToolbarEvent): void {
        if (param1.iconId == this._iconId) {
            this.toggleVisibility();
        } else {
            this._window.visible = false;
        }
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AbstractSubMenuController.#staticsReady) return;
        AbstractSubMenuController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AbstractSubMenuController, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.toolbar.abstractsubmenu.AbstractSubMenuController"));
    }

    get [IDisposable](): true {
        return true;
    }
}
