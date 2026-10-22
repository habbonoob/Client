import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconTileView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconTileView';
import type { IHabboConfigurationManager } from '@/com/sulake/habbo/configuration/IHabboConfigurationManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconPopupMode } from '@/com/sulake/habbo/catalog/habbicons/HabbiconPopupMode';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';

export class HabbiconPopupController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconPopupController'); }

    private static readonly HABBICON_POPUP_HORIZONTAL_MARGIN: number = 4;
    private static readonly HABBICON_POPUP_VERTICAL_OFFSET: number = 2;
    private static readonly _SafeStr_14908: number = 7995440;

    declare private _SafeStr_14909: IWindowContainer;

    declare private _popup: IWindow;

    declare private _SafeStr_14910: IItemListWindow;

    declare private _SafeStr_14911: IBorderWindow;

    declare private _popupTitle: ITextWindow;

    declare private _SafeStr_14912: ITextWindow;

    declare private _SafeStr_14913: IWindowContainer;

    declare private _SafeStr_14914: IButtonWindow;

    declare private _SafeStr_14915: IBorderWindow;

    declare private _SafeStr_14916: ITextWindow;

    declare private _SafeStr_14917: IIconWindow;

    declare private _SafeStr_14918: IButtonWindow;

    declare private _SafeStr_14882: HabbiconTileView;

    declare private _SafeStr_14919: (...args: any[]) => any;

    declare private _SafeStr_14920: (...args: any[]) => any;

    declare private _onHide: (...args: any[]) => any;

    declare private _SafeStr_14921: (...args: any[]) => any;

    declare private _configuration: IHabboConfigurationManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _SafeStr_2427: Stage;

    declare private _SafeStr_14922: boolean;
    static { (this.prototype as any)._SafeStr_14922 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_14923: number;
    static { (this.prototype as any)._SafeStr_14923 = 0; }

    constructor(param1: IWindowContainer, param2: (...args: any[]) => any, param3: (...args: any[]) => any, param4: (...args: any[]) => any, param5: (...args: any[]) => any, param6: IHabboConfigurationManager, param7: IHabboLocalizationManager) {
        this._SafeStr_14919 = param2;
        this._SafeStr_14920 = param3;
        this._onHide = param4;
        this._SafeStr_14921 = param5;
        this._configuration = param6;
        this._localization = param7;
        this._SafeStr_14909 = asGuarded(param1.findChildByName("habbicon_popup_layer"), isIWindowContainer);
        this._popup = param1.findChildByName("habbicon_item_popup");
        this._SafeStr_14910 = asGuarded(param1.findChildByName("habbicon_popup_content_list"), isIItemListWindow);
        this._SafeStr_14911 = asGuarded(param1.findChildByName("habbicon_popup_background"), isIBorderWindow);
        this._popupTitle = asGuarded(param1.findChildByName("habbicon_popup_title"), isITextWindow);
        this._SafeStr_14912 = asGuarded(param1.findChildByName("habbicon_popup_description"), isITextWindow);
        this._SafeStr_14913 = asGuarded(param1.findChildByName("habbicon_popup_action_row"), isIWindowContainer);
        this._SafeStr_14914 = asGuarded(param1.findChildByName("habbicon_popup_action_button"), isIButtonWindow);
        this._SafeStr_14915 = asGuarded(param1.findChildByName("habbicon_popup_bottom_bar"), isIBorderWindow);
        this._SafeStr_14916 = asGuarded(param1.findChildByName("habbicon_popup_price"), isITextWindow);
        this._SafeStr_14917 = asGuarded(param1.findChildByName("habbicon_popup_currency_icon"), isIIconWindow);
        this._SafeStr_14918 = asGuarded(param1.findChildByName("habbicon_popup_buy_button"), isIButtonWindow);
        if (this._SafeStr_14914) {
            this._SafeStr_14914.addEventListener("WME_CLICK", this.onPopupActionClicked);
        }
        if (this._SafeStr_14918) {
            this._SafeStr_14918.addEventListener("WME_CLICK", this.onPopupBuyClicked);
        }
        this.hide(false);
    }

    public showForTile(param1: HabbiconTileView): void {
        if (!param1 || !param1.item || !this._popup || !this._SafeStr_14909) {
            return;
        }
        this._SafeStr_14882 = param1;
        let _loc2_: string = HabbiconPopupMode.resolve(param1.item);
        this.configurePopup(param1.item, _loc2_);
        this._popup.visible = true;
        this.arrangePopupLists();
        this.positionPopup(param1);
        this._popup.invalidate();
        this._SafeStr_14923 = getTimer() + 75;
    }

    public hide(param1: boolean = true): void {
        let _loc2_: boolean = this._popup != null && this._popup.visible;
        if (this._popup) {
            this._popup.visible = false;
        }
        this._SafeStr_14882 = null;
        if (param1 && _loc2_ && this._onHide != null) {
            this._onHide();
        }
    }

    public attachToDesktop(param1: IDesktopWindow): void {
        if (this._SafeStr_14922 || !param1) {
            return;
        }
        let _loc2_: DisplayObject = param1.getDisplayObject();
        if (!_loc2_ || !_loc2_.stage) {
            return;
        }
        this._SafeStr_2427 = _loc2_.stage;
        this._SafeStr_2427.addEventListener("mouseDown", this.onStageMouseDown, false, 0, true);
        this._SafeStr_2427.addEventListener("mouseWheel", this.onStageMouseWheel, true, 0, true);
        this._SafeStr_14922 = true;
    }

    public detachFromStage(): void {
        if (this._SafeStr_14922 && this._SafeStr_2427) {
            this._SafeStr_2427.removeEventListener("mouseDown", this.onStageMouseDown);
            this._SafeStr_2427.removeEventListener("mouseWheel", this.onStageMouseWheel, true);
        }
        this._SafeStr_14922 = false;
        this._SafeStr_2427 = null;
    }

    public get visible(): boolean {
        return this._popup != null && this._popup.visible;
    }

    public get activeTile(): HabbiconTileView {
        return this._SafeStr_14882;
    }

    private configurePopup(param1: HabbiconEntryModel, param2: string): void {
        if (!this._popup || !this._popupTitle || !this._SafeStr_14914 || !this._SafeStr_14913 || !this._SafeStr_14915 || !this._SafeStr_14912) {
            return;
        }
        this._popupTitle.caption = param1 && param1.name && param1.name.length > 0 ? param1.name : "Habbicon";
        let _loc3_: boolean = param2 == "purchase" || param2 == "info";
        let _loc4_: boolean = param2 == "purchase";
        let _loc5_: boolean = !_loc4_ && param2 != "info";
        this._SafeStr_14912.visible = _loc3_;
        this._SafeStr_14915.visible = _loc4_;
        this._SafeStr_14913.visible = _loc5_;
        if (_loc3_) {
            this._SafeStr_14912.caption = this.resolveDescription(param1, param2);
        }
        let _loc6_: string = "";
        switch (param2) {
            case "claim":
                _loc6_ = this.localize("habbicon_reward.claim", "Claim");
                this._SafeStr_14914.color = 106753;
                break;
            case "remove_favorite":
                _loc6_ = this.localize("habbicon.favourite.remove", "Remove from favourites");
                this._SafeStr_14914.color = 7995440;
                break;
            case "add_favorite":
                _loc6_ = this.localize("habbicon.favourite.add", "Add to favourites");
                this._SafeStr_14914.color = 106753;
                break;
            default:
                if (this._SafeStr_14916) {
                    this._SafeStr_14916.caption = param1 ? this.formatPrice(param1.priceCredits, param1.priceActivityPoints) : "0";
                }
                if (this._SafeStr_14917 && param1 != null) {
                    this._SafeStr_14917.style = this.getPriceIconStyle(param1.priceCredits, param1.priceActivityPoints, param1.activityPointType) >>> 0;
                    this._SafeStr_14917.fitToSize();
                }
        }
        if (_loc5_) {
            this._SafeStr_14914.caption = _loc6_;
        }
    }

    private arrangePopupLists(): void {
        if (this._SafeStr_14910) {
            this._SafeStr_14910.arrangeListItems();
        }
        let _loc1_: IItemListWindow = isIItemListWindow(this._popup) ? this._popup : null;
        if (_loc1_) {
            _loc1_.arrangeListItems();
        }
    }

    private positionPopup(param1: HabbiconTileView): void {
        if (!param1 || !param1.window || !this._popup || !this._SafeStr_14909) {
            return;
        }
        let _loc6_: Rectangle = new Rectangle();
        param1.window.getGlobalRectangle(_loc6_);
        let _loc7_: Rectangle = new Rectangle();
        this._SafeStr_14909.getGlobalRectangle(_loc7_);
        let _loc5_: number = _loc6_.x - _loc7_.x + (_loc6_.width - this._popup.width) * 0.5 | 0;
        let _loc3_: number = Math.max(4, this._SafeStr_14909.width - this._popup.width - 4) | 0;
        _loc5_ = Math.max(4, Math.min(_loc3_, _loc5_)) | 0;
        let _loc4_: number = _loc6_.y - _loc7_.y - this._popup.height + 2 | 0;
        let _loc2_: number = Math.max(0, this._SafeStr_14909.height - this._popup.height) | 0;
        _loc4_ = Math.max(0, Math.min(_loc2_, _loc4_)) | 0;
        this._popup.x = _loc5_;
        this._popup.y = _loc4_;
    }

    private onPopupActionClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14919 != null && this._SafeStr_14882 && this._SafeStr_14882.item) {
            this._SafeStr_14919(this._SafeStr_14882, HabbiconPopupMode.resolve(this._SafeStr_14882.item));
        }
    };

    private onPopupBuyClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14920 != null && this._SafeStr_14882 && this._SafeStr_14882.item) {
            this._SafeStr_14920(this._SafeStr_14882);
        }
    };

    private resolveDescription(param1: HabbiconEntryModel, param2: string): string {
        if (param1 == null) {
            return this.localize("habbicon.popup.desc.not_owned", "Not owned");
        }
        if (param2 == "purchase") {
            return this.localize("habbicon.popup.desc.not_owned", "Not owned");
        }
        if (param2 == "info" && param1.isReward) {
            if (param1.owned || param1.favorite) {
                return this.localize("generic.owned", "Owned");
            }
            if (param1.claimable) {
                return this.localize("habbicon_reward.claim", "Claim");
            }
            return this.localize("habbicon.popup.desc.locked", "Locked");
        }
        if (param1.owned || param1.favorite) {
            return this.localize("generic.owned", "Owned");
        }
        return this.localize("habbicon.popup.desc.not_owned", "Not owned");
    }

    private onStageMouseDown = (param1: MouseEvent): void => {
        if (!this.visible) {
            return;
        }
        if (getTimer() <= this._SafeStr_14923) {
            return;
        }
        let _loc2_: Point = new Point(param1.stageX, param1.stageY);
        if (this.isPointInsideWindow(this._popup, _loc2_)) {
            return;
        }
        if (this._SafeStr_14921 != null && this._SafeStr_14921(_loc2_)) {
            return;
        }
        this.hide();
    };

    private onStageMouseWheel = (param1: MouseEvent): void => {
        if (this.visible) {
            this.hide();
        }
    };

    private isPointInsideWindow(param1: IWindow, param2: Point): boolean {
        if (!param1 || !param2) {
            return false;
        }
        let _loc3_: Rectangle = new Rectangle();
        param1.getGlobalRectangle(_loc3_);
        return _loc3_.containsPoint(param2);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.hide(false);
        this.detachFromStage();
        if (this._SafeStr_14914) {
            this._SafeStr_14914.removeEventListener("WME_CLICK", this.onPopupActionClicked);
        }
        if (this._SafeStr_14918) {
            this._SafeStr_14918.removeEventListener("WME_CLICK", this.onPopupBuyClicked);
        }
        this._SafeStr_14909 = null;
        this._popup = null;
        this._SafeStr_14911 = null;
        this._SafeStr_14910 = null;
        this._popupTitle = null;
        this._SafeStr_14912 = null;
        this._SafeStr_14913 = null;
        this._SafeStr_14914 = null;
        this._SafeStr_14915 = null;
        this._SafeStr_14916 = null;
        this._SafeStr_14917 = null;
        this._SafeStr_14918 = null;
        this._SafeStr_14882 = null;
        this._SafeStr_14919 = null;
        this._SafeStr_14920 = null;
        this._onHide = null;
        this._SafeStr_14921 = null;
        this._configuration = null;
        this._localization = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private formatPrice(param1: number, param2: number): string {
        if (param1 > 0 && param2 > 0) {
            return param1 + "c + " + param2;
        }
        if (param1 > 0) {
            return param1.toString();
        }
        return Math.max(0, param2).toString();
    }

    private getPriceIconStyle(param1: number, param2: number, param3: number): number {
        let _loc4_: number = param2 > 0 ? param3 : 7;
        return ActivityPointTypeEnum.getIconStyleFor(_loc4_, this._configuration, false);
    }

    private localize(param1: string, param2: string): string {
        let _loc3_: string = this._localization != null ? this._localization.getLocalization(param1, param2) : param2;
        return _loc3_ != null && _loc3_.length > 0 ? _loc3_ : param2;
    }

    get [IDisposable](): true {
        return true;
    }
}
