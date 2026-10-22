import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ChooserItem } from '@/com/sulake/habbo/ui/widget/chooser/ChooserItem';
import type { UsersChooserWidget } from '@/com/sulake/habbo/ui/widget/chooser/users/UsersChooserWidget';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UsersChooserTableObject } from '@/com/sulake/habbo/ui/widget/chooser/users/UsersChooserTableObject.group';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class UsersView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser.users::UsersView'); }

    public static COLUMN_USER_NAME: string = "name";
    public static COLUMN_TYPE: string = "type";

    declare private _widget: UsersChooserWidget;

    declare private _title: string;

    declare private _SafeStr_2737: TableView;

    declare private _window: IFrameWindow;

    declare private _ignoreListeners: boolean;
    static { (this.prototype as any)._ignoreListeners = false; }

    constructor(param1: UsersChooserWidget, param2: string) {
        this._widget = param1;
        this._title = param2;
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    public isOpen(): boolean {
        return this._window != null && Boolean(this._window.visible);
    }

    private createWindow(): void {
        let _loc1_: XmlAsset = castTo(this._widget.assets.getAssetByName("new_user_chooser_view"), XmlAsset);
        if (_loc1_ == null) {
            return;
        }
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIFrameWindow);
        if (this._window == null) {
            return;
        }
        this._window.caption = this._title;
        this.createTable();
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
        this.searchTextInput.addEventListener("WE_CHANGE", this.onSearchChanged);
        this.typeDropdown.addEventListener("WE_SELECTED", this.onTypeChanged);
        this.clearButton.addEventListener("WME_CLICK", this.onClearClicked);
        if (this._window.parent != null) {
            this._window.x = this._window.parent.width - this._window.width - 10;
            this._window.y = 10;
        }
    }

    private onClearClicked = (param1: WindowMouseEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.searchTextInput.text = "";
        this.onSearchChanged(null);
    };

    private onTypeChanged = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.populateWithFilters();
    };

    private onSearchChanged = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        let _loc2_: string = this.searchTextInput.text;
        this.clearButton.visible = _loc2_.length > 0;
        this.textPlaceholder.visible = _loc2_.length == 0;
        this.populateWithFilters();
    };

    public onItemsChanged(): void {
        if (this._widget == null) {
            return;
        }
        if (this._window == null) {
            this.createWindow();
        }
        this.populateWithFilters();
    }

    private populateWithFilters(): void {
        let _loc3_: string = this.searchTextInput.text.toLowerCase();
        let _loc2_: number = this.typeDropdown.selection;
        if (_loc2_ == 3) {
            _loc2_ = 4;
        }
        let _loc1_: any[] = [];
        for (const _loc4_ of this._widget.items ?? []) {
            if (!(_loc3_.length > 0 && _loc4_.lowerCaseName.indexOf(_loc3_) == -1)) {
                if (!(_loc2_ > 0 && _loc4_.type != _loc2_)) {
                    _loc1_.push(_loc4_);
                }
            }
        }
        this.populate(_loc1_);
        this.amountIndicator.text = this._widget.localizations.getLocalizationWithParams("new_user_chooser.amount_indicator", "", "amount", _loc1_.length);
    }

    private populate(param1: any[]): void {
        let _loc2_: ITableObject[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_.push(new UsersChooserTableObject(_loc3_));
        }
        this._SafeStr_2737.setObjects(_loc2_);
    }

    private createTable(): void {
        this._SafeStr_2737 = new TableView(this._widget.windowManager, this.tableViewContainer, true);
        let _loc1_: any[] = [new TableColumn(UsersView.COLUMN_USER_NAME, this.localize("new_user_chooser.col.name"), 0.65, "left"), new TableColumn(UsersView.COLUMN_TYPE, this.localize("new_user_chooser.col.type"), 0.35, "left")];
        this._SafeStr_2737.initialize(Array.from(_loc1_), true, true);
        this._SafeStr_2737.onRowClickedCallback = this.onListItemClicked;
    }

    private hideWindow(): void {
        if (this._window != null) {
            this._SafeStr_2737.dispose();
            this._SafeStr_2737 = null;
            this._window.dispose();
            this._window = null;
        }
    }

    private onListItemClicked = (param1: UsersChooserTableObject): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: ChooserItem = param1.chooserItem;
        if (_loc2_ == null) {
            return;
        }
        this._widget.choose(_loc2_.id, _loc2_.category);
    };

    private onClose = (param1: WindowMouseEvent): void => {
        this.hideWindow();
    };

    public localize(param1: string): string {
        return this._widget.localizations.getLocalization(param1, param1);
    }

    private get closeButton(): IWindow {
        return this._window.findChildByTag("close");
    }

    private get tableViewContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("table_container"), isIWindowContainer);
    }

    private get textPlaceholder(): ITextWindow {
        return asGuarded(this._window.findChildByName("search_placeholder"), isITextWindow);
    }

    private get searchTextInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("text_input"), isITextFieldWindow);
    }

    private get typeDropdown(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("type_dropdown"), isIDropMenuWindow);
    }

    private get clearButton(): IWindowContainer {
        return asGuarded(this._window.findChildByName("clear_button"), isIWindowContainer);
    }

    private get amountIndicator(): ITextWindow {
        return asGuarded(this._window.findChildByName("amount_indicator"), isITextWindow);
    }
}
