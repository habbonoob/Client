import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomChatWidget } from '@/com/sulake/habbo/ui/widget/roomchat/RoomChatWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { TrackedBitmapData } from '@/com/sulake/core/utils/profiler/tracking/TrackedBitmapData';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RoomChatHistoryPulldown {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomchat::RoomChatHistoryPulldown'); }

    public static readonly STATE_FADE_OUT: number = 3;
    public static readonly STATE_FADE_IN: number = 2;
    public static readonly STATE_VISIBLE: number = 1;
    public static readonly STATE_HIDDEN: number = 0;
    public static readonly PULLDOWN_WINDOW_HEIGHT: number = 39;
    private static readonly FADE_OUT_MS: number = 150;
    private static readonly FADE_IN_MS: number = 250;

    constructor(param1: RoomChatWidget, param2: IHabboWindowManager, param3: IWindowContainer, param4: IAssetLibrary) {
        this._widget = param1;
        this._windowManager = param2;
        this._SafeStr_3052 = param4;
        this._SafeStr_2175 = param3;
        this._SafeStr_5980 = asInstanceOf((asInstanceOf(this._SafeStr_3052.getAssetByName("chat_grapbar_bg"), BitmapDataAsset)).content, BitmapData);
        this._SafeStr_5763 = asInstanceOf((asInstanceOf(this._SafeStr_3052.getAssetByName("chat_grapbar_grip"), BitmapDataAsset)).content, BitmapData);
        this._SafeStr_6805 = asInstanceOf((asInstanceOf(this._SafeStr_3052.getAssetByName("chat_grapbar_handle"), BitmapDataAsset)).content, BitmapData);
        this._SafeStr_5629 = asInstanceOf((asInstanceOf(this._SafeStr_3052.getAssetByName("chat_grapbar_x"), BitmapDataAsset)).content, BitmapData);
        this._SafeStr_5762 = asInstanceOf((asInstanceOf(this._SafeStr_3052.getAssetByName("chat_grapbar_x_hi"), BitmapDataAsset)).content, BitmapData);
        this._SafeStr_6082 = asInstanceOf((asInstanceOf(this._SafeStr_3052.getAssetByName("chat_grapbar_x_pr"), BitmapDataAsset)).content, BitmapData);
        this._SafeStr_7101 = asInstanceOf((asInstanceOf(this._SafeStr_3052.getAssetByName("chat_history_bg"), BitmapDataAsset)).content, BitmapData);
        this._SafeStr_2249 = asGuarded(this._windowManager.createWindow("chat_history_bg", "", 21, 0, 16, new Rectangle(0, 0, param3.width, param3.height - 39), null, 0, 0), isIBitmapWrapperWindow);
        this._SafeStr_2175.addChild(this._SafeStr_2249);
        this._window = asGuarded(this._windowManager.createWindow("chat_pulldown", "", 4, 0, (1 | 0x10) >>> 0, new Rectangle(0, this._SafeStr_2175.height - 39, param3.width, 39), null, 0), isIWindowContainer);
        this._SafeStr_2175.addChild(this._window);
        this._SafeStr_2394 = asGuarded(this._windowManager.createWindow("REGIONchat_pulldown", "", 5, 0, (1 | 0x10 | 0 | 0) >>> 0, new Rectangle(0, 0, param3.width, param3.height - 39), null, 0), isIRegionWindow);
        if (this._SafeStr_2394 != null) {
            this._SafeStr_2394.background = true;
            this._SafeStr_2394.mouseThreshold = 0;
            this._SafeStr_2394.addEventListener("WME_DOWN", this.onPulldownMouseDown);
            this._SafeStr_2175.addChild(this._SafeStr_2394);
            this._SafeStr_2394.toolTipCaption = "${chat.history.drag.tooltip}";
            this._SafeStr_2394.toolTipDelay = 250;
        }
        let _loc6_: XmlAsset = asInstanceOf(param4.getAssetByName("chat_history_pulldown"), XmlAsset);
        this._window.buildFromXML(asInstanceOf(_loc6_.content, XML));
        this._window.addEventListener("WME_DOWN", this.onPulldownMouseDown);
        let _loc5_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("GrapBarX"), isIBitmapWrapperWindow);
        if (_loc5_ != null) {
            _loc5_.mouseThreshold = 0;
            _loc5_.addEventListener("WME_CLICK", this.onCloseButtonClicked);
            _loc5_.addEventListener("WME_UP", this.onCloseButtonMouseUp);
            _loc5_.addEventListener("WME_DOWN", this.onCloseButtonMouseDown);
            _loc5_.addEventListener("WME_OVER", this.onCloseButtonMouseOver);
            _loc5_.addEventListener("WME_OUT", this.onCloseButtonMouseOut);
        }
        this._window.background = true;
        this._window.color = 0;
        this._window.mouseThreshold = 0;
        this.state = 0;
        this.buildWindowGraphics();
    }

    declare private _widget: RoomChatWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2249: IBitmapWrapperWindow;

    declare private _SafeStr_2175: IWindowContainer;

    declare private _SafeStr_2394: IRegionWindow;

    declare private _SafeStr_3052: IAssetLibrary;

    private _lastWidth: number = 0;
    private _state: number = -1;

    declare private _SafeStr_5980: BitmapData;

    declare private _SafeStr_5763: BitmapData;

    declare private _SafeStr_6805: BitmapData;

    declare private _SafeStr_5629: BitmapData;

    declare private _SafeStr_5762: BitmapData;

    declare private _SafeStr_6082: BitmapData;

    declare private _SafeStr_7101: BitmapData;

    private _regionRightMargin: number = 30;

    public get state(): number {
        return this._state;
    }

    public set state(param1: number) {
        if (param1 == this._state) {
            return;
        }
        switch (param1) {
            case 0:
                if (this._window == null || this._SafeStr_2249 == null) {
                    return;
                }
                this._window.visible = false;
                this._SafeStr_2249.visible = false;
                this._SafeStr_2394.visible = false;
                this._state = param1;
                break;
            case 1:
                if (this._state == 0) {
                    this.state = 2;
                    break;
                }
                if (this._window == null || this._SafeStr_2249 == null) {
                    return;
                }
                this._window.visible = true;
                this._SafeStr_2249.visible = true;
                this._SafeStr_2394.visible = true;
                this._state = param1;
                break;
            case 2:
                if (this._window == null || this._SafeStr_2249 == null) {
                    return;
                }
                this._window.blend = 0;
                this._SafeStr_2249.blend = 0;
                this._window.visible = true;
                this._SafeStr_2249.visible = true;
                this._state = param1;
                break;
            case 3:
                if (this._window == null || this._SafeStr_2249 == null) {
                    return;
                }
                this._window.blend = 1;
                this._SafeStr_2249.blend = 1;
                this._state = param1;
        }
    }

    public dispose(): void {
        if (this._SafeStr_2394 != null) {
            this._SafeStr_2394.dispose();
            this._SafeStr_2394 = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2249 != null) {
            this._SafeStr_2249.dispose();
            this._SafeStr_2249 = null;
        }
    }

    public update(param1: number): void {
        switch (this.state - 2) {
            case 0:
                this._SafeStr_2249.blend += param1 / 250;
                this._window.blend += param1 / 250;
                if (this._window.blend >= 1) {
                    this.state = 1;
                }
                break;
            case 1:
                this._SafeStr_2249.blend -= param1 / 150;
                this._window.blend -= param1 / 150;
                if (this._window.blend <= 0) {
                    this.state = 0;
                }
        }
    }

    public containerResized(param1: Rectangle): void {
        if (this._window != null) {
            this._window.x = 0;
            this._window.y = this._SafeStr_2175.height - 39;
            this._window.width = this._SafeStr_2175.width;
        }
        if (this._SafeStr_2394 != null) {
            this._SafeStr_2394.x = 0;
            this._SafeStr_2394.y = this._SafeStr_2175.height - 39;
            this._SafeStr_2394.width = this._SafeStr_2175.width - this._regionRightMargin;
        }
        if (this._SafeStr_2249 != null) {
            this._SafeStr_2249.rectangle = this._SafeStr_2175.rectangle;
            this._SafeStr_2249.height -= 39;
        }
        this.buildWindowGraphics();
    }

    private buildWindowGraphics(): void {
        let _loc12_: number = 0;
        let _loc2_: number = 0;
        let _loc7_: BitmapData = null;
        let _loc3_: BitmapData = null;
        let _loc5_: BitmapData = null;
        if (this._window == null) {
            return;
        }
        if (this._lastWidth == this._window.width) {
            return;
        }
        this._lastWidth = this._window.width;
        let _loc6_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("grapBarBg"), isIBitmapWrapperWindow);
        let _loc8_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("GrapBarX"), isIBitmapWrapperWindow);
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("grapBarGripL"), isIBitmapWrapperWindow);
        let _loc9_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("grapBarGripR"), isIBitmapWrapperWindow);
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("grapBarHandle"), isIBitmapWrapperWindow);
        let _loc11_: number = 5;
        if (_loc8_ != null && _loc4_ != null) {
            _loc4_.bitmap = this._SafeStr_6805;
            _loc4_.disposesBitmap = false;
            _loc8_.bitmap = this._SafeStr_5629;
            _loc8_.disposesBitmap = false;
            this._regionRightMargin = this._window.width - _loc8_.x;
        }
        _loc1_.width = _loc4_.x - _loc11_;
        _loc1_.x = 0;
        _loc9_.x = _loc4_.x + _loc4_.width + _loc11_;
        _loc9_.width = _loc8_.x - _loc11_ - _loc9_.x;
        if (_loc1_.width < 0) {
            _loc1_.width = 0;
        }
        if (_loc9_.width < 0) {
            _loc9_.width = 0;
        }
        let _loc10_: number = 0;
        if (_loc6_ != null && _loc1_ != null && _loc9_ != null) {
            try {
                _loc10_ = 1;
                _loc2_ = _loc6_.width;
                _loc12_ = _loc6_.height;
                if (_loc2_ > 0 && _loc12_ > 0) {
                    _loc7_ = new TrackedBitmapData(this, _loc2_, _loc12_);
                    this.tileBitmapHorz(this._SafeStr_5980, _loc7_);
                    _loc6_.disposesBitmap = true;
                    _loc6_.bitmap = _loc7_;
                }
                _loc10_ = 2;
                _loc2_ = _loc1_.width;
                _loc12_ = _loc1_.height;
                if (_loc2_ > 0 && _loc12_ > 0) {
                    _loc3_ = new TrackedBitmapData(this, _loc2_, _loc12_);
                    this.tileBitmapHorz(this._SafeStr_5763, _loc3_);
                    _loc1_.disposesBitmap = true;
                    _loc1_.bitmap = _loc3_;
                }
                _loc10_ = 3;
                _loc2_ = _loc9_.width;
                _loc12_ = _loc9_.height;
                if (_loc2_ > 0 && _loc12_ > 0) {
                    _loc5_ = new TrackedBitmapData(this, _loc2_, _loc12_);
                    this.tileBitmapHorz(this._SafeStr_5763, _loc5_);
                    _loc9_.disposesBitmap = true;
                    _loc9_.bitmap = _loc5_;
                }
            } catch (e) {
                throw Object.assign(new Error(e.message + " width:" + _loc2_ + " height:" + _loc12_ + " state:" + _loc10_), { errorID: (e.errorID ?? 0) });
            }
        }
        if (this._SafeStr_2249 == null) {
            return;
        }
        this._SafeStr_2249.bitmap = this._SafeStr_7101;
        this._SafeStr_2249.disposesBitmap = false;
    }

    private tileBitmapHorz(param1: BitmapData, param2: BitmapData): void {
        let _loc4_: number = 0;
        let _loc3_: number = param2.width / param1.width | 0;
        let _loc5_: Point = new Point();
        _loc4_ = 0;
        while (_loc4_ < _loc3_ + 1) {
            _loc5_.x = _loc4_ * param1.width;
            param2.copyPixels(param1, param1.rect, _loc5_);
            _loc4_++;
        }
    }

    private onPulldownMouseDown = (param1: WindowMouseEvent): void => {
        if (this._widget != null) {
            this._widget.onPulldownMouseDown(param1);
        }
    };

    private onCloseButtonClicked = (param1: WindowMouseEvent): void => {
        if (this._widget != null) {
            this._widget.onPulldownCloseButtonClicked(param1);
        }
    };

    private onCloseButtonMouseOver = (param1: WindowMouseEvent): void => {
        if (this._window == null) {
            return;
        }
        if (!this._window.visible) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("GrapBarX"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc2_.disposesBitmap = false;
            _loc2_.bitmap = this._SafeStr_5762;
        }
    };

    private onCloseButtonMouseOut = (param1: WindowMouseEvent): void => {
        if (this._window == null) {
            return;
        }
        if (!this._window.visible) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("GrapBarX"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc2_.disposesBitmap = false;
            _loc2_.bitmap = this._SafeStr_5629;
        }
    };

    private onCloseButtonMouseDown = (param1: WindowMouseEvent): void => {
        if (this._window == null) {
            return;
        }
        if (!this._window.visible) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("GrapBarX"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc2_.disposesBitmap = false;
            _loc2_.bitmap = this._SafeStr_6082;
        }
    };

    private onCloseButtonMouseUp = (param1: WindowMouseEvent): void => {
        if (this._window == null) {
            return;
        }
        if (!this._window.visible) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("GrapBarX"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc2_.disposesBitmap = false;
            _loc2_.bitmap = this._SafeStr_5762;
        }
    };
}
