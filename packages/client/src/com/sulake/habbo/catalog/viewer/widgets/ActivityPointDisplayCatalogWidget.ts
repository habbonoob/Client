import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PurseUpdateEvent } from '@/com/sulake/habbo/catalog/purse/PurseUpdateEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class ActivityPointDisplayCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::ActivityPointDisplayCatalogWidget'); }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public override dispose(): void {
        let _loc1_: HabboCatalog = castTo(this.page.viewer.catalog, HabboCatalog);
        _loc1_.events.removeEventListener("catalog_purse_update", this.onPurseUpdate);
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("activityPointDisplayWidget");
        this._window.findChildByName("activity_points_txt").caption = "";
        let _loc1_: HabboCatalog = castTo(this.page.viewer.catalog, HabboCatalog);
        _loc1_.events.addEventListener("catalog_purse_update", this.onPurseUpdate);
        return this.updateAmount();
    }

    private updateAmount(): boolean {
        if (this.disposed) {
            return false;
        }
        if (this._window == null) {
            return false;
        }
        let _loc3_: number = this.getActivityPointType();
        if (_loc3_ < 1 || !ActivityPointTypeEnum.isVisible(_loc3_)) {
            this._window.visible = false;
            return false;
        }
        let _loc1_: HabboCatalog = castTo(this.page.viewer.catalog, HabboCatalog);
        let _loc2_: string = "catalog.purchase.youractivitypoints";
        _loc1_.localization.registerParameter(_loc2_, "activitypoints", "" + _loc1_.getPurse().getActivityPointsForType(_loc3_));
        _loc1_.localization.registerParameter(_loc2_, "currencyname", _loc1_.getActivityPointName(_loc3_));
        this._window.findChildByName("activity_points_txt").caption = _loc1_.localization.getLocalization(_loc2_);
        let _loc4_: IWindow = this._window.findChildByName("activity_point_icon");
        _loc4_.style = ActivityPointTypeEnum.getIconStyleFor(_loc3_, _loc1_, true) >>> 0;
        this._window.visible = true;
        return true;
    }

    private getActivityPointType(): number {
        if (this.page == null || this.page.offers == null) {
            return 0;
        }
        for (const _loc1_ of this.page.offers ?? []) {
            if (_loc1_.activityPointType > 0) {
                return _loc1_.activityPointType;
            }
        }
        return 0;
    }

    private onPurseUpdate = (param1: PurseUpdateEvent): void => {
        this.updateAmount();
    };
}
