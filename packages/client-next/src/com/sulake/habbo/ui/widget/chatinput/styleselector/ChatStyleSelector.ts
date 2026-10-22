import { asGuarded, asInstanceOf, castGuarded, isUint, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
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
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ChatStyleGridEntry } from '@/com/sulake/habbo/ui/widget/chatinput/styleselector/ChatStyleGridEntry';
import { ChatStyleGridView } from '@/com/sulake/habbo/ui/widget/chatinput/styleselector/ChatStyleGridView';

export class ChatStyleSelector implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput.styleselector::ChatStyleSelector'); }

    private static readonly GRID_SPACING: number = 1;
    public static readonly MAX_GRID_COLUMNS: number = 6;
    public static readonly _SafeStr_14741: number = 4;
    private static readonly FONT_SIZE_SMALL: number = 0;
    private static readonly FONT_SIZE_MEDIUM: number = 1;
    private static readonly FONT_SIZE_LARGE: number = 2;
    private static readonly FONT_SIZE_XL: number = 3;
    private static readonly FONT_SIZE_XXL: number = 4;
    private static _selected: ChatStyleGridEntry = null;
    private static _styleRequiresUpdate: boolean = false;
    private static _SafeStr_14742: number = 0;
    private static readonly FONT_SIZE_LABELS: any[] = ["S", "M", "L", "XL", "XXL"];

    declare private _chatInputView: RoomChatInputView;

    declare private _container: IWindowContainer;

    declare private _gridView: ChatStyleGridView;

    private _entries: ChatStyleGridEntry[] = [];

    declare private _SafeStr_4638: IWindow;

    declare private _SafeStr_14743: IWindow;

    declare private _SafeStr_2635: Shape;

    constructor(param1: RoomChatInputView, param2: IWindowContainer, param3: ISessionDataManager) {
        this._chatInputView = param1;
        this._gridView = new ChatStyleGridView(this._chatInputView);
        this._SafeStr_4638 = this.buildTemplateWindow("chatinput_chatstyle_template_xml");
        this._SafeStr_14743 = this.buildTemplateWindow("chatinput_chatfontsize_template_xml");
        this._container = param2;
        if (this._container != null) {
            this._container.procedure = this.windowProc;
        }
        if (this._gridView != null && this._gridView.window != null && this._chatInputView.chatStyleMenuContainer != null) {
            this._chatInputView.chatStyleMenuContainer.addChild(this._gridView.window);
            this._gridView.window.x = 0;
            this._gridView.window.y = 0;
        }
        this._chatInputView.chatStyleMenuContainer.visible = false;
        this.createFontSizeOptions();
    }

    private static isWindowInTree(param1: IWindow, param2: IWindow): boolean {
        while (param1 != null) {
            if (param1 == param2) {
                return true;
            }
            param1 = param1.parent;
        }
        return false;
    }

    public dispose(): void {
        while (this._entries.length > 1) {
            this._entries.pop();
        }
        this._entries = null;
        if (this._container != null) {
            this._container.procedure = null;
        }
        if (this._gridView != null) {
            this._gridView.dispose();
        }
        this._gridView = null;
        this._container = null;
        this._SafeStr_14743 = null;
        if (this._SafeStr_2635 && this._SafeStr_2635.parent) {
            this._SafeStr_2635.parent.removeChild(this._SafeStr_2635);
        }
    }

    public get disposed(): boolean {
        return this._gridView == null;
    }

    public get chatInputView(): RoomChatInputView {
        return this._chatInputView;
    }

    public get visible(): boolean {
        return this._chatInputView != null && this._chatInputView.chatStyleMenuContainer != null && Boolean(this._chatInputView.chatStyleMenuContainer.visible);
    }

    public hide(): void {
        if (this._chatInputView != null && this._chatInputView.chatStyleMenuContainer != null) {
            this._chatInputView.chatStyleMenuContainer.visible = false;
        }
        if (this._gridView != null && this._gridView.window != null) {
            this._gridView.window.visible = false;
        }
    }

    public containsWindow(param1: IWindow): boolean {
        return ChatStyleSelector.isWindowInTree(param1, this._container) || this._chatInputView != null && ChatStyleSelector.isWindowInTree(param1, this._chatInputView.chatStyleMenuContainer) || this._gridView != null && ChatStyleSelector.isWindowInTree(param1, this._gridView.window);
    }

    public addItem(param1: number, param2: BitmapData): void {
        if (this._gridView == null || this._gridView.grid == null || this._SafeStr_4638 == null) {
            return;
        }
        this._entries.push(new ChatStyleGridEntry(param1, param2));
        let _loc3_: IWindowContainer = this.getGridItemWindowWrapper(param2);
        if (_loc3_ == null) {
            return;
        }
        this._gridView.grid.addGridItem(_loc3_);
        _loc3_.findChildByName("background_color").visible = false;
    }

    public clear(): void {
        this._entries.splice(0, this._entries.length);
        if (this._gridView != null && this._gridView.grid != null) {
            this._gridView.grid.removeGridItems();
        }
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

    public initSelection(): void {
        if (this._entries.length == 0) {
            ChatStyleSelector._styleRequiresUpdate = false;
            return;
        }
        this.selected = this.selected;
        ChatStyleSelector._styleRequiresUpdate = false;
    }

    public initFontSizeSelection(param1: number): void {
        ChatStyleSelector._SafeStr_14742 = this.clampFontSize(param1);
        this.updateFontSizeSelectionHighlight();
    }

    public set gridColumns(param1: number) {
        if (this._SafeStr_4638 == null || this._gridView == null || this._gridView.grid == null) {
            return;
        }
        let _loc2_: number = (param1 - 1) * (this._SafeStr_4638.width + 1) + this._SafeStr_4638.width;
        if (param1 > 1) {
            this._gridView.grid.width = _loc2_;
        } else {
            this._gridView.grid.width = this._SafeStr_4638.width + 16;
        }
    }

    private set selected(param1: ChatStyleGridEntry) {
        if (param1 == null) {
            return;
        }
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

    private get selected(): ChatStyleGridEntry {
        if (ChatStyleSelector._selected == null && this._entries.length > 0) {
            ChatStyleSelector._selected = this._entries[this._entries.length - 1];
        }
        return ChatStyleSelector._selected;
    }

    private getGridItemWindowWrapper(param1: BitmapData): IWindowContainer {
        if (this._SafeStr_4638 == null) {
            return null;
        }
        let _loc2_: IWindowContainer = castGuarded(this._SafeStr_4638.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc3_: IBitmapWrapperWindow = castGuarded(_loc2_.findChildByName("bubble_preview"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc3_.bitmap = param1;
        _loc3_.center();
        _loc2_.procedure = this.gridItemWindowProc;
        return _loc2_;
    }

    private createFontSizeOptions(): void {
        let _loc1_: number = 0;
        if (this._gridView == null || this._gridView.fontSizeList == null || this._SafeStr_14743 == null) {
            return;
        }
        _loc1_ = 0;
        while (_loc1_ < ChatStyleSelector.FONT_SIZE_LABELS.length) {
            this._gridView.fontSizeList.addListItem(this.getFontSizeItemWindowWrapper(stringOrNull(ChatStyleSelector.FONT_SIZE_LABELS[_loc1_]), _loc1_));
            _loc1_++;
        }
        this.updateFontSizeSelectionHighlight();
    }

    private getFontSizeItemWindowWrapper(param1: string, param2: number): IWindowContainer {
        if (this._SafeStr_14743 == null) {
            return null;
        }
        let _loc3_: IWindowContainer = castGuarded(this._SafeStr_14743.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.id = param2;
        castGuarded(_loc3_.findChildByName("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").caption = param1;
        _loc3_.procedure = this.fontSizeItemWindowProc;
        return _loc3_;
    }

    public alignMenuToSelector(): void {
        if (this._gridView != null && this._gridView.window != null && Boolean(this._gridView.window.visible)) {
            this._gridView.alignToSelector(this._container);
        }
    }

    private buildTemplateWindow(param1: string): IWindow {
        let _loc2_: XmlAsset = asInstanceOf(this._chatInputView.widget.assets.getAssetByName(param1), XmlAsset);
        if (_loc2_ == null || _loc2_.content == null) {
            return null;
        }
        return this._chatInputView.widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML));
    }

    private windowProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK_AWAY") {
            this.hideIfClickAway(param1.related);
            return;
        }
        if (param1.type == "WME_CLICK") {
            ChatStyleSelector._SafeStr_14742 = this.clampFontSize(this._chatInputView.widget.handler.container.freeFlowChat.chatFontSizeMode);
            this.updateFontSizeSelectionHighlight();
            _loc3_ = !this._chatInputView.chatStyleMenuContainer.visible;
            this._chatInputView.chatStyleMenuContainer.visible = _loc3_;
            this._gridView.window.visible = _loc3_;
            if (_loc3_) {
                this._chatInputView.hideHabbiconSelector();
            }
            this.alignMenuToSelector();
        }
    };

    private gridItemWindowProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (param1.type == "WME_CLICK_AWAY") {
            this.hideIfClickAway(param1.related);
            return;
        }
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._gridView.grid.getGridItemIndex(param2);
            this.showBackgroundOnlyForItem(param2);
            this.selected = this._entries[_loc3_];
        }
        if (param1.type == "WME_OVER") {
            castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").color = 4291875024;
        }
        if (param1.type == "WME_OUT") {
            castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").color = 4294967295;
        }
    };

    private fontSizeItemWindowProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK_AWAY") {
            this.hideIfClickAway(param1.related);
            return;
        }
        let _loc3_: IWindowContainer = this.resolveFontSizeItem(param2);
        if (_loc3_ == null) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            ChatStyleSelector._SafeStr_14742 = this.clampFontSize(_loc3_.id);
            this._chatInputView.widget.handler.container.freeFlowChat.chatFontSizeMode = ChatStyleSelector._SafeStr_14742;
            this.updateFontSizeSelectionHighlight();
        }
        if (param1.type == "WME_OVER") {
            _loc3_.findChildByName("background_color").color = 4291875024;
        }
        if (param1.type == "WME_OUT") {
            _loc3_.findChildByName("background_color").color = 4294967295;
        }
    };

    private hideIfClickAway(param1: IWindow): void {
        if (this.visible && !this.containsWindow(param1)) {
            this.hide();
        }
    }

    private showBackgroundOnlyForItem(param1: IWindow): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._gridView.grid.numGridItems) {
            castGuarded(this._gridView.grid.getGridItemAt(_loc2_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").visible = false;
            _loc2_++;
        }
        castGuarded(param1, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("background_color").visible = true;
    }

    private updateFontSizeSelectionHighlight(): void {
        let _loc2_: number = 0;
        let _loc1_: IWindowContainer = null;
        _loc2_ = 0;
        while (_loc2_ < this._gridView.fontSizeList.numListItems) {
            _loc1_ = castGuarded(this._gridView.fontSizeList.getListItemAt(_loc2_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc1_.findChildByName("background_color").visible = _loc1_.id == ChatStyleSelector._SafeStr_14742;
            (asGuarded(_loc1_.findChildByName("label"), isITextWindow)).textColor = (_loc1_.id == ChatStyleSelector._SafeStr_14742 ? 3355443 : 10066329) >>> 0;
            _loc2_++;
        }
    }

    private resolveFontSizeItem(param1: IWindow): IWindowContainer {
        let _loc2_: IWindow = param1;
        while (_loc2_ != null && _loc2_.parent != null && _loc2_.parent.parent != this._gridView.fontSizeList) {
            _loc2_ = _loc2_.parent;
        }
        return isIWindowContainer(_loc2_) ? _loc2_ : null;
    }

    private clampFontSize(param1: number): number {
        if (param1 < 0) {
            return 0;
        }
        if (param1 > 4) {
            return 4;
        }
        return param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
