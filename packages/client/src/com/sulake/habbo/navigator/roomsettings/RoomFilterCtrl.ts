import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetCustomRoomFilterMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/GetCustomRoomFilterMessageComposer';
import { UpdateRoomFilterMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/UpdateRoomFilterMessageComposer';

export class RoomFilterCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::RoomFilterCtrl'); }

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
        this._badWords = [];
    }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _navigator: IHabboTransitionalNavigator;

    private _selectedRow: number = -1;

    declare private _window: IWindowContainer;

    declare private _badWords: any[];

    declare private _SafeStr_2609: IItemListWindow;

    declare private _SafeStr_3203: ITextFieldWindow;

    public get disposed(): boolean {
        return this._navigator == null;
    }

    public startRoomFilterEdit(param1: number): void {
        this._flatId = param1;
        this._navigator.send(new GetCustomRoomFilterMessageComposer(this._flatId));
        this.refreshWindow();
    }

    public onRoomFilterSettings(param1: any[]): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            if (this._badWords.indexOf(param1[_loc2_]) == -1) {
                this._badWords.push(param1[_loc2_]);
            }
            _loc2_++;
        }
        if (this._SafeStr_2609) {
            this._SafeStr_2609.removeListItems();
            this.refreshBadWords();
        }
    }

    public close(): void {
        this._flatId = 0;
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    public disposeWindow(): void {
        if (this._window) {
            this._window.visible = false;
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2609) {
            this._SafeStr_2609.removeListItems();
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
        this._navigator = null;
    }

    protected getBgColor(param1: number, param2: boolean): number {
        if (param1 == this._selectedRow) {
            return 4288329945;
        }
        return param2 ? 4290173439 : (param1 % 2 != 0 ? 4294967295 : 4293519841);
    }

    private refreshWindow(): void {
        if (this._navigator.data.enteredGuestRoom == null) {
            return;
        }
        this.prepareWindow();
        this._window.visible = true;
        this._window.invalidate();
        this._window.activate();
        this._navigator.tracking.trackEventLogOncePerSession("InterfaceExplorer", "open", "room.filter.seen");
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._navigator.getXmlWindow("iro_room_filter_framed"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByName("badword_remove_btn").addEventListener("WME_CLICK", this.onRemoveWordClick);
        this._window.findChildByName("badword_add_btn").addEventListener("WME_CLICK", this.onAddWordClick);
        this._window.findChildByTag("close").addEventListener("WME_CLICK", this.onCloseButtonClick);
        this._SafeStr_3203 = asGuarded(this._window.findChildByName("roomfilter_addword_txt"), isITextFieldWindow);
        this._SafeStr_2609 = castGuarded(this._window.findChildByName("badwords_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this.refreshBadWords();
        this._window.center();
    }

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
        param1.findChildByName("badword_txt").caption = param2;
    }

    private onCloseButtonClick = (param1: WindowEvent): void => {
        this.disposeWindow();
    };

    private onAddWordClick = (param1: WindowMouseEvent): void => {
        this.addBadWord(this._SafeStr_3203.text);
    };

    private addBadWord(param1: string): void {
        if (this._SafeStr_3203 != null && this._SafeStr_3203.text.length > 0) {
            this._navigator.send(new UpdateRoomFilterMessageComposer(this._flatId, UpdateRoomFilterMessageComposer._SafeStr_7444, param1));
            this._navigator.send(new GetCustomRoomFilterMessageComposer(this._flatId));
            this._SafeStr_3203.text = "bobba";
        }
    }

    private onRemoveWordClick = (param1: WindowMouseEvent): void => {
        if (this._selectedRow < 0) {
            return;
        }
        let _loc2_: IWindowContainer = castGuarded(this._SafeStr_2609.getListItemAt(this._selectedRow >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (!_loc2_) {
            return;
        }
        let _loc3_: string = _loc2_.findChildByName("badword_txt").caption;
        _loc2_.height = 0;
        _loc2_.visible = false;
        _loc2_ = null;
        if (this._badWords.indexOf(_loc3_) >= 0) {
            this._badWords.splice(this._badWords.indexOf(_loc3_), 1);
        }
        this._navigator.send(new UpdateRoomFilterMessageComposer(this._flatId, UpdateRoomFilterMessageComposer._SafeStr_7476, _loc3_));
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
        if (!this._navigator) {
            return null;
        }
        let _loc2_: IWindowContainer = castGuarded(this._navigator.getXmlWindow("ros_badword"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (!_loc2_) {
            return null;
        }
        let _loc3_: IRegionWindow = castGuarded(_loc2_.findChildByName("bg_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc3_.addEventListener("WME_CLICK", this.onBgMouseClick);
        _loc3_.addEventListener("WME_OVER", this.onBgMouseOver);
        _loc3_.addEventListener("WME_OUT", this.onBgMouseOut);
        _loc2_.id = param1;
        return _loc2_;
    }

    private onBgMouseClick = (param1: WindowEvent): void => {
        this._selectedRow = param1.target.parent.id;
        this.refreshColorsAfterClick(asGuarded(param1.target.findParentByName("badwords_itemlist"), isIItemListWindow));
    };

    private onBgMouseOver = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = castGuarded(param1.target.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.color = this.getBgColor(-1, true);
    };

    private onBgMouseOut = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = castGuarded(param1.target.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.color = this.getBgColor(_loc2_.id, false);
    };

    get [IDisposable](): true {
        return true;
    }
}
