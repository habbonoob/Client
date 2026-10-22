import { asGuarded, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class DesktopLayoutManager {
    static { registerClassName(this, 'com.sulake.habbo.ui::DesktopLayoutManager'); }

    private static readonly ROOM_VIEW: string = "room_view";
    private static readonly ROOM_NEW_CHAT: string = "room_new_chat";
    private static readonly ROOM_WIDGET: string = "room_widget";
    private static readonly BOTTOM_MARGIN: number = 47;

    declare private _layoutContainer: IWindowContainer;

    constructor() {
    }

    public dispose(): void {
        if (this._layoutContainer != null) {
            this._layoutContainer.dispose();
        }
    }

    public setLayout(param1: XML, param2: IHabboWindowManager, param3: ICoreConfiguration): void {
        let _loc7_: IWindow = null;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        if (param1 == null || param2 == null) {
            throw new Error("Unable to set room desktop layout.");
        }
        this._layoutContainer = asGuarded(param2.buildFromXML(param1, 0), isIWindowContainer);
        if (this._layoutContainer == null) {
            throw new Error("Failed to build layout from XML.");
        }
        this._layoutContainer.width = this._layoutContainer.desktop.width;
        this._layoutContainer.height = this._layoutContainer.desktop.height;
        let _loc4_: IWindowContainer = asGuarded(this._layoutContainer.desktop, isIWindowContainer);
        _loc4_.addChild(this._layoutContainer);
        this._layoutContainer.findChildByTag("room_widget_infostand").y = this._layoutContainer.findChildByTag("room_widget_infostand").y - 47;
        _loc6_ = 0;
        while (_loc6_ < this._layoutContainer.numChildren) {
            _loc7_ = this._layoutContainer.getChildAt(_loc6_);
            _loc5_ = 1048576;
            if (_loc7_.testParamFlag(_loc5_ >>> 0)) {
                _loc7_.addEventListener("WE_CHILD_RESIZED", this.trimContainer);
            }
            _loc6_++;
        }
    }

    private trimContainer = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = asGuarded(param1.window, isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.numChildren != 1) {
            return;
        }
        let _loc3_: IWindow = _loc2_.getChildAt(0);
        if (_loc3_ == null) {
            return;
        }
        _loc2_.width = _loc3_.width;
        _loc2_.height = _loc3_.height;
    };

    private getWidgetContainer(param1: string, param2: IWindow): IWindowContainer {
        let _loc7_: any = null;
        let _loc3_: any = null;
        let _loc5_: string = null;
        let _loc6_: number = 0;
        if (param2 == null) {
            return null;
        }
        if (param1 == "RWE_HIGH_SCORE_DISPLAY" || param1 == "RWE_WORD_QUIZZ") {
            return asGuarded(this._layoutContainer.getChildByName("background_widgets"), isIWindowContainer);
        }
        if (param1 == "RWE_CHAT_INPUT_WIDGET") {
            return asGuarded(param2.desktop, isIWindowContainer);
        }
        let _loc8_: any[] = param2.tags;
        _loc6_ = 0;
        while (_loc6_ < _loc8_.length) {
            if (String(_loc8_[_loc6_]).indexOf("room_widget") == 0) {
                _loc5_ = asGuarded(_loc8_[_loc6_], isString);
                break;
            }
            _loc6_++;
        }
        if (_loc5_ == null) {
            return null;
        }
        return asGuarded(this._layoutContainer.getChildByTag(_loc5_), isIWindowContainer);
    }

    public addWidgetWindow(param1: string, param2: IWindow): boolean {
        if (param2 == null) {
            return false;
        }
        let _loc3_: IWindowContainer = this.getWidgetContainer(param1, param2);
        if (_loc3_ == null) {
            return false;
        }
        if (param1 == "RWE_CHAT_INPUT_WIDGET") {
            _loc3_.addChild(param2);
            return true;
        }
        param2.x = 0;
        param2.y = 0;
        _loc3_.addChild(param2);
        _loc3_.width = param2.width;
        _loc3_.height = param2.height;
        return true;
    }

    public removeWidgetWindow(param1: string, param2: IWindow): void {
        let _loc3_: IWindowContainer = this.getWidgetContainer(param1, param2);
        if (_loc3_ != null) {
            _loc3_.removeChild(param2);
        }
    }

    public addRoomView(param1: IWindow): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc2_: IWindowContainer = asGuarded(this._layoutContainer.getChildByTag("room_view"), isIWindowContainer);
        if (_loc2_ == null) {
            return false;
        }
        _loc2_.addChild(param1);
        return true;
    }

    public get roomViewRect(): Rectangle {
        if (this._layoutContainer == null) {
            return null;
        }
        let _loc1_: IWindowContainer = asGuarded(this._layoutContainer.findChildByTag("room_view"), isIWindowContainer);
        if (!_loc1_) {
            return null;
        }
        let _loc2_: Rectangle = _loc1_.rectangle;
        if (!_loc2_) {
            return null;
        }
        _loc2_.offset(this._layoutContainer.x, this._layoutContainer.y);
        return _loc2_;
    }

    public getRoomView(): IWindow {
        if (this._layoutContainer == null) {
            return null;
        }
        let _loc1_: IWindowContainer = asGuarded(this._layoutContainer.findChildByTag("room_view"), isIWindowContainer);
        if (_loc1_ != null && _loc1_.numChildren > 0) {
            return _loc1_.getChildAt(0);
        }
        return null;
    }

    public getChatContainer(): IDisplayObjectWrapper {
        if (this._layoutContainer == null) {
            return null;
        }
        return asGuarded(this._layoutContainer.findChildByTag("room_new_chat"), isIDisplayObjectWrapper);
    }
}
