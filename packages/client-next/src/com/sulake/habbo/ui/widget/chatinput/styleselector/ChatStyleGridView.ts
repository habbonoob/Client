import { asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomChatInputView } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputView';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ChatStyleGridView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput.styleselector::ChatStyleGridView'); }

    private static readonly SCREEN_LEFT_BORDER: number = 92;
    private static readonly CHAT_BAR_POPUP_OFFSET: number = 55;

    declare private _window: IBorderWindow;

    declare private _chatInputView: RoomChatInputView;

    constructor(param1: RoomChatInputView) {
        this._chatInputView = param1;
        let _loc2_: IAssetLibrary = param1.widget.assets;
        let _loc3_: XmlAsset = asInstanceOf(_loc2_.getAssetByName("styleselector_menu_new_xml"), XmlAsset);
        this._window = _loc3_ == null || _loc3_.content == null ? null : castGuarded(param1.widget.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
        }
        this._window = null;
        this._chatInputView = null;
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    public get grid(): IItemGridWindow {
        if (this._window == null) {
            return null;
        }
        return castGuarded(this._window.findChildByName("itemgrid"), isIItemGridWindow, "com.sulake.core.window.components.IItemGridWindow");
    }

    public get fontSizeList(): IItemListWindow {
        if (this._window == null) {
            return null;
        }
        return castGuarded(this._window.findChildByName("font_size_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
    }

    public get window(): IBorderWindow {
        return this._window;
    }

    public alignToSelector(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        if (this._window == null || param1 == null || this._window.parent == null) {
            return;
        }
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
        _loc3_.y = _loc4_.bottom - 55 - this._window.height | 0;
    }

    get [IDisposable](): true {
        return true;
    }
}
