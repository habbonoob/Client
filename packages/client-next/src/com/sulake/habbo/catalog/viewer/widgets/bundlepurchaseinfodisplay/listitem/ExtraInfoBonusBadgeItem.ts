import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoListItem';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class ExtraInfoBonusBadgeItem extends ExtraInfoListItem implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay.listitem::ExtraInfoBonusBadgeItem'); }

    declare private _catalog: HabboCatalog;

    constructor(param1: number, param2: ExtraInfoItemData, param3: HabboCatalog) {
        super(null, param1, param2, 0);
        this._catalog = param3;
    }

    public override getRenderedWindow(): IWindowContainer {
        return null;
    }

    public imageReady(param1: number, param2: BitmapData): void {
    }

    public imageFailed(param1: number): void {
    }

    get [IGetImageListener](): true {
        return true;
    }
}
