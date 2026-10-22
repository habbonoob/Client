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
    private static STATE_IDLE: number = 0;
    private static STATE_AWAIT_TARGET_RECT: number = 1;
    private static STATE_ACTIVE: number = 1;

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        let _loc2_: XmlAsset = asInstanceOf(this._roomEvents.assets.getAssetByName("variable_value_info_bubble_xml"), XmlAsset);
        this._window = asGuarded(this._roomEvents.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML), 0), isIWindowContainer);
        this._window.ignoreMouseEvents = true;
    }

    protected _SafeStr_3920: FixedSizeStack = new FixedSizeStack(18);

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

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get category(): number {
        return this._category;
    }

    private get valueText(): ITextWindow {
        return asGuarded(this._window.findChildByName("value"), isITextWindow);
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

    public update(param1: number): void {
        if (this._state == VariableInfoBubbleView.STATE_IDLE) {
            return;
        }
        let _loc10_: IRoomEngine = this._roomEvents.roomEngine;
        let _loc3_: IRoomDesktop = this._roomEvents.roomDesktop;
        let _loc4_: Rectangle = _loc10_.getRoomObjectBoundingRectangle(_loc10_.activeRoomId, this._objectId, this._category, _loc3_.getFirstCanvasId());
        let _loc5_: Point = _loc10_.getRoomObjectScreenLocation(_loc10_.activeRoomId, this._objectId, this._category, _loc3_.getFirstCanvasId());
        let _loc6_: Rectangle = _loc3_.getRoomViewRect();
        if (_loc4_ && _loc5_ && _loc6_) {
            _loc4_.offset(_loc6_.x, _loc6_.y);
            _loc5_.offset(_loc6_.x, _loc6_.y);
        }
        if (!_loc4_ || !_loc5_) {
            return;
        }
        let _loc2_: number = this.getOffset(_loc4_);
        let _loc7_: number = _loc5_.y - _loc4_.top | 0;
        this._SafeStr_3920.addValue(_loc7_);
        let _loc8_: number = this._SafeStr_3920.getMax();
        if (_loc8_ < this._SafeStr_4471 - 3) {
            _loc8_ = this._SafeStr_4471 - 3;
        }
        let _loc9_: number = _loc5_.y - _loc8_ | 0;
        this._SafeStr_4471 = _loc8_;
        this._window.x = _loc5_.x - this._window.width / 2 | 0;
        this._window.y = _loc9_ + _loc2_;
        if (this._state == VariableInfoBubbleView.STATE_AWAIT_TARGET_RECT) {
            this._state = VariableInfoBubbleView.STATE_ACTIVE;
            this.show();
        }
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

    private getOffset(param1: Rectangle): number {
        let _loc2_: number = -this._window.height;
        if (this._SafeStr_6721) {
            _loc2_ += param1.height > 50 ? 25 : 0;
        } else {
            _loc2_ -= 4;
        }
        return _loc2_;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
