import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import { CatalogPromoWidget } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';

export class CatalogPromoWidgetSmall extends CatalogPromoWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::CatalogPromoWidgetSmall'); }

    constructor(param1: HabboLandingView) {
        super(param1);
    }

    protected override get xmlAssetName(): string {
        return "catalog_promo_small";
    }
}
