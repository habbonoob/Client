import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GetCustomFilterResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/customfilter/GetCustomFilterResultMessageEventParser';
import type { ModifyCustomFilterResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/customfilter/ModifyCustomFilterResultMessageEventParser';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetCustomFilterResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/customfilter/GetCustomFilterResultMessageEvent';
import { ModifyCustomFilterResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/customfilter/ModifyCustomFilterResultMessageEvent';
import { AddToCustomFilterMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/customfilter/AddToCustomFilterMessageComposer';
import { GetCustomFilterMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/customfilter/GetCustomFilterMessageComposer';
import { RemoveFromCustomFilterMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/customfilter/RemoveFromCustomFilterMessageComposer';

export class WordFilterSettingsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.settings::WordFilterSettingsView'); }

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this._badWords = [];
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new ModifyCustomFilterResultMessageEvent(this.onModifyCustomFilter));
        this.addMessageEvent(new GetCustomFilterResultMessageEvent(this.onCustomWords));
        this.prepareWindow();
    }

    declare private _toolbar: HabboToolbar;

    private _selectedRow: number = -1;

    declare private _badWords: any[];

    declare private _SafeStr_2609: IItemListWindow;

    declare private _SafeStr_3203: ITextFieldWindow;

    declare private _messageEvents: IMessageEvent[];

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public get disposed(): boolean {
        return this._toolbar == null;
    }

    public disposeWindow(): void {
        this.removeMessageEvents();
        if (this._window) {
            this._window.findChildByName("remove_btn").removeEventListener("WME_CLICK", this.onRemoveWordClick);
            this._window.findChildByName("add_btn").removeEventListener("WME_CLICK", this.onAddWordClick);
            this._window.findChildByName("back_btn").removeEventListener("WME_CLICK", this.onCloseButtonClick);
            this._window.visible = false;
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2609) {
            this._SafeStr_2609.dispose();
            this._SafeStr_2609 = null;
        }
        if (this._SafeStr_3203) {
            this._SafeStr_3203.dispose();
            this._SafeStr_3203 = null;
        }
        if (this._badWords) {
            this._badWords.length = 0;
        }
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this.disposeWindow();
        this._toolbar = null;
    }

    protected getBgColor(param1: number, param2: boolean): number {
        if (param1 == this._selectedRow) {
            return 4288329945;
        }
        return param2 ? 4290173439 : (param1 % 2 != 0 ? 4294967295 : 4293519841);
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        let _loc1_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("custom_word_filter_settings_xml"), XmlAsset);
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
        this._window.findChildByName("remove_btn").addEventListener("WME_CLICK", this.onRemoveWordClick);
        this._window.findChildByName("add_btn").addEventListener("WME_CLICK", this.onAddWordClick);
        this._window.findChildByName("back_btn").addEventListener("WME_CLICK", this.onCloseButtonClick);
        this._SafeStr_3203 = asGuarded(this._window.findChildByName("add_word_input"), isITextFieldWindow);
        this._SafeStr_2609 = castGuarded(this._window.findChildByName("wordlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._toolbar.connection.send(new GetCustomFilterMessageComposer());
    }

    private onModifyCustomFilter = (param1: ModifyCustomFilterResultMessageEvent): void => {
        let _loc3_: number = 0;
        let _loc2_: ModifyCustomFilterResultMessageEventParser = param1.getParser();
        if (_loc2_.result == 1) {
            if (this._badWords.indexOf(_loc2_.word) == -1) {
                this._badWords.push(_loc2_.word);
            }
        } else if (_loc2_.result == 3) {
            _loc3_ = this._badWords.indexOf(_loc2_.word);
            if (_loc3_ != -1) {
                this._badWords.splice(_loc3_, 1);
            }
        }
        this.refreshBadWords();
    };

    private onCustomWords = (param1: GetCustomFilterResultMessageEvent): void => {
        let _loc3_: number = 0;
        let _loc2_: GetCustomFilterResultMessageEventParser = param1.getParser();
        _loc3_ = 0;
        while (_loc3_ < _loc2_.words.length) {
            if (this._badWords.indexOf(_loc2_.words[_loc3_]) == -1) {
                this._badWords.push(_loc2_.words[_loc3_]);
            }
            _loc3_++;
        }
        if (this._SafeStr_2609) {
            this._SafeStr_2609.removeListItems();
            this.refreshBadWords();
        }
    };

    private refreshBadWords(): void {
        let _loc2_: number = 0;
        let _loc1_: IWindowContainer = null;
        this._SafeStr_2609.autoArrangeItems = false;
        _loc2_ = 0;
        while (true) {
            _loc1_ = castGuarded(this._SafeStr_2609.getListItemAt(_loc2_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            if (_loc1_ == null) {
                if (this._badWords[_loc2_] == null) {
                    break;
                }
                _loc1_ = this.getListEntry(_loc2_);
                this._SafeStr_2609.addListItem(_loc1_);
            }
            if (this._badWords[_loc2_] != null) {
                _loc1_.color = this.getBgColor(_loc2_, false);
                this.refreshEntryDetails(_loc1_, stringOrNull(this._badWords[_loc2_]));
                _loc1_.visible = true;
                _loc1_.height = 20;
            } else {
                _loc1_.height = 0;
                _loc1_.visible = false;
            }
            _loc2_++;
        }
        this._SafeStr_2609.autoArrangeItems = true;
        this._SafeStr_2609.invalidate();
    }

    private refreshEntryDetails(param1: IWindowContainer, param2: string): void {
        param1.findChildByName("text").caption = param2;
    }

    private onCloseButtonClick = (param1: WindowEvent): void => {
        this.disposeWindow();
    };

    private onAddWordClick = (param1: WindowMouseEvent): void => {
        if (!this._SafeStr_3203) {
            return;
        }
        let _loc2_: string = this._SafeStr_3203.text;
        if (_loc2_ && _loc2_.length > 0 && this._badWords.indexOf(_loc2_) == -1) {
            this._toolbar.connection.send(new AddToCustomFilterMessageComposer(_loc2_));
            this._SafeStr_3203.text = "";
            this._selectedRow = -1;
        }
    };

    private onRemoveWordClick = (param1: WindowMouseEvent): void => {
        if (this._selectedRow < 0) {
            return;
        }
        let _loc2_: IWindowContainer = castGuarded(this._SafeStr_2609.getListItemAt(this._selectedRow >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (!_loc2_) {
            return;
        }
        let _loc3_: string = _loc2_.findChildByName("text").caption;
        this._selectedRow = -1;
        this._toolbar.connection.send(new RemoveFromCustomFilterMessageComposer(_loc3_));
    };

    private refreshColorsAfterClick(param1: IItemListWindow): void {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = null;
        _loc3_ = 0;
        while (_loc3_ < this._badWords.length) {
            _loc2_ = castGuarded(param1.getListItemAt(_loc3_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc2_.color = this.getBgColor(_loc3_, false);
            _loc3_++;
        }
    }

    private getListEntry(param1: number): IWindowContainer {
        let _loc3_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("custom_word_filter_item_xml"), XmlAsset);
        let _loc2_: IWindowContainer = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIWindowContainer);
        if (!_loc2_) {
            return null;
        }
        let _loc4_: IRegionWindow = castGuarded(_loc2_.findChildByName("bg_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc4_.addEventListener("WME_CLICK", this.onBgMouseClick);
        _loc4_.addEventListener("WME_OVER", this.onBgMouseOver);
        _loc4_.addEventListener("WME_OUT", this.onBgMouseOut);
        _loc2_.id = param1;
        return _loc2_;
    }

    private onBgMouseClick = (param1: WindowEvent): void => {
        this._selectedRow = param1.target.parent.id;
        this.refreshColorsAfterClick(asGuarded(param1.target.findParentByName("wordlist"), isIItemListWindow));
    };

    private onBgMouseOver = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = castGuarded(param1.target.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.color = this.getBgColor(-1, true);
    };

    private onBgMouseOut = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = castGuarded(param1.target.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.color = this.getBgColor(_loc2_.id, false);
    };

    private addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(this._toolbar.communicationManager.addHabboConnectionMessageEvent(param1));
    }

    private removeMessageEvents(): void {
        if (!this._toolbar.communicationManager || !this._messageEvents) {
            return;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this._toolbar.communicationManager.removeHabboConnectionMessageEvent(_loc1_);
            _loc1_.dispose();
        }
        this._messageEvents = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
