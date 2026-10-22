import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
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
import type { FurniChooserWidget } from '@/com/sulake/habbo/ui/widget/chooser/furni/FurniChooserWidget';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurniChooserTableObject } from '@/com/sulake/habbo/ui/widget/chooser/furni/FurniChooserTableObject.group';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class FurniView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser.furni::FurniView'); }

    public static COLUMN_FURNI_NAME: string = "name";
    public static COLUMN_FURNI_OWNER: string = "owner";
    public static COLUMN_ID: string = "id";

    constructor(param1: FurniChooserWidget, param2: string) {
        this._widget = param1;
        this._title = param2;
    }

    declare private _widget: FurniChooserWidget;

    declare private _title: string;

    declare private _SafeStr_2737: TableView;

    declare private _window: IFrameWindow;

    declare private _ignoreListeners: boolean;
    static { (this.prototype as any)._ignoreListeners = false; }

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

    private get usernameDropDown(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("username_dropdown"), isIDropMenuWindow);
    }

    private get clearButton(): IWindowContainer {
        return asGuarded(this._window.findChildByName("clear_button"), isIWindowContainer);
    }

    private get amountIndicator(): ITextWindow {
        return asGuarded(this._window.findChildByName("amount_indicator"), isITextWindow);
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

    public onItemsChanged(): void {
        if (this._widget == null) {
            return;
        }
        if (this._window == null) {
            this.createWindow();
        }
        this.constructOwners();
        this.populateWithFilters();
    }

    public constructOwners(): void {
        this._ignoreListeners = true;
        let _loc1_: Map<any, any> = new Dictionary();
        let _loc2_: any[] = [];
        _loc2_.push(this.localize("new_furni_chooser.owner_selector.default"));
        for (const _loc3_ of this._widget.items ?? []) {
            if (!(_loc1_.has(_loc3_.owner))) {
                _loc2_.push(_loc3_.owner);
                _loc1_.set(_loc3_.owner, true);
            }
        }
        if (this.usernameDropDown.numMenuItems != _loc2_.length || this.usernameDropDown.numMenuItems == 1 && this.usernameDropDown.enumerateSelection()[0] == "") {
            this.usernameDropDown.populate(_loc2_);
            this.usernameDropDown.selection = 0;
            if (_loc2_.length <= 2) {
                this.usernameDropDown.disable();
                this.usernameDropDown.blend = 0.5;
            } else {
                this.usernameDropDown.enable();
                this.usernameDropDown.blend = 1;
            }
        }
        this._ignoreListeners = false;
    }

    public localize(param1: string): string {
        return this._widget.localizations.getLocalization(param1, param1);
    }

    private createWindow(): void {
        let _loc1_: XmlAsset = castTo(this._widget.assets.getAssetByName("new_furni_chooser_view"), XmlAsset);
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
        this.usernameDropDown.addEventListener("WE_SELECTED", this.onUsernameChanged);
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

    private onUsernameChanged = (param1: WindowEvent): void => {
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

    private populateWithFilters(): void {
        let _loc5_: any;
        let _loc1_: any[] = this.searchTextInput.text.toLowerCase().split(" ");
        let _loc6_: number = this.usernameDropDown.selection;
        let _loc2_: string = stringOrNull(_loc6_ > 0 ? this.usernameDropDown.enumerateSelection()[_loc6_] : null);
        let _loc3_: any[] = [];
        for (const _loc4_ of this._widget.items ?? []) {
            let _loc7_: boolean = true;
            for (_loc5_ of _loc1_ ?? []) {
                if (_loc4_.lowerCaseName.indexOf(_loc5_) == -1) {
                    _loc7_ = false;
                    break;
                }
            }
            if (_loc7_ && !(_loc2_ != null && _loc4_.owner != _loc2_)) {
                _loc3_.push(_loc4_);
            }
        }
        this.populate(_loc3_);
        this.amountIndicator.text = this._widget.localizations.getLocalizationWithParams("new_furni_chooser.amount_indicator", "", "amount", _loc3_.length);
    }

    private populate(param1: any[]): void {
        let _loc2_: ITableObject[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_.push(new FurniChooserTableObject(_loc3_));
        }
        this._SafeStr_2737.setObjects(_loc2_);
    }

    private createTable(): void {
        this._SafeStr_2737 = new TableView(this._widget.windowManager, this.tableViewContainer, true);
        let _loc1_: any[] = [new TableColumn(FurniView.COLUMN_FURNI_NAME, this.localize("new_furni_chooser.col.name"), 0.5, "left"), new TableColumn(FurniView.COLUMN_FURNI_OWNER, this.localize("new_furni_chooser.col.owner"), 0.25, "left"), new TableColumn(FurniView.COLUMN_ID, this.localize("new_furni_chooser.col.id"), 0.25, "left")];
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

    private onListItemClicked = (param1: FurniChooserTableObject): void => {
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
}
