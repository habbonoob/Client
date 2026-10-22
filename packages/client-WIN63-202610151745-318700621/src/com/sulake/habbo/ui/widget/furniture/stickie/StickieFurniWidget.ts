import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetStickieDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetStickieDataUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetStickieSendUpdateMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetStickieSendUpdateMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class StickieFurniWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.stickie::StickieFurniWidget'); }

    private static readonly FIELD_MAX_LINES: number = 14;
    private static readonly FIELD_MAX_CHARS: number = 500;
    private static readonly _SafeStr_7717: number = 100;
    private static readonly _SafeStr_8215: number = 100;
    private static readonly COLOR_BUTTON_NAMES: any[] = ["blue", "purple", "green", "yellow", "white", "red", "orange", "cyan"];

    declare private _window: IWindowContainer;

    protected _objectId: number = -1;

    declare protected _objectType: string;

    declare protected _text: string;

    declare protected _colorHex: string;

    declare protected _controller: boolean;
    static { (this.prototype as any)._controller = false; }

    declare private _SafeStr_5783: BitmapData;

    protected _windowName: string = "stickieui_container";

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this.onObjectUpdate = this.onObjectUpdate.bind(this);
    }

    protected get window(): IWindowContainer {
        return this._window;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hideInterface();
        if (this._SafeStr_5783) {
            this._SafeStr_5783.dispose();
        }
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWSDUE_STICKIE_DATA", this.onObjectUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWSDUE_STICKIE_DATA", this.onObjectUpdate);
    }

    protected onObjectUpdate(param1: RoomWidgetStickieDataUpdateEvent): void {
        this.hideInterface(false);
        this._objectId = param1.objectId;
        this._objectType = param1.objectType;
        this._text = param1.text;
        this._colorHex = param1.colorHex;
        this._controller = param1.controller;
        this.showInterface();
    }

    protected showInterface(): void {
        let _loc7_: ITextFieldWindow = null;
        let _loc4_: BitmapDataAsset = null;
        let _loc3_: BitmapData = null;
        let _loc2_: IBitmapWrapperWindow = null;
        let _loc6_: string = null;
        if (this._objectId == -1) {
            return;
        }
        let _loc5_: IAsset = this.assets.getAssetByName("stickie");
        if (_loc5_ == null) {
            return;
        }
        let _loc1_: XmlAsset = castTo(_loc5_, XmlAsset);
        if (_loc1_ == null) {
            return;
        }
        if (this._window == null) {
            this._window = asGuarded(this.windowManager.createWindow(this._windowName, "", 4, 0, (0x020000 | 1) >>> 0, new Rectangle(100, 100, 2, 2), null, 0), isIWindowContainer);
            this._window.buildFromXML(XML.from(_loc1_.content));
        }
        _loc7_ = asGuarded(this._window.findChildByName("text"), isITextFieldWindow);
        if (_loc7_ != null) {
            _loc7_.text = this._text;
            _loc7_.addEventListener("WE_CHANGE", this.onTextWindowEvent);
        }
        _loc2_ = asGuarded(this._window.findChildByTag("bg"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc6_ = this._objectType.replace("post_it", "stickie");
            if (this.assets.hasAsset(_loc6_) && this.assets.getAssetByName(_loc6_) instanceof BitmapDataAsset) {
                _loc4_ = asInstanceOf(this.assets.getAssetByName(_loc6_), BitmapDataAsset);
            } else {
                _loc4_ = asInstanceOf(this.assets.getAssetByName("stickie_blanco"), BitmapDataAsset);
                _loc2_.color = Number("0xFF" + this._colorHex) >>> 0;
            }
            _loc3_ = asInstanceOf(_loc4_.content, BitmapData);
            if (this._SafeStr_5783) {
                _loc3_ = this._SafeStr_5783;
            }
            _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
            _loc2_.bitmap.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0));
        }
        _loc2_ = asGuarded(this._window.findChildByTag("close_button"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc4_ = asInstanceOf(this.assets.getAssetByName("stickie_close"), BitmapDataAsset);
            _loc3_ = asInstanceOf(_loc4_.content, BitmapData);
            _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
            _loc2_.bitmap.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0));
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc2_ = asGuarded(this._window.findChildByTag("delete_button"), isIBitmapWrapperWindow);
        if (_loc2_ != null && this._controller) {
            _loc4_ = asInstanceOf(this.assets.getAssetByName("stickie_remove"), BitmapDataAsset);
            _loc3_ = asInstanceOf(_loc4_.content, BitmapData);
            _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
            _loc2_.bitmap.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0));
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        this.setColorButtons(this._controller && this._objectType == "post_it");
    }

    protected hideInterface(param1: boolean = true): void {
        if (param1) {
            this.sendUpdate();
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._objectId = -1;
        this._text = null;
        this._controller = false;
    }

    private setColorButtons(param1: boolean): void {
        let _loc2_: IWindow = null;
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < StickieFurniWidget.COLOR_BUTTON_NAMES.length) {
            _loc2_ = this._window.findChildByName(stringOrNull(StickieFurniWidget.COLOR_BUTTON_NAMES[_loc3_]));
            if (_loc2_ != null) {
                if (param1) {
                    _loc2_.visible = true;
                    _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
                } else {
                    _loc2_.visible = false;
                }
            }
            _loc3_++;
        }
    }

    protected storeTextFromField(): boolean {
        let _loc1_: ITextFieldWindow = asGuarded(this._window.findChildByName("text"), isITextFieldWindow);
        if (_loc1_ == null) {
            return false;
        }
        if (this._text == _loc1_.text) {
            return false;
        }
        this._text = _loc1_.text;
        return true;
    }

    protected sendUpdate(): void {
        let _loc1_: RoomWidgetStickieSendUpdateMessage = null;
        if (this._objectId == -1) {
            return;
        }
        if (!this.storeTextFromField()) {
            return;
        }
        if (this.messageListener != null) {
            _loc1_ = new RoomWidgetStickieSendUpdateMessage("RWSUM_STICKIE_SEND_UPDATE", this._objectId, this._text, this._colorHex);
            this.messageListener.processWidgetMessage(_loc1_);
        }
    }

    protected sendSetColor(param1: number): void {
        let _loc3_: RoomWidgetStickieSendUpdateMessage = null;
        if (this._objectId == -1) {
            return;
        }
        this.storeTextFromField();
        let _loc2_: string = param1.toString(16).toUpperCase();
        if (_loc2_.length > 6) {
            _loc2_ = _loc2_.slice(_loc2_.length - 6, _loc2_.length);
        }
        if (_loc2_ == this._colorHex) {
            return;
        }
        this._colorHex = _loc2_;
        if (this.messageListener != null) {
            _loc3_ = new RoomWidgetStickieSendUpdateMessage("RWSUM_STICKIE_SEND_UPDATE", this._objectId, this._text, this._colorHex);
            this.messageListener.processWidgetMessage(_loc3_);
        }
        this.showInterface();
    }

    protected sendDelete(): void {
        let _loc1_: RoomWidgetStickieSendUpdateMessage = null;
        if (this._objectId == -1) {
            return;
        }
        if (this.messageListener != null && this._controller) {
            _loc1_ = new RoomWidgetStickieSendUpdateMessage("RWSUM_STICKIE_SEND_DELETE", this._objectId);
            this.messageListener.processWidgetMessage(_loc1_);
        }
    }

    private onTextWindowEvent = (param1: WindowEvent): void => {
        let _loc2_: ITextFieldWindow = null;
        _loc2_ = asGuarded(this._window.findChildByName("text"), isITextFieldWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.maxChars = 500;
        if (_loc2_.numLines < 14) {
            return;
        }
        _loc2_.text = _loc2_.text.slice(0, _loc2_.text.length - 1);
        _loc2_.maxChars = _loc2_.length;
    };

    protected onMouseEvent = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "blue":
            case "purple":
            case "green":
            case "yellow":
            case "white":
            case "red":
            case "orange":
            case "cyan":
                this.sendSetColor(_loc2_.color);
                break;
            case "close":
                this.hideInterface();
                break;
            case "delete":
                this.sendDelete();
                this.hideInterface(false);
        }
    };
}
