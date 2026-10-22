import { castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { BundlePurchaseExtraInfoWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundlePurchaseExtraInfoWidget';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalogUtils } from '@/com/sulake/habbo/catalog/HabboCatalogUtils';
import { UpdateableExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/UpdateableExtraInfoListItem';
import { CatalogWidgetBundleDisplayExtraInfoEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetBundleDisplayExtraInfoEvent';

export class ExtraInfoPromoItem extends UpdateableExtraInfoListItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay.listitem::ExtraInfoPromoItem'); }

    private static readonly _SafeStr_7627: string = "catalog.bundlewidget.discount.promo";
    private _window: IWindowContainer = null;
    private _dirty: boolean = true;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_3952: UtilsMap;

    private _SafeStr_4736: number = 0;

    declare private _widget: BundlePurchaseExtraInfoWidget;

    private _SafeStr_3290: number = 0;

    declare private _SafeStr_3585: Timer;

    constructor(param1: BundlePurchaseExtraInfoWidget, param2: number, param3: ExtraInfoItemData, param4: HabboCatalog) {
        super(null, param2, param3, 0);
        this._widget = param1;
        this._catalog = param4;
        this.createNextDiscountMap();
        this.resolveNextDiscountLevel();
        this._SafeStr_3585 = new Timer(50);
        this._SafeStr_3585.addEventListener("timer", this.onEffectTimer);
        this._SafeStr_3585.start();
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._SafeStr_3585.stop();
            this._SafeStr_3585.removeEventListener("timer", this.onEffectTimer);
            this._SafeStr_3585 = null;
            this._SafeStr_3952 = null;
            this._catalog = null;
            super.dispose();
        }
    }

    public override update(param1: ExtraInfoItemData): void {
        super.update(param1);
        let _loc2_: number = this._SafeStr_4736;
        this.resolveNextDiscountLevel();
        if (this._SafeStr_4736 != _loc2_) {
            this._SafeStr_3290 = 1;
        }
        this._dirty = true;
        this.render();
    }

    public override getRenderedWindow(): IWindowContainer {
        if (this._window == null) {
            this.createWindow();
        }
        if (this._dirty) {
            this.render();
        }
        return this._window;
    }

    private createWindow(): void {
        this._window = castGuarded(this._catalog.utils.createWindow("discountPromoItem"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.procedure = this.windowProcedure;
        let _loc1_: IBitmapWrapperWindow = castGuarded(this._window.findChildByName("icon_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        HabboCatalogUtils.replaceCenteredImage(_loc1_, castTo(this._catalog.assets.getAssetByName("thumb_up").content, BitmapData).clone());
    }

    private render(): void {
        this._catalog.localization.registerParameter("catalog.bundlewidget.discount.promo", "quantity", this._SafeStr_4736.toString());
        this._catalog.localization.registerParameter("catalog.bundlewidget.discount.promo", "discount", stringOrNull(this._SafeStr_3952.getValue(this._SafeStr_4736)));
        let _loc1_: string = this._catalog.localization.getLocalizationRaw("catalog.bundlewidget.discount.promo").value;
        this._window.findChildByName("promo_text").caption = _loc1_;
        this._window.findChildByName("promo_text_effect").caption = _loc1_;
        this._dirty = false;
    }

    private resolveNextDiscountLevel(): void {
        let _loc2_: number = 0;
        let _loc1_: any[] = this._SafeStr_3952.getKeys();
        _loc2_ = 0;
        while (_loc2_ < _loc1_.length) {
            if ((_loc1_[_loc2_] | 0) > this.data.quantity) {
                this._SafeStr_4736 = _loc1_[_loc2_] | 0;
                break;
            }
            _loc2_++;
        }
    }

    private createNextDiscountMap(): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc1_: number = 0;
        this._SafeStr_3952 = new UtilsMap();
        _loc2_ = 1;
        _loc3_ = 0;
        while (_loc2_ <= 100) {
            _loc4_ = this._catalog.utils.calculateBundlePrice(true, 1, _loc2_);
            _loc1_ = _loc2_ - _loc4_;
            if (_loc1_ > _loc3_ && this._catalog.utils.bundleDiscountFlatPriceSteps.indexOf(_loc2_) == -1) {
                this._SafeStr_3952.add(_loc2_, _loc1_);
                _loc3_ = _loc1_;
            }
            _loc2_++;
        }
    }

    private onEffectTimer = (param1: TimerEvent): void => {
        if (this._SafeStr_3290 > 0) {
            this._SafeStr_3290 -= 0.1;
            if (this._SafeStr_3290 < 0) {
                this._SafeStr_3290 = 0;
            }
            this._window.findChildByName("promo_text_effect").blend = this._SafeStr_3290;
        }
    };

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param2.name == "click_region") {
            switch (param1.type) {
                case "WME_CLICK":
                    this._widget.events.dispatchEvent(new CatalogWidgetBundleDisplayExtraInfoEvent("CWPPEIE_ITEM_CLICKED", this.data, this.id));
                    break;
                case "WME_OVER":
                    castGuarded(this._window.findChildByName("promo_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 12582911;
                    break;
                case "WME_OUT":
                    castGuarded(this._window.findChildByName("promo_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16777215;
            }
        }
    };
}
