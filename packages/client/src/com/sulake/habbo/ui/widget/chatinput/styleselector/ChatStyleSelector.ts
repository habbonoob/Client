import { asGuarded, asInstanceOf, castGuarded, isUint } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IChatStyle } from '@/com/sulake/habbo/freeflowchat/style/IChatStyle';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { RoomChatInputView } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputView';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import type { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ChatStyleGridEntry } from '@/com/sulake/habbo/ui/widget/chatinput/styleselector/ChatStyleGridEntry';
import { ChatStyleGridView } from '@/com/sulake/habbo/ui/widget/chatinput/styleselector/ChatStyleGridView';

export class ChatStyleSelector implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput.styleselector::ChatStyleSelector'); }

    private static readonly GRID_SPACING: number = 1;
    private static readonly MAX_GRID_COLUMNS: number = 6;
    private static _styleRequiresUpdate: boolean = false;

    constructor(param1: RoomChatInputView, param2: IWindowContainer, param3: ISessionDataManager) {
        this._chatInputView = param1;
        this._gridView = new ChatStyleGridView(this, this._chatInputView.sessionDataManager);
        this._SafeStr_4638 = param1.widget.windowManager.buildFromXML(asInstanceOf(param1.widget.assets.getAssetByName("chatinput_chatstyle_template_xml").content, XML));
        this._container = param2;
        this._container.procedure = this.windowProc;
        this._chatInputView.chatStyleMenuContainer.addChild(this._gridView.window);
        this._gridView.window.x = 0;
        this._gridView.window.y = 0;
    }

    declare private _chatInputView: RoomChatInputView;

    declare private _container: IWindowContainer;

    declare private _gridView: ChatStyleGridView;

    private _entries: ChatStyleGridEntry[] = [];

    declare private _SafeStr_4638: IWindow;

    declare private _SafeStr_2635: Shape;

    public get disposed(): boolean {
        return this._gridView == null;
    }

    public get chatInputView(): RoomChatInputView {
        return this._chatInputView;
    }

    public get selectedStyleId(): number {
        if (ChatStyleSelector._styleRequiresUpdate && this.selected) {
            ChatStyleSelector._styleRequiresUpdate = false;
            return this.selected.id;
        }
        return -1;
    }

    public get selectedStyleBitmap(): BitmapData {
        if (this.selected) {
            return this.selected.bitmap;
        }
        return null;
    }

    public set gridColumns(param1: number) {
        param1 = Math.min(param1, 6) | 0;
        let _loc2_: number = (param1 - 1) * (this._SafeStr_4638.width + 1) + this._SafeStr_4638.width;
        if (param1 > 1) {
            this._gridView.grid.width = _loc2_;
        } else {
            this._gridView.grid.width = this._SafeStr_4638.width + 16;
        }
    }

    private static _selected: ChatStyleGridEntry = null;

    private get selected(): ChatStyleGridEntry {
        if (ChatStyleSelector._selected == null) {
            ChatStyleSelector._selected = this._entries[this._entries.length - 1];
        }
        return ChatStyleSelector._selected;
    }

    private set selected(param1: ChatStyleGridEntry) {
        ChatStyleSelector._selected = param1;
        ChatStyleSelector._styleRequiresUpdate = true;
        let _loc4_: IChatStyle = this._chatInputView.widget.roomUi.chatStyleLibrary.getStyle(param1.id);
        if (this._chatInputView.window.findChildByName("chat_bg_preview") == null) {
            return;
        }
        let _loc2_: Sprite = _loc4_.getNewBackgroundSprite(16777215);
        let _loc3_: IDisplayObjectWrapper = castGuarded(this._chatInputView.window.findChildByName("chat_bg_preview"), isIDisplayObjectWrapper, "com.sulake.core.window.components.IDisplayObjectWrapper");
        _loc2_.width = _loc3_.width + _loc4_.overlap.width;
        _loc2_.height = _loc3_.height + _loc4_.overlap.y + _loc4_.overlap.height;
        _loc2_.y -= _loc4_.overlap.y;
        if (!this._SafeStr_2635) {
            this._SafeStr_2635 = new Shape();
        } else {
            this._SafeStr_2635.graphics.clear();
        }
        this._SafeStr_2635.graphics.beginFill(16711680);
        this._SafeStr_2635.graphics.drawRect(0, 0, _loc2_.width - 28, _loc2_.height);
        _loc3_.setDisplayObject(_loc2_);
        if (_loc2_.parent) {
            _loc2_.parent.addChild(this._SafeStr_2635);
            this._SafeStr_2635.x = _loc2_.x + 28;
            this._SafeStr_2635.y = _loc2_.y;
            _loc2_.mask = this._SafeStr_2635;
        }
        this._chatInputView.setInputFieldColor(asGuarded(_loc4_.textFormat.color, isUint));
    }

    public dispose(): void {
        while (this._entries.length > 1) {
            this._entries.pop();
        }
        this._entries = null;
        this._gridView.dispose();
        this._gridView = null;
        if (this._SafeStr_2635 && this._SafeStr_2635.parent) {
            this._SafeStr_2635.parent.removeChild(this._SafeStr_2635);
        }
    }

    public addItem(param1: number, param2: BitmapData): void {
        this._entries.push(new ChatStyleGridEntry(param1, param2));
        let _loc3_: IWindowContainer = this.getGridItemWindowWrapper(param2);
        this._gridView.grid.addGridItem(_loc3_);
        _loc3_.findChildByName("background_color").visible = false;
    }

    public clear(): void {
        this._entries.splice(0, this._entries.length);
        this._gridView.grid.removeGridItems();
    }

    public initSelection(): void {
        this.selected = this.selected;
        ChatStyleSelector._styleRequiresUpdate = false;
    }

    public alignMenuToSelector(): void {
        if (this._gridView.window.visible) {
            this._gridView.alignToSelector(this._container);
        }
    }

    private getGridItemWindowWrapper(param1: BitmapData): IWindowContainer {
        let _loc2_: IWindowContainer = castGuarded(this._SafeStr_4638.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc3_: IBitmapWrapperWindow = castGuarded(_loc2_.findChildByName("bubble_preview"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc3_.bitmap = param1;
        _loc3_.center();
        _loc2_.procedure = this.gridItemWindowProc;
        return _loc2_;
    }

    private windowProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._gridView.window.visible = !this._gridView.window.visible;
            this.alignMenuToSelector();
        }
    };

    private gridItemWindowProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._gridView.grid.getGridItemIndex(param2);
            this.showBackgroundOnlyForItem(param2);
            this.selected = this._entries[_loc3_];
            this._gridView.window.visible = false;
        }
        if (param1.type == "WME_OVER") {
            castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").color = 4291875024;
        }
        if (param1.type == "WME_OUT") {
            castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").color = 4294967295;
        }
    };

    private showBackgroundOnlyForItem(param1: IWindow): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._gridView.grid.numGridItems) {
            castGuarded(this._gridView.grid.getGridItemAt(_loc2_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").visible = false;
            _loc2_++;
        }
        castGuarded(param1, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").visible = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
