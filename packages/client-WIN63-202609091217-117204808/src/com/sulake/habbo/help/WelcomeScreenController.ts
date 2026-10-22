import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class WelcomeScreenController implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.help::WelcomeScreenController'); }

    declare private _habboHelp: HabboHelp;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _window: IWindowContainer;

    private _SafeStr_2390: Point = new Point(72, 10);

    declare private _SafeStr_5557: string;

    declare private _alignment: number;
    static { (this.prototype as any)._alignment = 0; }

    declare private _SafeStr_5792: string;

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._habboHelp) {
            this._habboHelp.removeUpdateReceiver(this);
            this._habboHelp = null;
        }
        if (this._window) {
            this._window.findChildByName("close").removeEventListener("WME_CLICK", this.onCloseButton);
            this._window.findChildByName("click").removeEventListener("WME_CLICK", this.onRegionClick);
            this._window.dispose();
            this._window = null;
        }
        this._disposed = true;
    }

    public showWelcomeScreen(param1: string, param2: string, param3: number, param4: string): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_5557 = param1;
        this._alignment = param3;
        this._SafeStr_5792 = param4;
        if (this._window == null) {
            this.initializeWindow();
        }
        let _loc5_: ITextWindow = castGuarded(this._window.findChildByName("text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.caption = "${" + param2 + "}";
        _loc5_.height = _loc5_.textHeight + 5 | 0;
        this.updatePosition();
        this.registerUpdates();
        this._window.visible = true;
        this._window.activate();
    }

    private initializeWindow(): void {
        let _loc1_: XmlAsset = asInstanceOf(this._habboHelp.assets.getAssetByName("welcome_screen_xml"), XmlAsset);
        this._window = asGuarded(this._habboHelp.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML), 2), isIWindowContainer);
        let _loc3_: IFrameWindow = asGuarded(this._window.findChildByName("frame"), isIFrameWindow);
        _loc3_.header.visible = false;
        _loc3_.content.y -= 20;
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("text"), isITextWindow);
        _loc2_.height = _loc2_.textHeight + 5 | 0;
        _loc3_.content.setParamFlag(2048, false);
        _loc3_.height -= 20;
        this._window.findChildByName("close").addEventListener("WME_CLICK", this.onCloseButton);
        this._window.findChildByName("click").addEventListener("WME_CLICK", this.onRegionClick);
    }

    private updatePosition(): void {
        let _loc1_: Rectangle = this._habboHelp.toolbar.getIconLocation(this._SafeStr_5557);
        let _loc2_: IWindow = this._window.findChildByName("arrow");
        let _loc3_: IWindow = this._window.findChildByName("arrow_right");
        if (_loc1_ == null) {
            _loc1_ = new Rectangle(0, 0, this._window.width, this._window.height);
        }
        if (this._alignment == 0) {
            this._SafeStr_2390.x = 72;
            this._window.x = -this._window.width;
            _loc2_.y = (this._window.height - _loc2_.height) / 2 | 0;
            _loc2_.visible = true;
            _loc3_.visible = false;
        } else {
            this._SafeStr_2390.x = _loc1_.x - this._window.width;
            this._window.x = _loc1_.x + _loc1_.width + this._window.width | 0;
            _loc3_.y = (this._window.height - _loc2_.height) / 2 | 0;
            _loc3_.visible = true;
            _loc2_.visible = false;
        }
        if (_loc1_ != null) {
            this._SafeStr_2390.y = _loc1_.y + _loc1_.height / 2 - this._window.height / 2;
        } else {
            this._SafeStr_2390.y = 0;
        }
        this._window.y = this._SafeStr_2390.y | 0;
    }

    private onCloseButton = (param1: WindowMouseEvent): void => {
        this.closeWindow();
    };

    private onRegionClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_5792 != null) {
            this._habboHelp.toolbar.toggleWindowVisibility(this._SafeStr_5792);
        }
        this.closeWindow();
    };

    private closeWindow(): void {
        if (!this._window) {
            return;
        }
        this._window.visible = false;
        this.dispose();
    }

    public update(param1: number): void {
        let _loc3_: Point = null;
        if (this._window == null) {
            this._habboHelp.removeUpdateReceiver(this);
            return;
        }
        let _loc2_: number = Point.distance(this._window.position, this._SafeStr_2390);
        if (_loc2_ > 5) {
            _loc3_ = Point.interpolate(this._window.position, this._SafeStr_2390, 0.5);
            this._window.x = _loc3_.x | 0;
            this._window.y = _loc3_.y | 0;
        } else {
            this._window.x = this._SafeStr_2390.x | 0;
            this._window.y = this._SafeStr_2390.y | 0;
            this._habboHelp.removeUpdateReceiver(this);
        }
    }

    private registerUpdates(): void {
        this._habboHelp.removeUpdateReceiver(this);
        this._habboHelp.registerUpdateReceiver(this, 10);
    }

    public onHabboToolbarEvent(param1: HabboToolbarEvent): void {
        let _loc2_: Rectangle = null;
        if (this._disposed) {
            return;
        }
        switch (param1.type) {
            case "HTE_RESIZED":
                if (this._habboHelp != null) {
                    _loc2_ = this._habboHelp.toolbar.getIconLocation(this._SafeStr_5557);
                }
                if (_loc2_ != null) {
                    this._SafeStr_2390.y = _loc2_.y + _loc2_.height / 2 - this._window.height / 2;
                    this._window.y = this._SafeStr_2390.y | 0;
                }
                break;
            case "HTE_TOOLBAR_CLICK":
            case "HTE_GROUP_ROOM_INFO_CLICK":
                this.closeWindow();
        }
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
