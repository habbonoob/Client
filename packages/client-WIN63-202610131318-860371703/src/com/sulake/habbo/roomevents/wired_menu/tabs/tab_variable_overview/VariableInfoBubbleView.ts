import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FixedSizeStack } from '@/com/sulake/habbo/utils/FixedSizeStack';

export class VariableInfoBubbleView implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_variable_overview::VariableInfoBubbleView'); }

    private static readonly _SafeStr_7598: number = 18;
    public static readonly _SafeStr_7531: number = 3;
    private static readonly MAX_VERTICAL_LEAD_RATIO: number = 0.05;
    private static STATE_IDLE: number = 0;
    private static STATE_AWAIT_TARGET_RECT: number = 1;
    private static STATE_ACTIVE: number = 1;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    private _state: number = VariableInfoBubbleView.STATE_IDLE;

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _SafeStr_6721: boolean;
    static { (this.prototype as any)._SafeStr_6721 = false; }

    declare private _window: IWindowContainer;

    private _SafeStr_4471: number = 0;
    protected _SafeStr_3920: FixedSizeStack = new FixedSizeStack(18);

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        let _loc2_: XmlAsset = asInstanceOf(this._roomEvents.assets.getAssetByName("variable_value_info_bubble_xml"), XmlAsset);
        this._window = asGuarded(this._roomEvents.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML), 0), isIWindowContainer);
        this._window.ignoreMouseEvents = true;
    }

    public updateValue(param1: string): void {
        if (this._state == VariableInfoBubbleView.STATE_IDLE) {
            return;
        }
        this.valueText.text = param1;
    }

    public setActive(param1: string, param2: number, param3: number, param4: boolean): void {
        if (this._state != VariableInfoBubbleView.STATE_IDLE) {
            return;
        }
        this.valueText.text = param1;
        this._objectId = param2;
        this._category = param3;
        this._SafeStr_6721 = param4;
        this._state = VariableInfoBubbleView.STATE_AWAIT_TARGET_RECT;
    }

    public setInactive(): void {
        this.valueText.text = "";
        this._objectId = 0;
        this._category = 0;
        this._SafeStr_4471 = 0;
        this._SafeStr_3920.reset();
        this._state = VariableInfoBubbleView.STATE_IDLE;
        this.hide();
    }

    private show(): void {
        let _loc1_: IDesktopWindow = null;
        this._window.visible = true;
        if (this._window.parent == null) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        } else {
            this._window.activate();
        }
    }

    private hide(): void {
        let _loc1_: IDesktopWindow = null;
        this._window.visible = false;
        if (this._window.parent != null) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    private get valueText(): ITextWindow {
        return asGuarded(this._window.findChildByName("value"), isITextWindow);
    }

    public update(param1: number): void {
        if (this._state == VariableInfoBubbleView.STATE_IDLE) {
            return;
        }
        let _loc13_: IRoomEngine = this._roomEvents.roomEngine;
        let _loc3_: IRoomDesktop = this._roomEvents.roomDesktop;
        let _loc8_: Rectangle = _loc13_.getRoomObjectBoundingRectangle(_loc13_.activeRoomId, this._objectId, this._category, _loc3_.getFirstCanvasId());
        let _loc9_: Point = _loc13_.getRoomObjectScreenLocation(_loc13_.activeRoomId, this._objectId, this._category, _loc3_.getFirstCanvasId());
        let _loc10_: Rectangle = _loc3_.getRoomViewRect();
        if (_loc8_ && _loc9_ && _loc10_) {
            _loc8_.offset(_loc10_.x, _loc10_.y);
            _loc9_.offset(_loc10_.x, _loc10_.y);
        }
        if (!_loc8_ || !_loc9_) {
            return;
        }
        let _loc2_: number = this.getOffset(_loc8_);
        let _loc4_: number = _loc9_.y - _loc8_.top | 0;
        this._SafeStr_3920.addValue(_loc4_);
        let _loc5_: number = this._SafeStr_3920.getMax();
        if (_loc5_ < this._SafeStr_4471 - 3) {
            _loc5_ = this._SafeStr_4471 - 3;
        }
        let _loc12_: number = _loc9_.y - _loc5_ | 0;
        this._SafeStr_4471 = _loc5_;
        let _loc7_: number = _loc8_.top + _loc2_ | 0;
        let _loc11_: number = _loc7_ - this.getMaximumVerticalLead(_loc8_);
        let _loc6_: number = _loc12_ + _loc2_;
        if (_loc6_ < _loc11_) {
            _loc6_ = _loc11_;
        }
        this._window.x = _loc9_.x - this._window.width / 2 | 0;
        this._window.y = _loc6_;
        if (this._state == VariableInfoBubbleView.STATE_AWAIT_TARGET_RECT) {
            this._state = VariableInfoBubbleView.STATE_ACTIVE;
            this.show();
        }
    }

    private getOffset(param1: Rectangle): number {
        let _loc2_: number = -this._window.height;
        if (this._SafeStr_6721) {
            _loc2_ -= 10;
        } else {
            _loc2_ -= 4;
        }
        return _loc2_;
    }

    private getMaximumVerticalLead(param1: Rectangle): number {
        return param1.height * 0.05 | 0;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get category(): number {
        return this._category;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.hide();
        this._window.dispose();
        this._window = null;
        this._roomEvents = null;
        this._SafeStr_3920 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
