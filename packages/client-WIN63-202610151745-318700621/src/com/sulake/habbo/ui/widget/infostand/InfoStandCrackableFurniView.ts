import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { RoomWidgetFurniInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFurniInfoUpdateEvent';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { CrackableStuffData } from '@/com/sulake/habbo/room/object/data/CrackableStuffData';
import { InfoStandFurniView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandFurniView';

export class InfoStandCrackableFurniView extends InfoStandFurniView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandCrackableFurniView'); }

    constructor(param1: InfoStandWidget, param2: string, param3: IHabboCatalog) {
        super(param1, param2, param3);
    }

    public override update(param1: RoomWidgetFurniInfoUpdateEvent): void {
        super.update(param1);
        let _loc2_: CrackableStuffData = asInstanceOf(param1.stuffData, CrackableStuffData);
        this.showButton("use", true);
        this._buttons.visible = true;
        this.setHitsAndTarget(_loc2_.hits, _loc2_.target);
    }

    private setHitsAndTarget(param1: number, param2: number): void {
        let _loc3_: IWindow = this._SafeStr_2212.getListItemByName("hits_remaining");
        if (_loc3_ == null) {
            return;
        }
        this._widget.localizations.registerParameter("infostand.crackable_furni.hits_remaining", "hits", String(param1));
        this._widget.localizations.registerParameter("infostand.crackable_furni.hits_remaining", "target", String(param2));
        _loc3_.visible = true;
        this.updateWindow();
    }

    protected override createWindow(param1: string): void {
        let _loc2_: IWindow = null;
        let _loc5_: number = 0;
        let _loc4_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("crackable_furni_view"), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIItemListWindow);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._border = asGuarded(this._window.getListItemByName("info_border"), isIBorderWindow);
        this._buttons = asGuarded(this._window.getListItemByName("button_list"), isIItemListWindow);
        if (this._border != null) {
            this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
        }
        this._window.name = param1;
        this._widget.mainContainer.addChild(this._window);
        let _loc3_: IWindow = this._border.findChildByTag("close");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onClose);
        }
        if (this._buttons != null) {
            _loc5_ = 0;
            while (_loc5_ < this._buttons.numListItems) {
                _loc2_ = this._buttons.getListItemAt(_loc5_ >>> 0);
                _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
                _loc5_++;
            }
        }
        this._SafeStr_2445 = this._border.findChildByTag("catalog");
        if (this._SafeStr_2445 != null) {
            this._SafeStr_2445.addEventListener("WME_CLICK", this.onCatalogButtonClicked);
        }
        this._SafeStr_2457 = this._border.findChildByName("rent_button");
        if (this._SafeStr_2457 != null) {
            this._SafeStr_2457.addEventListener("WME_CLICK", this.onRentButtonClicked);
        }
        this._SafeStr_2436 = this._border.findChildByName("extend_button");
        if (this._SafeStr_2436 != null) {
            this._SafeStr_2436.addEventListener("WME_CLICK", this.onExtendButtonClicked);
        }
        this._SafeStr_2432 = this._border.findChildByName("buyout_button");
        if (this._SafeStr_2432 != null) {
            this._SafeStr_2432.addEventListener("WME_CLICK", this.onBuyoutButtonClicked);
        }
        let _loc6_: IRegionWindow = asGuarded(this._SafeStr_2212.getListItemByName("owner_region"), isIRegionWindow);
        if (_loc6_ != null) {
            _loc6_.addEventListener("WME_CLICK", this.onOwnerRegion);
            _loc6_.addEventListener("WME_OVER", this.onOwnerRegion);
            _loc6_.addEventListener("WME_OUT", this.onOwnerRegion);
        }
    }
}
