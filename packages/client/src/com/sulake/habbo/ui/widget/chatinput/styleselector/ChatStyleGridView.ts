import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { ChatStyleSelector } from '@/com/sulake/habbo/ui/widget/chatinput/styleselector/ChatStyleSelector';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ChatStyleGridView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput.styleselector::ChatStyleGridView'); }

    private static readonly SCREEN_LEFT_BORDER: number = 92;

    constructor(param1: ChatStyleSelector, param2: ISessionDataManager) {
        this._SafeStr_5627 = param1;
        let _loc3_: IAssetLibrary = param1.chatInputView.widget.assets;
        this._window = castGuarded(param1.chatInputView.widget.windowManager.buildFromXML(XML.from(_loc3_.getAssetByName("styleselector_menu_new_xml").content)), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        this._window.visible = false;
    }

    declare private _SafeStr_5627: ChatStyleSelector;

    declare private _window: IBorderWindow;

    public get window(): IBorderWindow {
        return this._window;
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    public get grid(): IItemGridWindow {
        return castGuarded(this._window.findChildByName("itemgrid"), isIItemGridWindow, "com.sulake.core.window.components.IItemGridWindow");
    }

    public dispose(): void {
        this._window.dispose();
        this._window = null;
        this._SafeStr_5627 = null;
    }

    public alignToSelector(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        let _loc4_: Rectangle = new Rectangle();
        param1.getGlobalRectangle(_loc4_);
        let _loc3_: IWindowContainer = castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.x = _loc4_.right - this._window.width | 0;
        _loc3_.y = _loc4_.bottom - this._window.height | 0;
        let _loc5_: Point = new Point();
        _loc3_.getGlobalPosition(_loc5_);
        if (_loc5_.x < 92) {
            _loc2_ = 92 - _loc5_.x | 0;
            _loc3_.x += _loc2_;
        }
        _loc3_.x = _loc4_.x | 0;
        _loc3_.y = _loc4_.bottom - 35 - this._window.height | 0;
    }

    get [IDisposable](): true {
        return true;
    }
}
