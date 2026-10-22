import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class CatalogButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::CatalogButtonElementHandler'); }

    declare private _pageName: string;

    constructor() {
        super();
    }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        this._pageName = stringOrNull(param3[2]);
    }

    protected override onClick(): void {
        if (this._pageName) {
            this.landingView.catalog.openCatalogPage(this._pageName);
        } else {
            this.landingView.catalog.openCatalog();
        }
        this.landingView.tracking.trackGoogle("landingView", "click_genericcatalog");
    }
}
