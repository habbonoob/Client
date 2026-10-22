import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BadgeLeaderboardController } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BadgeLeaderboardEntryView } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardEntryView';

export class BadgeLeaderboardView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard::BadgeLeaderboardView'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _controller: BadgeLeaderboardController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_14255: BadgeLeaderboardEntryView;

    declare private _SafeStr_14256: IWindowContainer;

    declare private _SafeStr_14257: BadgeLeaderboardEntryView[];

    declare private _SafeStr_14258: number;
    static { (this.prototype as any)._SafeStr_14258 = 0; }

    constructor(param1: BadgeLeaderboardController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this.createWindow();
        this.hide();
    }

    private createWindow(): void {
        let _loc4_: IAsset = null;
        let _loc1_: XmlAsset = null;
        let _loc2_: number = 0;
        let _loc3_: BadgeLeaderboardEntryView = null;
        if (this._window != null) {
            return;
        }
        _loc4_ = this._controller.assets.getAssetByName("badge_leaderboard_view");
        _loc1_ = castTo(_loc4_, XmlAsset);
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(_loc1_.content), 1), isIFrameWindow);
        this._SafeStr_14258 = this.rankTypeExtendedImage.y;
        this.closeButton.procedure = this.onClose;
        this.dropdownRegion.procedure = this.onDropdownOpen;
        this.dropdownOpener.procedure = this.onDropdownOpen;
        this.hiddenDropdown.procedure = this.onDropdownSelection;
        this.previousButton.procedure = this.onPreviousPage;
        this.nextButton.procedure = this.onNextPage;
        this._SafeStr_14256 = asGuarded(this.rankingList.getListItemByName("entry_template"), isIWindowContainer);
        this.rankingList.removeListItem(this._SafeStr_14256);
        this._SafeStr_14257 = [];
        _loc2_ = 0;
        while (_loc2_ < 10) {
            _loc3_ = new BadgeLeaderboardEntryView(asGuarded(this._SafeStr_14256.clone(), isIWindowContainer));
            _loc3_.profileRegion.id = _loc2_;
            _loc3_.profileRegion.procedure = this.onProfileClicked;
            _loc3_.window.visible = false;
            this.rankingList.addListItem(_loc3_.window);
            this._SafeStr_14257.push(_loc3_);
            _loc2_++;
        }
        this._SafeStr_14255 = new BadgeLeaderboardEntryView(this.ownContainer, false, "rank_own");
        this._SafeStr_14255.profileRegion.id = -1;
        this._SafeStr_14255.profileRegion.procedure = this.onProfileClicked;
        this.ownContainer.visible = false;
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.hide();
        }
    };

    private onDropdownOpen = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._controller.onDropdownOpenClicked();
        }
    };

    private onDropdownSelection = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_SELECTED") {
            this._controller.onDropdownSelectionChanged(this.hiddenDropdown.selection);
        }
    };

    private onPreviousPage = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._controller.onPreviousPageClicked();
        }
    };

    private onNextPage = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._controller.onNextPageClicked();
        }
    };

    private onProfileClicked = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._controller.onProfileRegionClicked(param2.id);
        }
    };

    public setDropdownOptions(param1: any[], param2: number): void {
        this.hiddenDropdown.procedure = null;
        this.hiddenDropdown.populate(param1);
        this.hiddenDropdown.selection = param2;
        this.hiddenDropdown.procedure = this.onDropdownSelection;
    }

    public setFrameStyle(param1: number): void {
        if (this._window != null && this._window.style != param1) {
            this._window.style = param1;
        }
    }

    public openDropdownMenu(): void {
        this.hiddenDropdown.openMenu();
        this.hiddenDropdown.activate();
    }

    public setTitle(param1: string): void {
        let _loc2_: any = null;
        for (_loc2_ of this.titleTexts ?? []) {
            _loc2_.text = param1;
        }
    }

    public setInfo(param1: string, param2: string): void {
        this.rankTypeExtendedImage.assetUri = param1;
        this.rankTypeInfoText.text = param2;
    }

    public setRankTypeExtendedImageYOffset(param1: number): void {
        this.rankTypeExtendedImage.y = this._SafeStr_14258 + param1;
    }

    public setPagerEnabled(param1: boolean, param2: boolean): void {
        if (param1) {
            this.previousButton.enable();
        } else {
            this.previousButton.disable();
        }
        if (param2) {
            this.nextButton.enable();
        } else {
            this.nextButton.disable();
        }
    }

    public setEntryVisible(param1: number, param2: boolean): void {
        if (param1 >= 0 && param1 < this._SafeStr_14257.length) {
            this._SafeStr_14257[param1].window.visible = param2;
        }
    }

    public setOwnEntryVisible(param1: boolean): void {
        this.ownContainer.visible = param1;
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (!this.isShowing()) {
            return;
        }
        _loc1_ = this._windowManager.getDesktop(1);
        if (_loc1_ != null) {
            _loc1_.removeChild(this._window);
        }
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._window == null) {
            return;
        }
        if (this.isShowing()) {
            this._window.activate();
            return;
        }
        _loc1_ = this._windowManager.getDesktop(1);
        if (_loc1_ != null) {
            _loc1_.addChild(this._window);
            if (this._window.parent == _loc1_) {
                this._window.center();
            }
            this._window.activate();
        }
    }

    public isShowing(): boolean {
        return this._window != null && this._window.parent != null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (this._disposed) {
            return;
        }
        this.hide();
        if (this._SafeStr_14257 != null) {
            for (_loc1_ of this._SafeStr_14257 ?? []) {
                _loc1_.dispose();
            }
            this._SafeStr_14257 = null;
        }
        if (this._SafeStr_14256 != null) {
            this._SafeStr_14256.dispose();
            this._SafeStr_14256 = null;
        }
        if (this._SafeStr_14255 != null) {
            this._SafeStr_14255.dispose();
            this._SafeStr_14255 = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._controller = null;
        this._windowManager = null;
        this._disposed = true;
    }

    public get closeButton(): IWindow {
        return this._window.findChildByTag("close");
    }

    public get frameTitleContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("hacky_title"), isIWindowContainer);
    }

    public get titleShadow0Text(): ITextWindow {
        return asGuarded(this._window.findChildByName("title_txt_shadow_0"), isITextWindow);
    }

    public get titleShadow1Text(): ITextWindow {
        return asGuarded(this._window.findChildByName("title_txt_shadow_1"), isITextWindow);
    }

    public get titleShadow2Text(): ITextWindow {
        return asGuarded(this._window.findChildByName("title_txt_shadow_2"), isITextWindow);
    }

    public get titleShadow3Text(): ITextWindow {
        return asGuarded(this._window.findChildByName("title_txt_shadow_3"), isITextWindow);
    }

    public get titleText(): ITextWindow {
        return asGuarded(this._window.findChildByName("title_txt"), isITextWindow);
    }

    public get titleTexts(): ITextWindow[] {
        return [this.titleShadow0Text, this.titleShadow1Text, this.titleShadow2Text, this.titleShadow3Text, this.titleText];
    }

    public get dropdownRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("dropdown_region"), isIRegionWindow);
    }

    public get dropdownOpener(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("dropdown_opener"), isIStaticBitmapWrapperWindow);
    }

    public get hiddenDropdown(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("hidden_dropdown"), isIDropMenuWindow);
    }

    public get bodyContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("body"), isIWindowContainer);
    }

    public get infoContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("info_container"), isIWindowContainer);
    }

    public get rankTypeExtendedImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("rank_type_extended_img"), isIStaticBitmapWrapperWindow);
    }

    public get rankTypeInfoText(): ITextWindow {
        return asGuarded(this._window.findChildByName("rank_type_info"), isITextWindow);
    }

    public get rankingList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("ranking_list"), isIItemListWindow);
    }

    public get ownContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("own_container"), isIWindowContainer);
    }

    public get ownEntryView(): BadgeLeaderboardEntryView {
        return this._SafeStr_14255;
    }

    public get entryViews(): BadgeLeaderboardEntryView[] {
        return this._SafeStr_14257;
    }

    public get buttonsList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
    }

    public get previousButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("previous_btn"), isIButtonWindow);
    }

    public get nextButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("next_btn"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
