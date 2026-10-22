import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { _SafeCls_6006 } from '@/com/sulake/habbo/catalog/habbicons/_SafeCls_6006';
import type { HabbiconControllerEvent } from '@/com/sulake/habbo/catalog/habbicons/HabbiconControllerEvent';
import type { _SafeCls_6003 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6003';
import type { _SafeCls_6004 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6004';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomChatInputView } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputView';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TriggerHabbiconMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/TriggerHabbiconMessageComposer';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { HabbiconSelectorEntry } from '@/com/sulake/habbo/ui/widget/chatinput/habbiconselector/HabbiconSelectorEntry';
import { HabbiconSelectorSection } from '@/com/sulake/habbo/ui/widget/chatinput/habbiconselector/HabbiconSelectorSection';

export class HabbiconSelector {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput.habbiconselector::HabbiconSelector'); }

    private static readonly SCREEN_LEFT_BORDER: number = 92;
    private static readonly CHAT_BAR_POPUP_OFFSET: number = 55;
    private static readonly MENU_MIN_HEIGHT: number = 91;
    private static readonly MENU_MAX_HEIGHT: number = 292;
    private static readonly TOP_BAR_HEIGHT: number = 42;
    private static readonly BOTTOM_PADDING: number = 6;
    private static readonly GRID_COLUMNS: number = 5;
    private static readonly SLOT_SIZE: number = 42;
    private static readonly SLOT_SPACING: number = 2;
    private static readonly SLOT_FILLED_COLOR: number = 4280229663;
    private static readonly SLOT_EMPTY_COLOR: number = 4281611316;
    private static readonly SLOT_FILLED_HOVER_COLOR: number = 4280953386;
    private static readonly RECENT_LIMIT: number = 10;
    private static readonly SECTION_FAVORITES: string = "favorites";
    private static readonly _SafeStr_14316: string = "recent";
    private static readonly _SafeStr_14317: string = "collection";
    private static readonly SECTION_SEARCH: string = "search";

    declare private _chatInputView: RoomChatInputView;

    declare private _controller: _SafeCls_6006;

    declare private _window: IBorderWindow;

    declare private _SafeStr_14733: IWindowContainer;

    declare private _SafeStr_14734: IWindow;

    declare private _SafeStr_14735: IItemListWindow;

    declare private _SafeStr_14318: IWindowContainer;

    declare private _searchInput: ITextFieldWindow;

    declare private _SafeStr_14736: ITextWindow;

    declare private _SafeStr_14737: IWindow;

    declare private _SafeStr_14738: IWindow;

    declare private _emptyView: IWindowContainer;

    declare private _childPresets: any[];

    declare private _ownedSearchEntries: any[];

    declare private _SafeStr_14320: Map<any, any>;

    declare private _SafeStr_14089: any[];

    declare private _SafeStr_14739: Map<any, any>;

    declare private _SafeStr_14740: Map<any, any>;

    private _SafeStr_14321: boolean = true;
    private _SafeStr_14322: boolean = true;

    declare private _SafeStr_14323: boolean;
    static { (this.prototype as any)._SafeStr_14323 = false; }

    declare private _SafeStr_14324: string;

    constructor(param1: RoomChatInputView, param2: IWindow, param3: IWindowContainer) {
        let _loc4_: IAssetLibrary = null;
        this._chatInputView = param1;
        this._controller = param1.widget.roomUi ? param1.widget.roomUi.habbiconController : null;
        this._SafeStr_14734 = param2;
        this._SafeStr_14733 = param3;
        this._childPresets = [];
        this._ownedSearchEntries = [];
        this._SafeStr_14320 = new Dictionary();
        this._SafeStr_14089 = [];
        this._SafeStr_14739 = new Dictionary();
        this._SafeStr_14740 = new Dictionary();
        _loc4_ = param1.widget.assets;
        this._window = castGuarded(param1.widget.windowManager.buildFromXML(XML.from(_loc4_.getAssetByName("habbiconselector_menu_xml").content)), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        this._window.visible = false;
        this._SafeStr_14733.addChild(this._window);
        this._SafeStr_14735 = castGuarded(this._window.findChildByName("habbicon_section_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_14318 = castGuarded(this._SafeStr_14735.removeListItem(this._SafeStr_14735.getListItemByName("habbicon_section_template")), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._searchInput = castGuarded(this._window.findChildByName("habbicon_search_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._SafeStr_14736 = castGuarded(this._window.findChildByName("habbicon_search_placeholder"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        this._SafeStr_14737 = this._window.findChildByName("habbicon_search_clear_button");
        this._SafeStr_14738 = this._window.findChildByName("habbicon_open_hub_button");
        this._emptyView = asGuarded(this._window.findChildByName("empty_view"), isIWindowContainer);
        if (this._searchInput) {
            this._searchInput.addEventListener("WE_CHANGE", this.onSearchChanged);
            this._searchInput.addEventListener("WKE_KEY_DOWN", this.onSearchKeyDown);
        }
        if (this._SafeStr_14736) {
            this._SafeStr_14736.addEventListener("WME_DOWN", this.onSearchPlaceholderDown);
        }
        if (this._SafeStr_14737) {
            this._SafeStr_14737.addEventListener("WME_CLICK", this.onSearchClearClicked);
        }
        if (this._SafeStr_14738) {
            this._SafeStr_14738.addEventListener("WME_CLICK", this.onOpenHubClicked);
        }
        if (this._controller) {
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

    public dispose(): void {
        if (this._controller) {
            this._controller.removeEventListener("hce_owned_habbicons_updated", this.onControllerDataUpdated);
            this._controller.removeEventListener("hce_shop_data_updated", this.onControllerDataUpdated);
            this._controller.removeEventListener("hce_recent_habbicons_updated", this.onRecentHabbiconsUpdated);
            this._controller = null;
        }
        if (this._searchInput) {
            this._searchInput.removeEventListener("WE_CHANGE", this.onSearchChanged);
            this._searchInput.removeEventListener("WKE_KEY_DOWN", this.onSearchKeyDown);
            this._searchInput = null;
        }
        if (this._SafeStr_14736) {
            this._SafeStr_14736.removeEventListener("WME_DOWN", this.onSearchPlaceholderDown);
            this._SafeStr_14736 = null;
        }
        if (this._SafeStr_14737) {
            this._SafeStr_14737.removeEventListener("WME_CLICK", this.onSearchClearClicked);
            this._SafeStr_14737 = null;
        }
        if (this._SafeStr_14738) {
            this._SafeStr_14738.removeEventListener("WME_CLICK", this.onOpenHubClicked);
            this._SafeStr_14738 = null;
        }
        this.clearSections();
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._SafeStr_14735 = null;
        this._SafeStr_14318 = null;
        this._ownedSearchEntries = null;
        this._SafeStr_14320 = null;
        this._SafeStr_14734 = null;
        this._SafeStr_14733 = null;
        this._chatInputView = null;
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    public get visible(): boolean {
        return this._window != null && Boolean(this._window.visible);
    }

    public toggle(): void {
        if (!this._window) {
            return;
        }
        if (this._window.visible) {
            this.hide();
            return;
        }
        this._window.visible = true;
        if (this._window.visible) {
            this.applyDeferredRecentSectionUpdate();
            this.renderIfDirty();
            this.alignToAnchor();
            this.focusSearch();
        }
    }

    public hide(param1: boolean = true): void {
        if (this._window && this._window.visible) {
            this._window.visible = false;
            if (param1 && this._controller) {
                this._controller.resetUnseenHabbicons();
                this.invalidateLayout();
            }
        }
    }

    public containsWindow(param1: IWindow): boolean {
        return HabbiconSelector.isWindowInTree(param1, this._window);
    }

    public focusSearch(): void {
        if (this._searchInput) {
            this._searchInput.focus();
        }
    }

    public alignToAnchor(): void {
        let _loc2_: Rectangle = null;
        let _loc1_: IWindowContainer = null;
        let _loc3_: Point = null;
        if (!this._window || !this._window.visible || !this._SafeStr_14734 || !this._window.parent) {
            return;
        }
        _loc2_ = new Rectangle();
        this._SafeStr_14734.getGlobalRectangle(_loc2_);
        _loc1_ = castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc1_.x = _loc2_.x | 0;
        _loc1_.y = _loc2_.bottom - 55 - this._window.height | 0;
        _loc3_ = new Point();
        _loc1_.getGlobalPosition(_loc3_);
        if (_loc3_.x < 92) {
            _loc1_.x += 92 - _loc3_.x;
        }
        if (_loc1_.y < 0) {
            _loc1_.y = 0;
        }
    }

    private onControllerDataUpdated = (param1: Event): void => {
        this.invalidateSections();
        if (this._window && this._window.visible) {
            this.renderIfDirty();
            this.alignToAnchor();
        }
    };

    private onRecentHabbiconsUpdated = (param1: HabbiconControllerEvent): void => {
        let _loc2_: number = 0;
        if (!this.addRecentHabbicon(param1.habbiconId)) {
            return;
        }
        if (this._window && this._window.visible) {
            this._SafeStr_14323 = true;
            return;
        }
        if (this._SafeStr_14321) {
            return;
        }
        _loc2_ = this.recentSectionIndex();
        if (!this.refreshRecentSectionState()) {
            return;
        }
        if (!this._window || !this._window.visible || this.normalizedQuery().length > 0) {
            this._SafeStr_14322 = true;
            return;
        }
        this.renderRecentSection(_loc2_);
        this.alignToAnchor();
    };

    private applyDeferredRecentSectionUpdate(): void {
        if (!this._SafeStr_14323) {
            return;
        }
        this._SafeStr_14323 = false;
        if (this._SafeStr_14321) {
            return;
        }
        if (this.refreshRecentSectionState()) {
            this._SafeStr_14322 = true;
        }
    }

    private invalidateSections(): void {
        this._SafeStr_14321 = true;
        this._SafeStr_14322 = true;
    }

    private invalidateLayout(): void {
        this._SafeStr_14322 = true;
    }

    private renderIfDirty(): void {
        let _loc1_: string = this.normalizedQuery();
        if (this._SafeStr_14324 != _loc1_) {
            this._SafeStr_14322 = true;
        }
        if (!this._SafeStr_14321 && !this._SafeStr_14322) {
            this.setSearchState(_loc1_.length > 0);
            return;
        }
        if (this._SafeStr_14321) {
            this.refreshSections();
            this._SafeStr_14321 = false;
        }
        this.refresh(_loc1_);
        this._SafeStr_14324 = _loc1_;
        this._SafeStr_14322 = false;
    }

    private refreshSections(): void {
        let _loc4_: any[] = null;
        let _loc3_: any = null;
        let _loc2_: HabbiconSelectorEntry = null;
        let _loc1_: any[] = [];
        let _loc5_: any[] = [];
        this._childPresets = [];
        this._ownedSearchEntries = [];
        this._SafeStr_14320 = new Dictionary();
        if (this._controller == null) {
            return;
        }
        this.syncRecentHabbiconIds();
        _loc4_ = this._controller.ownedHabbicons;
        for (_loc3_ of _loc4_ ?? []) {
            _loc2_ = this.createEntry(_loc3_);
            if (_loc2_ != null) {
                this._SafeStr_14320.set(_loc2_.habbiconId, _loc2_);
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
            this._childPresets.push(new HabbiconSelectorSection("favorites", "favorites", this.localize("habbicons.favourites.title", "Favorites"), _loc1_));
        }
        if (_loc5_.length > 0) {
            this._childPresets.push(new HabbiconSelectorSection("recent", "recent", this.localize("habbicon.recently.used", "Recently used"), _loc5_));
        }
        this.addOwnedSetSections();
    }

    private addOwnedSetSections(): void {
        let _loc3_: any = undefined;
        let _loc5_: any = null;
        let _loc2_: any[] = null;
        let _loc4_: any = null;
        let _loc1_: HabbiconSelectorEntry = null;
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
                            _loc1_ = asInstanceOf(this._SafeStr_14320.get(_loc4_.habbiconId), HabbiconSelectorEntry);
                            if (_loc1_ != null) {
                                _loc2_.push(_loc1_);
                            }
                        }
                    }
                }
                if (_loc5_._SafeStr_14096 > 0) {
                    _loc1_ = asInstanceOf(this._SafeStr_14320.get(_loc5_._SafeStr_14096), HabbiconSelectorEntry);
                    if (_loc1_ != null) {
                        _loc2_.push(_loc1_);
                    }
                }
                if (_loc2_.length > 0) {
                    this._childPresets.push(new HabbiconSelectorSection("collection", "collection:" + _loc5_.collectionId, this.resolveCollectionTitle(_loc5_), _loc2_));
                }
            }
        }
    }

    private buildRecentEntries(): any[] {
        let _loc1_: number = 0;
        let _loc2_: HabbiconSelectorEntry = null;
        let _loc3_: any[] = [];
        for (_loc1_ of this._SafeStr_14089 ?? []) {
            _loc2_ = asInstanceOf(this._SafeStr_14320.get(_loc1_), HabbiconSelectorEntry);
            if (_loc2_ != null) {
                _loc3_.push(_loc2_);
            }
        }
        return _loc3_;
    }

    private refreshRecentSectionState(): boolean {
        let _loc2_: HabbiconSelectorSection = null;
        let _loc3_: any[] = this.buildRecentEntries();
        let _loc1_: number = this.recentSectionIndex();
        if (_loc1_ >= 0) {
            _loc2_ = asInstanceOf(this._childPresets[_loc1_], HabbiconSelectorSection);
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
        this._childPresets.splice(this.recentInsertIndex(), 0, new HabbiconSelectorSection("recent", "recent", this.localize("habbicon.recently.used", "Recently used"), _loc3_));
        return true;
    }

    private renderRecentSection(param1: number): void {
        let _loc4_: HabbiconSelectorSection = null;
        let _loc3_: IWindow = null;
        let _loc2_: number = this.recentSectionIndex();
        let _loc5_: number = Number(this._SafeStr_14735.scrollV);
        if (param1 >= 0 && param1 < this._SafeStr_14735.numListItems) {
            _loc3_ = this._SafeStr_14735.removeListItemAt(param1);
            if (_loc3_ != null) {
                _loc3_.dispose();
            }
        }
        if (_loc2_ >= 0) {
            _loc4_ = asInstanceOf(this._childPresets[_loc2_], HabbiconSelectorSection);
            this.addSectionAt(_loc2_, _loc4_);
        }
        this._emptyView.visible = this._childPresets.length == 0;
        this.updateHeight();
        this._SafeStr_14735.scrollV = _loc5_;
    }

    private recentSectionIndex(): number {
        let _loc1_: number = 0;
        let _loc2_: HabbiconSelectorSection = null;
        _loc1_ = 0;
        while (_loc1_ < this._childPresets.length) {
            _loc2_ = asInstanceOf(this._childPresets[_loc1_], HabbiconSelectorSection);
            if (_loc2_.type == "recent") {
                return _loc1_;
            }
            _loc1_++;
        }
        return -1;
    }

    private recentInsertIndex(): number {
        let _loc1_: HabbiconSelectorSection = this._childPresets.length > 0 ? asInstanceOf(this._childPresets[0], HabbiconSelectorSection) : null;
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

    private createEntry(param1: _SafeCls_6003): HabbiconSelectorEntry {
        let _loc3_: number = 0;
        let _loc2_: string = null;
        if (param1 == null) {
            return null;
        }
        _loc3_ = param1.habbiconState;
        if (_loc3_ != 2 && _loc3_ != 3) {
            return null;
        }
        _loc2_ = this.resolveEntryName(param1.habbiconId);
        return new HabbiconSelectorEntry(param1.habbiconId, _loc2_, this.seededColor(param1.habbiconId * 37), _loc3_ == 3);
    }

    private resolveEntryName(param1: number): string {
        let _loc2_: string = HabbiconAssetManager.getHabbiconNameKey(param1);
        return _loc2_ != null && _loc2_.length > 0 ? this.localize("habbicon_" + _loc2_ + "_name", _loc2_) : "Habbicon";
    }

    private resolveCollectionTitle(param1: _SafeCls_6004): string {
        if (param1 == null || param1.name == null || param1.name.length == 0) {
            return "Habbicons";
        }
        return this.localize("habbicon_collection_" + param1.name + "_name", param1.name);
    }

    private localize(param1: string, param2: string): string {
        let _loc3_: IHabboLocalizationManager = this._chatInputView != null && this._chatInputView.widget != null ? this._chatInputView.widget.localizations : null;
        let _loc4_: string = _loc3_ != null ? _loc3_.getLocalization(param1, param2) : param2;
        return _loc4_ != null && _loc4_.length > 0 ? _loc4_ : param2;
    }

    private sortEntries(param1: any[]): void {
        let entries: any[] = param1;
        entries.sort((param1: HabbiconSelectorEntry, param2: HabbiconSelectorEntry): number => {
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

    private refresh(param1: string = null): void {
        let _loc4_: number = 0;
        let _loc5_: any = null;
        let _loc3_: any[] = null;
        let _loc2_: any = null;
        this.clearSections();
        if (param1 == null) {
            param1 = this.normalizedQuery();
        }
        this.setSearchState(param1.length > 0);
        _loc4_ = 0;
        if (param1.length > 0) {
            _loc4_ = this.addSearchResultsSection(param1);
            this._emptyView.visible = _loc4_ == 0;
            this.updateHeight();
            return;
        }
        for (_loc5_ of this._childPresets ?? []) {
            _loc3_ = [];
            for (_loc2_ of valuesOf(_loc5_.entries)) {
                if (param1.length == 0 || _loc2_.searchName.indexOf(param1) >= 0) {
                    _loc3_.push(_loc2_);
                }
            }
            if (_loc3_.length != 0) {
                this.addSection(new HabbiconSelectorSection(stringOrNull(_loc5_.type), stringOrNull(_loc5_.key), stringOrNull(_loc5_.title), _loc3_));
                _loc4_++;
            }
        }
        this._emptyView.visible = _loc4_ == 0;
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
        this.addSection(new HabbiconSelectorSection("search", "search", this.localize("habbicon.search.results", "Search results"), _loc3_));
        return 1;
    }

    private clearSections(): void {
        let _loc1_: IWindow = null;
        if (!this._SafeStr_14735) {
            return;
        }
        this._SafeStr_14739 = new Dictionary();
        this._SafeStr_14740 = new Dictionary();
        while (this._SafeStr_14735.numListItems > 0) {
            _loc1_ = this._SafeStr_14735.removeListItemAt(0);
            if (_loc1_) {
                _loc1_.dispose();
            }
        }
    }

    private addSection(param1: HabbiconSelectorSection): void {
        this._SafeStr_14735.addListItem(this.createSectionWindow(param1));
    }

    private addSectionAt(param1: number, param2: HabbiconSelectorSection): void {
        this._SafeStr_14735.addListItemAt(this.createSectionWindow(param2), param1 >>> 0);
    }

    private createSectionWindow(param1: HabbiconSelectorSection): IWindowContainer {
        let _loc6_: IWindowContainer = null;
        let _loc12_: ITextWindow = null;
        let _loc15_: IItemGridWindow = null;
        let _loc2_: IWindowContainer = null;
        let _loc4_: number = 0;
        let _loc8_: number = 0;
        let _loc14_: number = 0;
        let _loc7_: number = 0;
        let _loc10_: HabbiconSelectorEntry = null;
        let _loc11_: IRegionWindow = null;
        let _loc5_: IBitmapWrapperWindow = null;
        let _loc3_: IBorderWindow = null;
        let _loc13_: IWindowContainer = null;
        let _loc9_: ITextWindow = null;
        _loc6_ = asGuarded(this._SafeStr_14318.clone(), isIWindowContainer);
        _loc6_.visible = true;
        _loc12_ = castGuarded(_loc6_.findChildByName("section_title"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc12_.caption = param1.title;
        _loc15_ = castGuarded(_loc6_.findChildByName("habbicon_grid"), isIItemGridWindow, "com.sulake.core.window.components.IItemGridWindow");
        _loc2_ = asGuarded(_loc15_.getGridItemAt(0), isIWindowContainer);
        _loc15_.removeGridItems();
        _loc4_ = param1.entries.length | 0;
        _loc8_ = Math.max(1, Math.ceil(_loc4_ / 5)) | 0;
        _loc14_ = _loc8_ * 5;
        _loc7_ = 0;
        while (_loc7_ < _loc14_) {
            _loc10_ = _loc7_ < _loc4_ ? param1.entries[_loc7_] : null;
            _loc11_ = asGuarded(_loc2_.clone(), isIRegionWindow);
            _loc11_.toolTipCaption = _loc10_ ? _loc10_.name : "";
            this.addWheelListeners(_loc11_);
            _loc5_ = castGuarded(_loc11_.findChildByName("habbicon_icon"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            if (_loc5_) {
                this.addWheelListeners(_loc5_);
                if (_loc5_.bitmap) {
                    _loc5_.bitmap.dispose();
                    _loc5_.bitmap = null;
                }
                if (_loc10_) {
                    _loc5_.bitmap = this.createHabbiconBitmap(_loc10_.habbiconId, _loc10_.color);
                    _loc5_.visible = true;
                    _loc5_.invalidate();
                } else {
                    _loc5_.visible = false;
                }
            }
            if (_loc10_) {
                _loc11_.addEventListener("WME_CLICK", this.onHabbiconClicked);
                _loc11_.addEventListener("WME_OVER", this.onHabbiconHovered);
                _loc11_.addEventListener("WME_OUT", this.onHabbiconOut);
            }
            _loc11_.mouseThreshold = (_loc10_ ? 0 : 10) >>> 0;
            _loc3_ = castGuarded(_loc11_.findChildByName("habbicon_item_bg"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
            if (_loc3_) {
                this.addWheelListeners(_loc3_);
                _loc3_.color = _loc10_ ? 4280229663 : 4281611316;
            }
            if (_loc10_ && this.isUnseen(_loc10_.habbiconId)) {
                _loc13_ = this._chatInputView.widget.windowManager.createUnseenItemCounter();
                _loc9_ = asGuarded(_loc13_.findChildByName("count"), isITextWindow);
                if (_loc9_) {
                    _loc9_.caption = "1";
                }
                _loc13_.x = _loc11_.width - _loc13_.width - 1;
                _loc13_.y = 1;
                _loc11_.addChild(_loc13_);
            }
            _loc15_.addGridItem(_loc11_);
            this._SafeStr_14740.set(_loc11_, true);
            if (_loc10_) {
                this._SafeStr_14739.set(_loc11_, _loc10_);
            }
            _loc7_++;
        }
        _loc15_.height = _loc8_ * 42 + (_loc8_ - 1) * 2;
        _loc6_.height = 20 + _loc15_.height + 2;
        _loc2_.dispose();
        return _loc6_;
    }

    private updateHeight(): void {
        let _loc3_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        if (!this._window || !this._SafeStr_14735) {
            return;
        }
        _loc3_ = this._SafeStr_14735.scrollableRegion.height | 0;
        _loc1_ = Math.max(46, _loc3_ + 2) | 0;
        _loc2_ = 292 - 42 - 6;
        _loc1_ = Math.min(_loc1_, _loc2_) | 0;
        this._SafeStr_14735.height = _loc1_;
        this._window.height = Math.max(91, 42 + _loc1_ + 6) | 0;
        this._window.invalidate();
    }

    private normalizedQuery(): string {
        let _loc1_: string = null;
        if (!this._searchInput) {
            return "";
        }
        _loc1_ = this._searchInput.text;
        if (!_loc1_) {
            return "";
        }
        return _loc1_.toLowerCase();
    }

    private onSearchPlaceholderDown = (param1: WindowMouseEvent): void => {
        if (this._searchInput) {
            this._searchInput.focus();
        }
    };

    private onSearchChanged = (param1: WindowEvent): void => {
        this.invalidateLayout();
        this.renderIfDirty();
        this.alignToAnchor();
    };

    private onSearchKeyDown = (param1: WindowKeyboardEvent): void => {
        if (param1.keyCode != 27 || this._searchInput.text.length == 0) {
            return;
        }
        this.clearSearch();
    };

    private onSearchClearClicked = (param1: WindowMouseEvent): void => {
        this.clearSearch();
    };

    private clearSearch(): void {
        if (this._searchInput) {
            this._searchInput.text = "";
        }
        this.invalidateLayout();
        this.renderIfDirty();
        this.alignToAnchor();
    }

    private onOpenHubClicked = (param1: WindowMouseEvent): void => {
        this._chatInputView.openHabbiconHub();
        this.hide();
    };

    private onHabbiconClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: HabbiconSelectorEntry = this.resolveEntry(param1.window);
        if (!_loc2_) {
            return;
        }
        if (this._controller) {
            this._controller.removeUnseenHabbicon(_loc2_.habbiconId);
            this._controller.noteHabbiconUsed(_loc2_.habbiconId);
        } else if (this.addRecentHabbicon(_loc2_.habbiconId)) {
            this._SafeStr_14323 = true;
        }
        this.sendTriggerHabbicon(_loc2_.habbiconId);
        if (!param1.shiftKey) {
            this.hide(false);
        }
    };

    private sendTriggerHabbicon(param1: number): void {
        this._chatInputView.widget.handler.container.connection.send(new TriggerHabbiconMessageComposer(param1));
    }

    private isUnseen(param1: number): boolean {
        return this._controller != null && this._controller.isUnseenHabbicon(param1);
    }

    private syncRecentHabbiconIds(): void {
        let _loc2_: any[] = null;
        let _loc1_: number = 0;
        if (this._controller == null) {
            return;
        }
        _loc2_ = this._controller.recentHabbiconIds;
        this._SafeStr_14089 = [];
        for (_loc1_ of _loc2_ ?? []) {
            this._SafeStr_14089.push(_loc1_);
        }
    }

    private addRecentHabbicon(param1: number): boolean {
        let _loc2_: number = this._SafeStr_14089.indexOf(param1);
        if (param1 <= 0 || _loc2_ == 0) {
            return false;
        }
        if (_loc2_ >= 0) {
            this._SafeStr_14089.splice(_loc2_, 1);
        }
        this._SafeStr_14089.unshift(param1);
        if (this._SafeStr_14089.length > 10) {
            this._SafeStr_14089.length = 10;
        }
        return true;
    }

    private addWheelListeners(param1: IWindow): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("WME_WHEEL", this.onSelectorWheel);
        param1.addEventListener("WME_WHEEL_HORIZONTAL", this.onSelectorWheel);
    }

    private onSelectorWheel = (param1: WindowMouseEvent): void => {
        let _loc2_: number = NaN;
        if (!this._SafeStr_14735) {
            return;
        }
        _loc2_ = Number(param1.type == "WME_WHEEL_HORIZONTAL" ? -param1.delta : param1.delta);
        if (this._SafeStr_14735.scrollWithWheel(_loc2_, param1.type == "WME_WHEEL_HORIZONTAL" || param1.shiftKey)) {
            param1.stopPropagation();
        }
    };

    private onHabbiconHovered = (param1: WindowMouseEvent): void => {
        let _loc3_: IBorderWindow = null;
        let _loc2_: IWindowContainer = this.resolveHabbiconWindow(param1.window);
        if (!_loc2_) {
            return;
        }
        _loc3_ = castGuarded(_loc2_.findChildByName("habbicon_item_bg"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        if (_loc3_) {
            _loc3_.color = 4280953386;
        }
    };

    private onHabbiconOut = (param1: WindowMouseEvent): void => {
        let _loc3_: IBorderWindow = null;
        let _loc2_: IWindowContainer = this.resolveHabbiconWindow(param1.window);
        if (!_loc2_) {
            return;
        }
        _loc3_ = castGuarded(_loc2_.findChildByName("habbicon_item_bg"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        if (_loc3_) {
            _loc3_.color = this._SafeStr_14739.get(_loc2_) ? 4280229663 : 4281611316;
        }
    };

    private resolveEntry(param1: IWindow): HabbiconSelectorEntry {
        let _loc2_: IWindowContainer = this.resolveHabbiconWindow(param1);
        return _loc2_ ? asInstanceOf(this._SafeStr_14739.get(_loc2_), HabbiconSelectorEntry) : null;
    }

    private resolveHabbiconWindow(param1: IWindow): IWindowContainer {
        let _loc2_: IWindow = param1;
        while (_loc2_ != null) {
            if (isIWindowContainer(_loc2_) && this._SafeStr_14740.get(_loc2_) != null) {
                return castGuarded(_loc2_, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            }
            _loc2_ = _loc2_.parent;
        }
        return null;
    }

    private setSearchState(param1: boolean): void {
        if (this._SafeStr_14736) {
            this._SafeStr_14736.visible = !param1;
        }
        if (this._SafeStr_14737) {
            this._SafeStr_14737.visible = param1;
        }
    }

    private seededColor(param1: number): number {
        let _loc2_: number = param1 % 6;
        switch (_loc2_) {
            case 0:
                return 16371247;
            case 1:
                return 15964719;
            case 2:
                return 15695663;
            case 3:
                return 9358143;
            case 4:
                return 5095656;
            default:
                return 12813557;
        }
    }

    private createHabbiconBitmap(param1: number, param2: number): BitmapData {
        let _loc3_: BitmapData = HabbiconAssetManager.getPreviewBitmap(param1, false);
        if (_loc3_ != null) {
            return _loc3_.clone();
        }
        return new BitmapData(40, 40, false, param2);
    }
}
