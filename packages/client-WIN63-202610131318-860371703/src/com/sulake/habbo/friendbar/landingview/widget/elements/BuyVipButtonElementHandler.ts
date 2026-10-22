import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class BuyVipButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::BuyVipButtonElementHandler'); }

    constructor() {
        super();
    }

    protected override onClick(): void {
        this.landingView.catalog.openClubCenter();
        this.landingView.tracking.trackGoogle("landingView", "click_buyVip");
    }
}
