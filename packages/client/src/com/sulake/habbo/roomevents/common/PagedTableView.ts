import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { LoadingIcon } from '@/com/sulake/habbo/utils/LoadingIcon';

export class PagedTableView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.common::PagedTableView'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    public static readonly REQUEST_SAME_PAGE_TIMEOUT: number = 2000;

    constructor(param1: IAsset, param2: IHabboWindowManager, param3: IHabboLocalizationManager, param4: boolean = true) {
        this.initInstanceFields();
        this._samePageTimeout = param4;
        this._windowManager = param2;
        this._SafeStr_2259 = param3;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(param1.content), 1), isIFrameWindow);
        this._loadingIcon = new LoadingIcon();
        this.pageNumberInput.restrict = "0-9";
        this.createTable();
        this.firstPageButton.addEventListener("WME_CLICK", this.onFirstPageClick);
        this.previousPageButton.addEventListener("WME_CLICK", this.onPreviousPageClick);
        this.nextPageButton.addEventListener("WME_CLICK", this.onNextPageClick);
        this.lastPageButton.addEventListener("WME_CLICK", this.onLastPageClick);
        if (this.refreshButton != null) {
            this.refreshButton.addEventListener("WME_CLICK", this.onRefreshClick);
        }
        this.pageNumberInput.addEventListener("WKE_KEY_DOWN", this.onPageInputDown);
        this.pageNumberInput.addEventListener("WME_CLICK_AWAY", this.onPageInputClickAway);
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
        this.hide();
    }

    declare protected _windowManager: IHabboWindowManager;

    declare protected _SafeStr_2259: IHabboLocalizationManager;

    declare protected _window: IFrameWindow;

    declare protected _SafeStr_2737: TableView;

    private _SafeStr_4616: number = -1;
    private _SafeStr_5638: number = 0;

    declare private _loadingIcon: LoadingIcon;

    private _samePageTimeout: boolean = false;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    protected get tableViewContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("table_view"), isIWindowContainer);
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get loadingIconWindow(): IIconWindow {
        return asGuarded(this._window.findChildByName("searching_icon"), isIIconWindow);
    }

    private get refreshButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("refresh_btn"), isIButtonWindow);
    }

    private get firstPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("first_page_btn"), isIContainerButtonWindow);
    }

    private get previousPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("prev_page_btn"), isIContainerButtonWindow);
    }

    private get nextPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("next_page_btn"), isIContainerButtonWindow);
    }

    private get lastPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("last_page_btn"), isIContainerButtonWindow);
    }

    private get pageTextStart(): ITextWindow {
        return asGuarded(this._window.findChildByName("pagina_text_start"), isITextWindow);
    }

    private get pageNumberInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("pagina_number_input"), isITextFieldWindow);
    }

    private get pageTextEnd(): ITextWindow {
        return asGuarded(this._window.findChildByName("pagina_text_end"), isITextWindow);
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (!this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
                this._window.center();
            }
        }
    }

    public isShowing(): boolean {
        return this._window.parent != null;
    }

    public loc(param1: string): string {
        return this._SafeStr_2259.getLocalization(param1, param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._loadingIcon.dispose();
        this._loadingIcon = null;
        this._SafeStr_2737.dispose();
        this._SafeStr_2737 = null;
        this._window.dispose();
        this._window = null;
        this._windowManager = null;
        this._SafeStr_2259 = null;
        this._disposed = true;
    }

    protected canRequestNewPage(param1: boolean): boolean {
        let _loc2_: number = getTimer();
        if (this._SafeStr_5638 > _loc2_ - this.requestPageRatelimit()) {
            return false;
        }
        if (this._samePageTimeout && param1 && this._SafeStr_5638 > _loc2_ - 2000) {
            return false;
        }
        return true;
    }

    protected onPageRequested(): void {
        this._loadingIcon.setVisible(this.loadingIconWindow, true);
    }

    protected onPageLoaded(): void {
        let _loc4_: string = null;
        let _loc6_: string = null;
        this._loadingIcon.setVisible(this.loadingIconWindow, false);
        let _loc5_: number = this.currentPage();
        if (_loc5_ == this._SafeStr_4616) {
            this._SafeStr_4616 = -1;
        }
        let _loc2_: number = this.calculateLastPage();
        Util.disableSection(this.firstPageButton, _loc5_ <= 1);
        Util.disableSection(this.previousPageButton, _loc5_ <= 1);
        Util.disableSection(this.nextPageButton, _loc5_ >= _loc2_);
        Util.disableSection(this.lastPageButton, _loc5_ >= _loc2_);
        let _loc3_: string = this.loc(this.pagingTextKey());
        let _loc1_: any[] = _loc3_.split("%page%");
        if (_loc1_.length == 2) {
            _loc4_ = stringOrNull(_loc1_[0]);
            _loc6_ = stringOrNull(_loc1_[1]);
            this.pageTextStart.text = _loc4_.replace("%entries_count%", String(this.totalEntries()));
            this.pageTextEnd.text = _loc6_.replace("%page_count%", String(_loc2_));
            this.pageNumberInput.text = _loc5_ + "";
        }
    }

    protected createTable(): void {
    }

    protected calculateLastPage(): number {
        return 0;
    }

    protected currentPage(): number {
        return 0;
    }

    protected requestPageRatelimit(): number {
        return 200;
    }

    protected pagingTextKey(): string {
        return "";
    }

    protected totalEntries(): number {
        return 0;
    }

    protected requestPage(param1: number): boolean {
        let _loc2_: number = getTimer();
        if (!this.canRequestNewPage(param1 == this._SafeStr_4616)) {
            return false;
        }
        this._SafeStr_4616 = param1;
        this._SafeStr_5638 = _loc2_;
        return true;
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    private onLastPageClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = this.calculateLastPage();
        if (_loc2_ == -1) {
            return;
        }
        this.requestPage(_loc2_);
    };

    private onNextPageClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = this.currentPage();
        if (_loc2_ == -1) {
            return;
        }
        this.requestPage(_loc2_ + 1);
    };

    private onPreviousPageClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = this.currentPage();
        if (_loc2_ == -1) {
            return;
        }
        this.requestPage(_loc2_ - 1);
    };

    private onFirstPageClick = (param1: WindowMouseEvent): void => {
        this.requestPage(1);
    };

    private onRefreshClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = this.currentPage();
        if (_loc2_ == -1) {
            return;
        }
        this.requestPage(_loc2_);
    };

    private onPageInputClickAway = (param1: WindowMouseEvent): void => {
        this.navigateToInputPage();
    };

    private onPageInputDown = (param1: WindowKeyboardEvent): void => {
        let _loc2_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.keyCode == 13) {
            this.navigateToInputPage();
        }
    };

    private navigateToInputPage(): void {
        let _loc3_: any = Number(this.pageNumberInput.text) | 0;
        let _loc2_: number = this.calculateLastPage();
        if (_loc3_ < 1) {
            _loc3_ = 1;
            this.pageNumberInput.text = String(_loc3_);
        } else if (_loc3_ > _loc2_) {
            _loc3_ = _loc2_;
            this.pageNumberInput.text = String(_loc3_);
        }
        let _loc1_: number = this.currentPage();
        if (_loc1_ == -1) {
            return;
        }
        if (_loc3_ != _loc1_) {
            this.requestPage(_loc3_ | 0);
        }
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }
}
