import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class CreditHabbletButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::CreditHabbletButtonElementHandler'); }

    constructor() {
        super();
    }

    protected override onClick(): void {
        this.landingView.catalog.openCreditsHabblet();
        this.landingView.tracking.trackGoogle("landingView", "click_credithabblet");
    }
}
