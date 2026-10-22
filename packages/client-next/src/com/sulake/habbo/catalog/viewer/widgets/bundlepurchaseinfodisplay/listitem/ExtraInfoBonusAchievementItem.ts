import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { ExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoListItem';

export class ExtraInfoBonusAchievementItem extends ExtraInfoListItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay.listitem::ExtraInfoBonusAchievementItem'); }

    constructor(param1: number, param2: ExtraInfoItemData) {
        super(null, param1, param2, 0);
    }

    public override getRenderedWindow(): IWindowContainer {
        return null;
    }
}
