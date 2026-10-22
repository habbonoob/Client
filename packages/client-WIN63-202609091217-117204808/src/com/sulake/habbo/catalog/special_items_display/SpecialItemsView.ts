import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { SpecialItem } from '@/com/sulake/habbo/catalog/special_items_display/model/SpecialItem';
import type { SpecialItemsController } from '@/com/sulake/habbo/catalog/special_items_display/SpecialItemsController';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SpecialItemElementView } from '@/com/sulake/habbo/catalog/special_items_display/view/SpecialItemElementView';
import { SpecialItemPageButtonView } from '@/com/sulake/habbo/catalog/special_items_display/view/SpecialItemPageButtonView';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class SpecialItemsView implements IUpdateReceiver, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.special_items_display::SpecialItemsView'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private static readonly BLEND_BUFFERING: number = 0.1;
    public static readonly CLAIM_HEIGHT: number = 20;
    private _disposed: boolean = false;

    declare private _controller: SpecialItemsController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    declare private _pageTemplate: IRegionWindow;

    declare private _productDisplayTemplate: IWidgetWindow;

    private _pages: SpecialItemPageButtonView[] = [];

    declare private _SafeStr_2379: SpecialItemPageButtonView;

    private _SafeStr_3239: SpecialItemElementView[] = [];
    private _latestDisplayKey: string = "";
    private _visitedItems: boolean[] = [];
    private _SafeStr_3514: number = 0;

    declare private _SafeStr_2374: number;
    static { (this.prototype as any)._SafeStr_2374 = 0; }

    declare private _SafeStr_2729: boolean;
    static { (this.prototype as any)._SafeStr_2729 = false; }

    declare private _SafeStr_2267: number;
    static { (this.prototype as any)._SafeStr_2267 = NaN; }

    declare private _SafeStr_2904: number;
    static { (this.prototype as any)._SafeStr_2904 = NaN; }

    declare private _SafeStr_2477: boolean;
    static { (this.prototype as any)._SafeStr_2477 = false; }

    private _extraCycles: number = 0;

    declare private _SafeStr_2650: number;
    static { (this.prototype as any)._SafeStr_2650 = 0; }

    private _SafeStr_5522: number = 1;
    private _SafeStr_7064: number = 1;

    constructor(param1: SpecialItemsController, param2: IHabboWindowManager) {
        this._windowManager = param2;
        this._controller = param1;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("special_items_display_xml").content), 1), isIFrameWindow);
        this._pageTemplate = asGuarded(this.pageList.getListItemAt(0), isIRegionWindow);
        this.pageList.removeListItems();
        this._productDisplayTemplate = asGuarded(this.itemRotation.removeChildAt(0), isIWidgetWindow);
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
        this.previousButton.addEventListener("WME_CLICK", this.onPreviousClick);
        this.nextButton.addEventListener("WME_CLICK", this.onNextClick);
        this.claimButton.addEventListener("WME_CLICK", this.onClaimClick);
        this._controller.registerUpdateReceiver(this, 1);
        this.hide();
    }

    private get localizations(): IHabboLocalizationManager {
        return this._controller.localizationManager;
    }

    public displayNewData(): void {
        if (this._controller.key != this._latestDisplayKey) {
            this._window.caption = this.localizations.getLocalizationWithParams("special_items.title", "", "set_name", this.localizations.getLocalization("special_items." + this._controller.key + ".title"));
            this.setTitleText.text = this.localizations.getLocalization("special_items." + this._controller.key + ".header.title");
            this.setDescText.text = this.localizations.getLocalization("special_items." + this._controller.key + ".header.desc");
            this.initializePages();
            this.initializeElements();
            this.resetVisitedItems();
            this.resetToFirstElement();
        }
        this._latestDisplayKey = this._controller.key;
        this._window.activate();
        this.updateClaimState();
    }

    public updateClaimState(): void {
        let _loc1_: number = this._controller.claimState;
        if (_loc1_ == 0) {
            this.claimSpacer.height = 0;
            this.claimContainer.visible = false;
        } else {
            this.claimSpacer.height = 20;
            this.claimContainer.visible = true;
            if (_loc1_ == 1 || _loc1_ == 2) {
                this.claimButton.disable();
                this.claimButton.caption = "${special_items.claim}";
            } else if (_loc1_ == 3) {
                this.claimButton.enable();
                this.claimButton.caption = "${special_items.claim}";
            } else if (_loc1_ == 4) {
                this.claimButton.disable();
                this.claimButton.caption = "${special_items.claimed}";
            }
        }
        this.reevaluateClaimableState();
    }

    private resetVisitedItems(): void {
        this._SafeStr_3514 = 0;
        this._visitedItems = new Array<boolean>(this._controller.items.length).fill(false);
    }

    private clearPages(): void {
        this.pageList.removeListItems();
        for (const _loc1_ of this._pages ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_2379 = null;
        this._pages = [];
    }

    private initializePages(): void {
        let _loc2_: number = 0;
        let _loc1_: SpecialItemPageButtonView = null;
        this.clearPages();
        _loc2_ = 0;
        while (_loc2_ < this.totalElements) {
            _loc1_ = new SpecialItemPageButtonView(this, _loc2_);
            this.pageList.addListItem(_loc1_.window);
            this._pages.push(_loc1_);
            _loc2_ += 1;
        }
        if (this._controller.items.length == 0) {
            return;
        }
        this._SafeStr_2379 = this._pages[0];
        this._SafeStr_2379.selected = true;
    }

    private clearElements(): void {
        for (const _loc1_ of this._SafeStr_3239 ?? []) {
            this.itemRotation.removeChild(_loc1_.window);
            _loc1_.dispose();
        }
        this._SafeStr_3239 = [];
    }

    private initializeElements(): void {
        let _loc2_: SpecialItemElementView = null;
        this.clearElements();
        for (const _loc1_ of this._controller.items ?? []) {
            _loc2_ = new SpecialItemElementView(this, _loc1_);
            this.itemRotation.addChild(_loc2_.window);
            this._SafeStr_3239.push(_loc2_);
        }
    }

    public resetToFirstElement(): void {
        if (this._controller.items.length == 0) {
            return;
        }
        this.selectedPage = 0;
        let _loc1_: SpecialItem = this._controller.items[0];
        this._SafeStr_2650 = -1;
        this.setItemPlaque(_loc1_);
        this._SafeStr_2374 = 0;
        this._SafeStr_2729 = false;
        this._SafeStr_2267 = 0;
        this._SafeStr_2904 = 0;
        this._SafeStr_2477 = false;
        this._extraCycles = 0;
        this.updateRotationAnimation();
        this.plaqueAndSpotlightBlend = 1;
        this.markItemVisited(this._SafeStr_2374);
    }

    public updateRotationAnimation(): void {
        for (const _loc1_ of this._SafeStr_3239 ?? []) {
            _loc1_.updateRotation(this._SafeStr_2267);
        }
    }

    public setItemPlaque(param1: SpecialItem): void {
        if (param1.index == this._SafeStr_2650) {
            return;
        }
        this._SafeStr_2650 = param1.index;
        this.itemTitleText.text = param1.name;
        this.itemDescText.text = param1.description;
        (asGuarded(this.productIconWidget.widget, isIProductIconWidget)).productInfo = param1;
    }

    public get totalElements(): number {
        return this._controller.items.length | 0;
    }

    private onNextClick = (param1: WindowMouseEvent): void => {
        let _loc2_: boolean = this._SafeStr_2729 && !this._SafeStr_2477;
        this.navigateTo((this._SafeStr_2374 + 1) % this.totalElements, true, false);
        this._extraCycles = Math.max(0, this._extraCycles) | 0;
        if (_loc2_ && (this._SafeStr_2267 > this._SafeStr_2374 - 1 && this._SafeStr_2267 < this._SafeStr_2374 || this._SafeStr_2267 > this.totalElements - 1 && this._SafeStr_2374 == 0)) {
            this._extraCycles += 1;
        }
    };

    private onPreviousClick = (param1: WindowMouseEvent): void => {
        let _loc2_: boolean = this._SafeStr_2729 && this._SafeStr_2477;
        this.navigateTo((this._SafeStr_2374 - 1 + this.totalElements) % this.totalElements, true, true);
        this._extraCycles = Math.min(0, this._extraCycles) | 0;
        if (_loc2_ && (this._SafeStr_2267 > this._SafeStr_2374 && this._SafeStr_2267 < this._SafeStr_2374 + 1)) {
            this._extraCycles -= 1;
        }
    };

    public navigateTo(param1: number, param2: boolean = false, param3: boolean = false): void {
        this._SafeStr_2374 = param1;
        this.selectedPage = param1;
        this.markItemVisited(param1);
        if (!param2) {
            this._extraCycles = 0;
            param3 = false;
            if (this._SafeStr_2267 > param1) {
                param3 = true;
            }
        }
        this._SafeStr_2477 = param3;
        if (!this._SafeStr_2729) {
            this._SafeStr_2904 = 0;
            this._SafeStr_2729 = true;
        }
    }

    public update(param1: number): void {
        let _loc4_: number = NaN;
        if (!this._SafeStr_2729) {
            return;
        }
        let _loc2_: number = this.totalElements;
        let _loc5_: number = 1000 / param1;
        let _loc7_: number = this._SafeStr_2374 - this._SafeStr_2267;
        if (_loc7_ > 0 && this._SafeStr_2477) {
            _loc7_ -= _loc2_;
        } else if (_loc7_ < 0 && !this._SafeStr_2477) {
            _loc7_ += _loc2_;
        }
        if (!this._SafeStr_2477 && this._extraCycles > 0 || this._SafeStr_2477 && this._extraCycles < 0) {
            _loc7_ += this._extraCycles * _loc2_;
        }
        let _loc3_: number = Math.abs(_loc7_) * 2;
        let _loc6_: boolean = _loc3_ > this._SafeStr_2904;
        if (_loc6_) {
            _loc3_ = this._SafeStr_2904 * 0.95 + _loc3_ * 0.05;
        } else {
            _loc3_ = this._SafeStr_2904 * 0.85 + _loc3_ * 0.15;
        }
        _loc3_ = Math.max(0.05, _loc3_);
        let _loc8_: number = _loc3_ / _loc5_;
        if (this._SafeStr_2477) {
            _loc8_ *= -1;
        }
        this._SafeStr_2904 = _loc3_;
        if (!this._SafeStr_2477 && _loc8_ > _loc7_ || this._SafeStr_2477 && _loc8_ < _loc7_) {
            this._SafeStr_2729 = false;
            this._SafeStr_2267 = this._SafeStr_2374;
            this._extraCycles = 0;
        } else {
            this._SafeStr_2267 += _loc8_;
            if (this._extraCycles != 0) {
                _loc4_ = _loc7_ % _loc2_;
                if (this._extraCycles > 0 && !this._SafeStr_2477 && _loc8_ > _loc4_) {
                    this._extraCycles -= 1;
                } else if (this._extraCycles < 0 && this._SafeStr_2477 && _loc8_ < _loc4_) {
                    this._extraCycles += 1;
                }
            }
            if (this._SafeStr_2267 > _loc2_) {
                this._SafeStr_2267 -= _loc2_;
            } else if (this._SafeStr_2267 < 0) {
                this._SafeStr_2267 += _loc2_;
            }
        }
        this.updatePlaqueAndSpotlight();
        this.updateRotationAnimation();
    }

    private updatePlaqueAndSpotlight(): void {
        let _loc3_: SpecialItemElementView = null;
        let _loc2_: number = NaN;
        if (!this._SafeStr_2729) {
            this.plaqueAndSpotlightBlend = 1;
            this.setItemPlaque(this._SafeStr_3239[this._SafeStr_2374].item);
            return;
        }
        let _loc1_: number = 0;
        if (this._SafeStr_2650 != -1) {
            _loc3_ = this._SafeStr_3239[this._SafeStr_2650];
            _loc1_ = _loc3_.focusValue;
        }
        if (this._SafeStr_2650 != this._SafeStr_2374 && this._SafeStr_2650 != -1 && _loc1_ == 0) {
            this._SafeStr_2650 = -1;
        }
        if (this._SafeStr_2650 != this._SafeStr_2374 && this._extraCycles == 0 && this._SafeStr_2904 < Math.min(2, this.totalElements - 1)) {
            _loc3_ = this._SafeStr_3239[this._SafeStr_2374];
            _loc2_ = _loc3_.focusValue;
            if (_loc2_ > _loc1_) {
                _loc1_ = _loc2_;
                this.setItemPlaque(_loc3_.item);
            }
        }
        this.plaqueAndSpotlightBlend = _loc1_;
    }

    public set plaqueAndSpotlightBlend(param1: number) {
        let _loc3_: IScrollbarWindow = null;
        let _loc7_: IWindow = null;
        let _loc5_: IWindow = null;
        let _loc6_: number = 0.4;
        if (param1 > 0.8) {
            _loc6_ = 0.4 + (param1 - 0.8) / 0.2 * 0.6;
        }
        let _loc2_: boolean = Math.abs(this._SafeStr_7064 - _loc6_) > 0.1 || _loc6_ == 0.4 && this._SafeStr_7064 != 0.4 || _loc6_ == 1 && this._SafeStr_7064 != 1;
        if (_loc2_) {
            this.spotlightBaseImg.blend = _loc6_;
            this.spotlightImg.blend = _loc6_;
        }
        let _loc4_: boolean = Math.abs(this._SafeStr_5522 - param1) > 0.1 || param1 == 0 && this._SafeStr_5522 != 0 || param1 == 1 && this._SafeStr_5522 != 1;
        if (_loc4_) {
            this._SafeStr_5522 = param1;
            this.itemTitleText.blend = param1;
            this.itemDescText.blend = param1;
            (asGuarded(this.productIconWidget.widget, isIProductIconWidget)).blend = param1;
            _loc3_ = asGuarded(this.itemScrollArea.findChildByName("_SCROLLBAR"), isIScrollbarWindow);
            _loc7_ = _loc3_.findChildByName("slider_track");
            _loc5_ = _loc7_.findChildByName("slider_bar");
            _loc7_.blend = param1;
            _loc5_.blend = param1;
        }
    }

    public set selectedPage(param1: number) {
        if (this._SafeStr_2379 != null) {
            this._SafeStr_2379.selected = false;
            this._SafeStr_2379 = null;
        }
        if (param1 >= 0 && param1 < this._pages.length) {
            this._SafeStr_2379 = this._pages[param1];
            this._SafeStr_2379.selected = true;
        }
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    private onClaimClick = (param1: WindowMouseEvent): void => {
        if (this._controller.claimState != 3) {
            return;
        }
        this._controller.makeClaim();
    };

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

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.clearPages();
        this._controller.removeUpdateReceiver(this);
        this._SafeStr_2374 = 0;
        this._SafeStr_2729 = false;
        this._SafeStr_2267 = 0;
        this._SafeStr_2904 = 0;
        this._SafeStr_2477 = false;
        this._SafeStr_2650 = 0;
        this._window.dispose();
        this._window = null;
        this._pageTemplate.dispose();
        this._pageTemplate = null;
        this._productDisplayTemplate.dispose();
        this._productDisplayTemplate = null;
        this._controller = null;
        this._windowManager = null;
        this._pages = null;
        this._visitedItems = null;
        this._SafeStr_3514 = 0;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get pageTemplate(): IRegionWindow {
        return this._pageTemplate;
    }

    public get productDisplayTemplate(): IWidgetWindow {
        return this._productDisplayTemplate;
    }

    private markItemVisited(param1: number): void {
        if (this._visitedItems == null || param1 < 0 || param1 >= this._visitedItems.length) {
            return;
        }
        if (this._visitedItems[param1]) {
            return;
        }
        this._visitedItems[param1] = true;
        this._SafeStr_3514 += 1;
        if (this._SafeStr_3514 == this._visitedItems.length) {
            this.reevaluateClaimableState();
        }
    }

    private reevaluateClaimableState(): void {
        if (this._controller.claimState != 2) {
            return;
        }
        if (this._visitedItems == null || this._visitedItems.length == 0) {
            return;
        }
        if (this._SafeStr_3514 != this._visitedItems.length) {
            return;
        }
        this._controller.makeClaimable();
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get setTitleText(): ITextWindow {
        return asGuarded(this._window.findChildByName("set_title"), isITextWindow);
    }

    private get setDescText(): ITextWindow {
        return asGuarded(this._window.findChildByName("set_desc"), isITextWindow);
    }

    private get platformImg(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("platform_img"), isIStaticBitmapWrapperWindow);
    }

    private get spotlightImg(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("spotlight_img"), isIStaticBitmapWrapperWindow);
    }

    private get itemRotation(): IWindowContainer {
        return asGuarded(this._window.findChildByName("item_rotation"), isIWindowContainer);
    }

    private get spotlightBaseImg(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("spotlight_base_img"), isIStaticBitmapWrapperWindow);
    }

    private get previousButton(): IRegionWindow {
        return asGuarded(this._window.findChildByName("previous_button"), isIRegionWindow);
    }

    private get nextButton(): IRegionWindow {
        return asGuarded(this._window.findChildByName("next_button"), isIRegionWindow);
    }

    private get pageList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("page_list"), isIItemListWindow);
    }

    private get claimContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("claim_container"), isIWindowContainer);
    }

    private get claimText(): ITextWindow {
        return asGuarded(this._window.findChildByName("claim_txt"), isITextWindow);
    }

    private get claimButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("claim_btn"), isIButtonWindow);
    }

    private get claimSpacer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("claim_spacer"), isIWindowContainer);
    }

    private get itemTitleText(): ITextWindow {
        return asGuarded(this._window.findChildByName("item_title"), isITextWindow);
    }

    private get itemDescText(): ITextWindow {
        return asGuarded(this._window.findChildByName("item_desc"), isITextWindow);
    }

    private get productIconWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("product_icon"), isIWidgetWindow);
    }

    private get itemScrollArea(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("item_scroll_area"), isIScrollableListWindow);
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
