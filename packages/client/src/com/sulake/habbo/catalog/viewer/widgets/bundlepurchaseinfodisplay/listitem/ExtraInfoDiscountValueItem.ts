import { castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalogUtils } from '@/com/sulake/habbo/catalog/HabboCatalogUtils';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { UpdateableExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/UpdateableExtraInfoListItem';

export class ExtraInfoDiscountValueItem extends UpdateableExtraInfoListItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay.listitem::ExtraInfoDiscountValueItem'); }

    private static readonly ELEMENT_SPLASH_STAR: string = "icon_splash_bitmap";
    private static readonly _SafeStr_7586: string = "icon_bitmap";
    private static readonly _SafeStr_8325: string = "total_currency_value_left";
    private static readonly _SafeStr_7604: string = "total_currency_icon_left";
    private static readonly ELEMENT_TOTAL_LEFT_CURRENCY_STRIKETHROUGH: string = "striketrough_total_currency_left";
    private static readonly _SafeStr_8640: string = "total_currency_value_right";
    private static readonly _SafeStr_8362: string = "total_currency_icon_right";
    private static readonly ELEMENT_TOTAL_RIGHT_CURRENCY_STRIKETHROUGH: string = "striketrough_total_currency_right";
    private static readonly _SafeStr_8116: string = "discount_currency_value_left";
    private static readonly _SafeStr_7641: string = "discount_currency_icon_left";
    private static readonly _SafeStr_8650: string = "discount_currency_value_right";
    private static readonly _SafeStr_8744: string = "discount_currency_icon_right";
    private static readonly STRIKETHROUGH_LEFT_MARGIN: number = 4;
    private static readonly STRIKETHROUGH_RIGHT_MARGIN: number = 20;

    constructor(param1: number, param2: ExtraInfoItemData, param3: HabboCatalog) {
        super(null, param1, param2, 1, true);
        this._catalog = param3;
        this._SafeStr_3739 = new Timer(150);
        this._SafeStr_3739.addEventListener("timer", this.starAnimationTimerEvent);
    }

    private _window: IWindowContainer = null;
    private _dirty: boolean = true;

    declare private _catalog: HabboCatalog;

    private _starAnimationOffset: number = 0;

    declare private _SafeStr_3739: Timer;

    declare private _SafeStr_4382: boolean;
    static { (this.prototype as any)._SafeStr_4382 = false; }

    declare private _SafeStr_4046: boolean;
    static { (this.prototype as any)._SafeStr_4046 = false; }

    declare private _SafeStr_5495: boolean;
    static { (this.prototype as any)._SafeStr_5495 = false; }

    private _SafeStr_6876: boolean = false;

    public override dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_3739 != null) {
                this._SafeStr_3739.stop();
                this._SafeStr_3739 = null;
            }
            this._catalog = null;
            super.dispose();
        }
    }

    public override update(param1: ExtraInfoItemData): void {
        super.update(param1);
        this._SafeStr_4382 = false;
        this._SafeStr_4046 = false;
        this._SafeStr_5495 = false;
        if (param1.priceCredits > 0 && param1.priceActivityPoints > 0) {
            this._SafeStr_4382 = true;
        } else if (param1.priceActivityPoints > 0 && param1.priceCredits == 0) {
            this._SafeStr_5495 = true;
        } else {
            this._SafeStr_4046 = true;
        }
        this._dirty = true;
        this.render();
        if (!this._SafeStr_6876) {
            this.setCurrencyIcons();
        }
    }

    public override getRenderedWindow(): IWindowContainer {
        if (this._dirty) {
            this.render();
        }
        return this._window;
    }

    private createWindow(): void {
        this._window = castGuarded(this._catalog.utils.createWindow("discountValueItem"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.setElementBitmap("icon_bitmap", "thumb_up");
        this.startSplashAnimation();
    }

    private render(): void {
        if (this._window == null) {
            this.createWindow();
        }
        this.updateColumns();
        this.updatePriceIndicators();
        this.updateStrikeThroughElements();
        this._dirty = false;
    }

    private updateColumns(): void {
        if (this._SafeStr_5495 || this._SafeStr_4046) {
            this.setLeftColumnVisibility(false);
        } else {
            this.setLeftColumnVisibility(true);
        }
    }

    private setCurrencyIcons(): void {
        if (this._SafeStr_4382) {
            this.setIconStyle("total_currency_icon_left", -1);
            this.setIconStyle("discount_currency_icon_left", -1);
        }
        if (this._SafeStr_4046) {
            this.setIconStyle("total_currency_icon_right", -1);
            this.setIconStyle("discount_currency_icon_right", -1);
        } else {
            this.setIconStyle("total_currency_icon_right", this.data.activityPointType);
            this.setIconStyle("discount_currency_icon_right", this.data.activityPointType);
        }
        this._SafeStr_6876 = true;
    }

    private updatePriceIndicators(): void {
        if (this._SafeStr_4382) {
            this.setElementText("total_currency_value_left", (this.data.quantity * this.data.priceCredits).toString());
            this.setElementText("discount_currency_value_left", (this.data.quantity * this.data.priceCredits - this.data.discountPriceCredits).toString());
        }
        if (this._SafeStr_4046) {
            this.setElementText("total_currency_value_right", (this.data.quantity * this.data.priceCredits).toString());
            this.setElementText("discount_currency_value_right", (this.data.quantity * this.data.priceCredits - this.data.discountPriceCredits).toString());
        } else {
            this.setElementText("total_currency_value_right", (this.data.quantity * this.data.priceActivityPoints).toString());
            this.setElementText("discount_currency_value_right", (this.data.quantity * this.data.priceActivityPoints - this.data.discountPriceActivityPoints).toString());
        }
    }

    private updateStrikeThroughElements(): void {
        let _loc4_: ITextWindow = castGuarded(this._window.findChildByName("total_currency_value_left"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc2_: number = _loc4_.x + _loc4_.width - _loc4_.textWidth | 0;
        let _loc5_: IWindowContainer = castGuarded(this._window.findChildByName("striketrough_total_currency_left"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc5_.x = _loc2_ - 4;
        _loc5_.width = 4 + _loc4_.textWidth + 20 | 0;
        let _loc1_: ITextWindow = castGuarded(this._window.findChildByName("total_currency_value_right"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc3_: number = _loc1_.x + _loc1_.width - _loc1_.textWidth | 0;
        let _loc6_: IWindowContainer = castGuarded(this._window.findChildByName("striketrough_total_currency_right"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc6_.x = _loc3_ - 4;
        _loc6_.width = 4 + _loc1_.textWidth + 20 | 0;
    }

    private setElementText(param1: string, param2: string): void {
        this._window.findChildByName(param1).caption = param2;
    }

    private setElementBitmap(param1: string, param2: string): void {
        let _loc4_: IBitmapWrapperWindow = castGuarded(this._window.findChildByName(param1), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc3_: BitmapData = castTo(this._catalog.assets.getAssetByName(param2).content, BitmapData);
        HabboCatalogUtils.replaceCenteredImage(_loc4_, _loc3_);
    }

    private setIconStyle(param1: string, param2: number): void {
        let _loc3_: IWindow = this._window.findChildByName(param1);
        _loc3_.style = ActivityPointTypeEnum.getIconStyleFor(param2, this._catalog, false) >>> 0;
    }

    private setLeftColumnVisibility(param1: boolean): void {
        let _loc2_: any[] = ["discount_currency_icon_left", "discount_currency_value_left", "total_currency_icon_left", "striketrough_total_currency_left", "total_currency_value_left"];
        for (const _loc3_ of _loc2_ ?? []) {
            this._window.findChildByName(stringOrNull(_loc3_)).visible = param1;
        }
    }

    private startSplashAnimation(): void {
        let _loc1_: IBitmapWrapperWindow = castGuarded(this._window.findChildByName("icon_splash_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc1_.bitmap = new BitmapData(_loc1_.width, _loc1_.height, true, 0);
        this.starAnimationTimerEvent(new TimerEvent("timer"));
        this._SafeStr_3739.start();
    }

    private starAnimationTimerEvent = (param1: TimerEvent): void => {
        let _loc2_: IBitmapWrapperWindow = null;
        let _loc3_: IAsset = null;
        if (this._window != null) {
            _loc2_ = castGuarded(this._window.findChildByName("icon_splash_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            _loc3_ = this._catalog.assets.getAssetByName("bundle_discount_star_" + this._starAnimationOffset);
            HabboCatalogUtils.replaceCenteredImage(_loc2_, castTo(_loc3_.content, BitmapData), castTo(_loc3_, BitmapDataAsset).rectangle);
            if (++this._starAnimationOffset > 7) {
                this._starAnimationOffset = 0;
            }
        }
    };
}
