import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { _SafeCls_6080 } from '@/com/sulake/habbo/catalog/habbicons/_SafeCls_6080';
import type { _SafeCls_6019 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6019';
import type { _SafeCls_6022 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6022';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconControllerEvent } from '@/com/sulake/habbo/catalog/habbicons/HabbiconControllerEvent';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { MessengerHabbiconPickerEntry } from '@/com/sulake/habbo/messenger/habbicons/MessengerHabbiconPickerEntry';
import { MessengerHabbiconPickerSection } from '@/com/sulake/habbo/messenger/habbicons/MessengerHabbiconPickerSection';
import { MessengerHabbiconPickerSectionView } from '@/com/sulake/habbo/messenger/habbicons/MessengerHabbiconPickerSectionView';

export class MessengerHabbiconPicker implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.messenger.habbicons::MessengerHabbiconPicker'); }

    private static readonly SECTION_FAVORITES: string = "favorites";
    private static readonly _SafeStr_14199: string = "recent";
    private static readonly _SafeStr_14200: string = "collection";
    private static readonly SECTION_SEARCH: string = "search";
    private static readonly MENU_MIN_HEIGHT: number = 94;
    private static readonly MENU_MAX_HEIGHT: number = 304;
    private static readonly TOP_BAR_HEIGHT: number = 42;
    private static readonly BOTTOM_PADDING: number = 6;

    declare private _window: IWindowContainer;

    declare private _controller: _SafeCls_6080;

    declare private _localization: IHabboLocalizationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_14195: (...args: any[]) => any;

    declare private _SafeStr_14201: IWindowContainer;

    declare private _SafeStr_14202: MessengerHabbiconPickerSectionView[];

    declare private _childPresets: any[];

    declare private _ownedSearchEntries: any[];

    declare private _SafeStr_14203: Map<any, any>;

    private _SafeStr_14204: boolean = true;
    private _SafeStr_14205: boolean = true;

    declare private _SafeStr_14206: boolean;
    static { (this.prototype as any)._SafeStr_14206 = false; }

    declare private _SafeStr_14207: string;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: _SafeCls_6080, param3: IHabboLocalizationManager, param4: IHabboWindowManager, param5: (...args: any[]) => any) {
        this._window = param1;
        this._controller = param2;
        this._localization = param3;
        this._windowManager = param4;
        this._SafeStr_14195 = param5;
        this._SafeStr_14202 = new Array<MessengerHabbiconPickerSectionView>(0).fill(null);
        this._childPresets = [];
        this._ownedSearchEntries = [];
        this._SafeStr_14203 = new Dictionary();
        this._window.visible = false;
        this._SafeStr_14201 = asGuarded(this.sectionList.removeListItem(this.sectionList.getListItemByName("habbicon_section_template")), isIWindowContainer);
        this.searchInput.addEventListener("WE_CHANGE", this.onSearchChanged);
        this.searchInput.addEventListener("WKE_KEY_DOWN", this.onSearchKeyDown);
        this.searchPlaceholder.addEventListener("WME_DOWN", this.onSearchPlaceholderDown);
        this.searchClearButton.addEventListener("WME_CLICK", this.onSearchClearClicked);
        this.openHubButton.addEventListener("WME_CLICK", this.onOpenHubClicked);
        if (this._controller != null) {
            this._controller.addEventListener("hce_owned_habbicons_updated", this.onControllerDataUpdated);
            this._controller.addEventListener("hce_shop_data_updated", this.onControllerDataUpdated);
            this._controller.addEventListener("hce_recent_habbicons_updated", this.onRecentHabbiconsUpdated);
        }
        this.setSearchState(false);
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

    public show(): void {
        if (this._disposed) {
            return;
        }
        this.applyDeferredRecentSectionUpdate();
        this.renderIfDirty();
        this._window.visible = true;
        this._window.activate();
        this.focusSearch();
    }

    public hide(param1: boolean = true): void {
        if (!this._disposed) {
            this._window.visible = false;
            if (param1 && this._controller != null) {
                this._controller.resetUnseenHabbicons();
                this.invalidateLayout();
            }
        }
    }

    public toggle(): void {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    public get visible(): boolean {
        return !this._disposed && Boolean(this._window.visible);
    }

    public containsWindow(param1: IWindow): boolean {
        return !this._disposed && MessengerHabbiconPicker.isWindowInTree(param1, this._window);
    }

    public focusSearch(): void {
        if (!this._disposed) {
            this.searchInput.focus();
        }
    }

    public setPosition(param1: number, param2: number): void {
        if (!this._disposed) {
            this._window.x = param1;
            this._window.y = param2;
        }
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._controller != null) {
            this._controller.removeEventListener("hce_owned_habbicons_updated", this.onControllerDataUpdated);
            this._controller.removeEventListener("hce_shop_data_updated", this.onControllerDataUpdated);
            this._controller.removeEventListener("hce_recent_habbicons_updated", this.onRecentHabbiconsUpdated);
            this._controller = null;
        }
        this.searchInput.removeEventListener("WE_CHANGE", this.onSearchChanged);
        this.searchInput.removeEventListener("WKE_KEY_DOWN", this.onSearchKeyDown);
        this.searchPlaceholder.removeEventListener("WME_DOWN", this.onSearchPlaceholderDown);
        this.searchClearButton.removeEventListener("WME_CLICK", this.onSearchClearClicked);
        this.openHubButton.removeEventListener("WME_CLICK", this.onOpenHubClicked);
        this.clearSections();
        if (this._SafeStr_14201 != null) {
            this._SafeStr_14201.dispose();
            this._SafeStr_14201 = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._localization = null;
        this._windowManager = null;
        this._SafeStr_14195 = null;
        this._childPresets = null;
        this._ownedSearchEntries = null;
        this._SafeStr_14203 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private onControllerDataUpdated = (param1: Event): void => {
        let _loc2_: HabbiconControllerEvent = param1 instanceof HabbiconControllerEvent ? param1 : null;
        if (_loc2_ != null && _loc2_.habbiconId > 0 && !this._SafeStr_14204 && !this._SafeStr_14205) {
            if (this.visible) {
                this.refreshNarrowControllerUpdate();
            } else {
                this.invalidateSections();
            }
            return;
        }
        this.invalidateSections();
        if (this.visible) {
            this.renderIfDirty();
        }
    };

    private onRecentHabbiconsUpdated = (param1: HabbiconControllerEvent): void => {
        if (this.visible) {
            this._SafeStr_14206 = true;
            return;
        }
        if (this._SafeStr_14204) {
            return;
        }
        if (this.refreshRecentSectionState()) {
            this.invalidateLayout();
        }
    };

    private applyDeferredRecentSectionUpdate(): void {
        if (!this._SafeStr_14206) {
            return;
        }
        this._SafeStr_14206 = false;
        if (this._SafeStr_14204) {
            return;
        }
        if (this.refreshRecentSectionState()) {
            this._SafeStr_14205 = true;
        }
    }

    private invalidateSections(): void {
        this._SafeStr_14204 = true;
        this._SafeStr_14205 = true;
    }

    private invalidateLayout(): void {
        this._SafeStr_14205 = true;
    }

    private renderIfDirty(): void {
        let _loc1_: string = this.normalizedQuery();
        if (this._SafeStr_14207 != _loc1_) {
            this._SafeStr_14205 = true;
        }
        if (!this._SafeStr_14204 && !this._SafeStr_14205) {
            this.setSearchState(_loc1_.length > 0);
            return;
        }
        if (this._SafeStr_14204) {
            this.refreshSections();
            this._SafeStr_14204 = false;
        }
        this.refresh(_loc1_);
        this._SafeStr_14207 = _loc1_;
        this._SafeStr_14205 = false;
    }

    private refreshSections(): void {
        let _loc4_: any[] = null;
        let _loc3_: any = null;
        let _loc2_: MessengerHabbiconPickerEntry = null;
        let _loc1_: any[] = [];
        let _loc5_: any[] = [];
        this._childPresets = [];
        this._ownedSearchEntries = [];
        this._SafeStr_14203 = new Dictionary();
        if (this._controller == null) {
            return;
        }
        _loc4_ = this._controller.ownedHabbicons;
        for (_loc3_ of _loc4_ ?? []) {
            _loc2_ = this.createEntry(_loc3_);
            if (_loc2_ != null) {
                this._SafeStr_14203.set(_loc2_.habbiconId, _loc2_);
                this._ownedSearchEntries.push(_loc2_);
                if (_loc2_.favorite) {
                    _loc1_.push(_loc2_);
                }
            }
        }
        this.sortEntries(this._ownedSearchEntries);
        this.sortEntries(_loc1_);
        _loc5_ = this.buildRecentEntries();
        if (_loc1_.length > 0) {
            this._childPresets.push(new MessengerHabbiconPickerSection("favorites", "favorites", this.localize("habbicons.favourites.title", "Favorites"), _loc1_));
        }
        if (_loc5_.length > 0) {
            this._childPresets.push(new MessengerHabbiconPickerSection("recent", "recent", this.localize("habbicon.recently.used", "Recently used"), _loc5_));
        }
        this.addOwnedSetSections();
    }

    private addOwnedSetSections(): void {
        let _loc3_: any = undefined;
        let _loc5_: any = null;
        let _loc2_: any[] = null;
        let _loc4_: any = null;
        let _loc1_: MessengerHabbiconPickerEntry = null;
        if (this._controller == null || !this._controller.hasLoadedShopData) {
            return;
        }
        _loc3_ = this._controller.shopCollections;
        for (_loc5_ of valuesOf(_loc3_)) {
            if (_loc5_ != null) {
                _loc2_ = [];
                if (_loc5_.habbicons != null) {
                    for (_loc4_ of valuesOf(_loc5_.habbicons)) {
                        if (_loc4_ != null) {
                            _loc1_ = asInstanceOf(this._SafeStr_14203.get(_loc4_.habbiconId), MessengerHabbiconPickerEntry);
                            if (_loc1_ != null) {
                                _loc2_.push(_loc1_);
                            }
                        }
                    }
                }
                if (_loc5_._SafeStr_14069 > 0) {
                    _loc1_ = asInstanceOf(this._SafeStr_14203.get(_loc5_._SafeStr_14069), MessengerHabbiconPickerEntry);
                    if (_loc1_ != null) {
                        _loc2_.push(_loc1_);
                    }
                }
                if (_loc2_.length > 0) {
                    this._childPresets.push(new MessengerHabbiconPickerSection("collection", "collection:" + _loc5_.collectionId, this.resolveCollectionTitle(_loc5_), _loc2_));
                }
            }
        }
    }

    private refreshNarrowControllerUpdate(): void {
        let _loc1_: string = this.normalizedQuery();
        let _loc2_: any[] = this._childPresets.concat();
        this.refreshSections();
        this._SafeStr_14204 = false;
        this._SafeStr_14205 = false;
        this._SafeStr_14207 = _loc1_;
        if (_loc1_.length > 0) {
            this.refreshSearchResultsSection(_loc1_);
            return;
        }
        this.renderChangedSections(_loc2_);
    }

    private refreshSearchResultsSection(param1: string): void {
        let _loc2_: number = 0;
        let _loc3_: number = Number(this.sectionList.scrollV);
        this.clearSections();
        this.setSearchState(true);
        _loc2_ = this.addSearchResultsSection(param1);
        this.emptyView.visible = _loc2_ == 0;
        this.updateHeight();
        this.sectionList.scrollV = _loc3_;
    }

    private renderChangedSections(param1: any[]): void {
        let _loc3_: any = null;
        let _loc6_: number = 0;
        let _loc7_: MessengerHabbiconPickerSectionView = null;
        let _loc2_: number = 0;
        let _loc5_: MessengerHabbiconPickerSectionView[] = this._SafeStr_14202;
        let _loc4_: Map<any, any> = new Dictionary();
        let _loc8_: number = Number(this.sectionList.scrollV);
        if (this.sameSections(param1, this._childPresets)) {
            this.emptyView.visible = this._childPresets.length == 0;
            return;
        }
        this.sectionList.removeListItems();
        this._SafeStr_14202 = new Array<MessengerHabbiconPickerSectionView>(0).fill(null);
        for (_loc3_ of this._childPresets ?? []) {
            _loc6_ = this.findSectionIndexByKey(param1, stringOrNull(_loc3_.key));
            if (_loc6_ >= 0 && _loc6_ < _loc5_.length && this.sameSection(asInstanceOf(param1[_loc6_], MessengerHabbiconPickerSection), _loc3_)) {
                _loc7_ = _loc5_[_loc6_];
                _loc4_.set(_loc6_, true);
            } else {
                if (_loc6_ >= 0 && _loc6_ < _loc5_.length) {
                    _loc5_[_loc6_].dispose();
                    _loc4_.set(_loc6_, true);
                }
                _loc7_ = this.createSectionView(_loc3_);
            }
            this._SafeStr_14202.push(_loc7_);
            this.sectionList.addListItem(_loc7_.window);
        }
        _loc2_ = 0;
        while (_loc2_ < _loc5_.length) {
            if (_loc4_.get(_loc2_) != true) {
                _loc5_[_loc2_].dispose();
            }
            _loc2_++;
        }
        this.emptyView.visible = this._childPresets.length == 0;
        this.updateHeight();
        this.sectionList.scrollV = _loc8_;
    }

    private buildRecentEntries(): any[] {
        let _loc1_: number = 0;
        let _loc2_: MessengerHabbiconPickerEntry = null;
        let _loc3_: any[] = [];
        if (this._controller == null) {
            return _loc3_;
        }
        for (_loc1_ of this._controller.recentHabbiconIds ?? []) {
            _loc2_ = asInstanceOf(this._SafeStr_14203.get(_loc1_), MessengerHabbiconPickerEntry);
            if (_loc2_ != null) {
                _loc3_.push(_loc2_);
            }
        }
        return _loc3_;
    }

    private refreshRecentSectionState(): boolean {
        let _loc2_: MessengerHabbiconPickerSection = null;
        let _loc3_: any[] = this.buildRecentEntries();
        let _loc1_: number = this.recentSectionIndex();
        if (_loc1_ >= 0) {
            _loc2_ = asInstanceOf(this._childPresets[_loc1_], MessengerHabbiconPickerSection);
            if (this.sameEntries(_loc2_.entries, _loc3_)) {
                return false;
            }
        }
        if (_loc3_.length == 0) {
            if (_loc1_ >= 0) {
                this._childPresets.splice(_loc1_, 1);
                return true;
            }
            return false;
        }
        if (_loc1_ >= 0) {
            _loc2_.entries = _loc3_;
            return true;
        }
        this._childPresets.splice(this.recentInsertIndex(), 0, new MessengerHabbiconPickerSection("recent", "recent", this.localize("habbicon.recently.used", "Recently used"), _loc3_));
        return true;
    }

    private renderRecentSection(): void {
        let _loc3_: MessengerHabbiconPickerSection = null;
        let _loc2_: MessengerHabbiconPickerSectionView = null;
        let _loc1_: number = this.recentSectionIndex();
        let _loc4_: number = Number(this.sectionList.scrollV);
        if (_loc1_ < 0) {
            this.removeRecentSectionView(_loc4_);
            return;
        }
        if (_loc1_ < this._SafeStr_14202.length && this._SafeStr_14202[_loc1_].key == "recent") {
            this._SafeStr_14202[_loc1_].dispose();
            this._SafeStr_14202.splice(_loc1_, 1);
        }
        _loc3_ = asInstanceOf(this._childPresets[_loc1_], MessengerHabbiconPickerSection);
        _loc2_ = this.createSectionView(_loc3_);
        this._SafeStr_14202.splice(_loc1_, 0, _loc2_);
        this.sectionList.addListItemAt(_loc2_.window, _loc1_ >>> 0);
        this.updateHeight();
        this.sectionList.scrollV = _loc4_;
        this.emptyView.visible = this._childPresets.length == 0;
    }

    private removeRecentSectionView(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: MessengerHabbiconPickerSectionView = null;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14202.length) {
            _loc3_ = this._SafeStr_14202[_loc2_];
            if (_loc3_.key == "recent") {
                _loc3_.dispose();
                this._SafeStr_14202.splice(_loc2_, 1);
                this.updateHeight();
                this.sectionList.scrollV = param1;
                this.emptyView.visible = this._childPresets.length == 0;
                return;
            }
            _loc2_++;
        }
    }

    private recentSectionIndex(): number {
        let _loc1_: number = 0;
        let _loc2_: MessengerHabbiconPickerSection = null;
        _loc1_ = 0;
        while (_loc1_ < this._childPresets.length) {
            _loc2_ = asInstanceOf(this._childPresets[_loc1_], MessengerHabbiconPickerSection);
            if (_loc2_.type == "recent") {
                return _loc1_;
            }
            _loc1_++;
        }
        return -1;
    }

    private recentInsertIndex(): number {
        let _loc1_: MessengerHabbiconPickerSection = this._childPresets.length > 0 ? asInstanceOf(this._childPresets[0], MessengerHabbiconPickerSection) : null;
        return _loc1_ != null && _loc1_.type == "favorites" ? 1 : 0;
    }

    private sameEntries(param1: any[], param2: any[]): boolean {
        let _loc3_: number = 0;
        if (param1 == null || param2 == null || param1.length != param2.length) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (param1[_loc3_].habbiconId != param2[_loc3_].habbiconId) {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    private sameSection(param1: MessengerHabbiconPickerSection, param2: MessengerHabbiconPickerSection): boolean {
        return param1 != null && param2 != null && param1.type == param2.type && param1.key == param2.key && param1.title == param2.title && this.sameEntries(param1.entries, param2.entries);
    }

    private sameSections(param1: any[], param2: any[]): boolean {
        let _loc3_: number = 0;
        if (param1 == null || param2 == null || param1.length != param2.length) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (!this.sameSection(asInstanceOf(param1[_loc3_], MessengerHabbiconPickerSection), asInstanceOf(param2[_loc3_], MessengerHabbiconPickerSection))) {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    private findSectionIndexByKey(param1: any[], param2: string): number {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (castTo(param1[_loc3_], MessengerHabbiconPickerSection).key == param2) {
                return _loc3_;
            }
            _loc3_++;
        }
        return -1;
    }

    private createEntry(param1: _SafeCls_6019): MessengerHabbiconPickerEntry {
        let _loc2_: number = param1.habbiconState;
        if (_loc2_ != 2 && _loc2_ != 3) {
            return null;
        }
        return new MessengerHabbiconPickerEntry(param1.habbiconId, this.resolveEntryName(param1.habbiconId), _loc2_ == 3);
    }

    private resolveEntryName(param1: number): string {
        let _loc2_: string = HabbiconAssetManager.getHabbiconNameKey(param1);
        return _loc2_ != null && _loc2_.length > 0 ? this.localize("habbicon_" + _loc2_ + "_name", _loc2_) : "Habbicon";
    }

    private resolveCollectionTitle(param1: _SafeCls_6022): string {
        if (param1.name == null || param1.name.length == 0) {
            return "Habbicons";
        }
        return this.localize("habbicon_collection_" + param1.name + "_name", param1.name);
    }

    private refresh(param1: string): void {
        let _loc3_: any = null;
        let _loc2_: number = 0;
        this.clearSections();
        this.setSearchState(param1.length > 0);
        if (param1.length > 0) {
            _loc2_ = this.addSearchResultsSection(param1);
            this.emptyView.visible = _loc2_ == 0;
            this.updateHeight();
            return;
        }
        for (_loc3_ of this._childPresets ?? []) {
            this.addSection(stringOrNull(_loc3_.type), stringOrNull(_loc3_.key), stringOrNull(_loc3_.title), _loc3_.entries);
            _loc2_++;
        }
        this.emptyView.visible = _loc2_ == 0;
        this.updateHeight();
    }

    private addSearchResultsSection(param1: string): number {
        let _loc2_: any = null;
        let _loc3_: any[] = [];
        for (_loc2_ of this._ownedSearchEntries ?? []) {
            if (_loc2_.searchName.indexOf(param1) >= 0) {
                _loc3_.push(_loc2_);
            }
        }
        if (_loc3_.length == 0) {
            return 0;
        }
        this.addSection("search", "search", this.localize("habbicon.search.results", "Search results"), _loc3_);
        return 1;
    }

    private addSection(param1: string, param2: string, param3: string, param4: any[]): void {
        let _loc5_: MessengerHabbiconPickerSectionView = new MessengerHabbiconPickerSectionView(this._SafeStr_14201, param1, param2, param3, param4, this.onHabbiconSelected, this._windowManager, this.isUnseenHabbicon, this.onSelectorWheel);
        this._SafeStr_14202.push(_loc5_);
        this.sectionList.addListItem(_loc5_.window);
    }

    private createSectionView(param1: MessengerHabbiconPickerSection): MessengerHabbiconPickerSectionView {
        return new MessengerHabbiconPickerSectionView(this._SafeStr_14201, param1.type, param1.key, param1.title, param1.entries, this.onHabbiconSelected, this._windowManager, this.isUnseenHabbicon, this.onSelectorWheel);
    }

    private clearSections(): void {
        let _loc1_: any = null;
        for (_loc1_ of this._SafeStr_14202 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_14202.length = 0;
    }

    private onHabbiconSelected = (param1: number, param2: boolean): void => {
        if (this._controller != null) {
            this._controller.removeUnseenHabbicon(param1);
        }
        if (this._SafeStr_14195 != null) {
            this._SafeStr_14195(param1, param2);
        }
        if (!param2) {
            this.hide(false);
        } else {
            this.clearUnseenCounterForHabbicon(param1);
        }
    };

    private clearUnseenCounterForHabbicon(param1: number): void {
        let _loc2_: any = null;
        for (_loc2_ of this._SafeStr_14202 ?? []) {
            _loc2_.clearUnseenCounterForHabbicon(param1);
        }
    }

    private isUnseenHabbicon = (param1: number): boolean => {
        return this._controller != null && this._controller.isUnseenHabbicon(param1);
    };

    private updateHeight(): void {
        let _loc3_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        if (this._window == null || this.sectionList == null) {
            return;
        }
        _loc3_ = this.sectionList.scrollableRegion.height | 0;
        _loc1_ = Math.max(46, _loc3_ + 2) | 0;
        _loc2_ = 304 - 42 - 6;
        _loc1_ = Math.min(_loc1_, _loc2_) | 0;
        this.sectionList.height = _loc1_;
        this._window.height = Math.max(94, 42 + _loc1_ + 6) | 0;
        this._window.invalidate();
    }

    private normalizedQuery(): string {
        let _loc1_: string = this.searchInput.text;
        return _loc1_ != null ? _loc1_.toLowerCase() : "";
    }

    private onSearchChanged = (param1: WindowEvent): void => {
        this.invalidateLayout();
        this.renderIfDirty();
    };

    private onSearchKeyDown = (param1: WindowKeyboardEvent): void => {
        if (param1.keyCode == 27 && this.searchInput.text.length > 0) {
            this.clearSearch();
        }
    };

    private onSearchPlaceholderDown = (param1: WindowMouseEvent): void => {
        this.searchInput.focus();
    };

    private onSearchClearClicked = (param1: WindowMouseEvent): void => {
        this.clearSearch();
    };

    private onOpenHubClicked = (param1: WindowMouseEvent): void => {
        if (this._controller != null) {
            this._controller.openHabbiconHub();
        }
        this.hide(false);
    };

    private onSelectorWheel = (param1: WindowMouseEvent): void => {
        let _loc2_: number = NaN;
        if (this.sectionList == null) {
            return;
        }
        _loc2_ = Number(param1.type == "WME_WHEEL_HORIZONTAL" ? -param1.delta : param1.delta);
        if (this.sectionList.scrollWithWheel(_loc2_, param1.type == "WME_WHEEL_HORIZONTAL" || param1.shiftKey)) {
            param1.stopPropagation();
        }
    };

    private clearSearch(): void {
        this.searchInput.text = "";
        this.invalidateLayout();
        this.renderIfDirty();
    }

    private setSearchState(param1: boolean): void {
        this.searchPlaceholder.visible = !param1;
        this.searchClearButton.visible = param1;
    }

    private localize(param1: string, param2: string): string {
        let _loc3_: string = this._localization != null ? this._localization.getLocalization(param1, param2) : param2;
        return _loc3_ != null && _loc3_.length > 0 ? _loc3_ : param2;
    }

    private sortEntries(param1: any[]): void {
        let entries: any[] = param1;
        entries.sort((param1: MessengerHabbiconPickerEntry, param2: MessengerHabbiconPickerEntry): number => {
             if (param1.favorite != param2.favorite) {
                 return param1.favorite ? -1 : 1;
             }
             if (param1.name < param2.name) {
                 return -1;
             }
             if (param1.name > param2.name) {
                 return 1;
             }
             return param1.habbiconId - param2.habbiconId;
         });
    }

    private get sectionList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("habbicon_section_list"), isIItemListWindow);
    }

    private get searchInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("habbicon_search_input"), isITextFieldWindow);
    }

    private get searchPlaceholder(): ITextWindow {
        return asGuarded(this._window.findChildByName("habbicon_search_placeholder"), isITextWindow);
    }

    private get searchClearButton(): IWindow {
        return this._window.findChildByName("habbicon_search_clear_button");
    }

    private get openHubButton(): IWindow {
        return this._window.findChildByName("habbicon_open_hub_button");
    }

    private get emptyView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("empty_view"), isIWindowContainer);
    }

    get [IDisposable](): true {
        return true;
    }
}
