import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BundlePurchaseExtraInfoWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundlePurchaseExtraInfoWidget';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { ExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoListItem';

export class UpdateableExtraInfoListItem extends ExtraInfoListItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay::UpdateableExtraInfoListItem'); }

    constructor(param1: BundlePurchaseExtraInfoWidget, param2: number, param3: ExtraInfoItemData, param4: number = 0, param5: boolean = false) {
        super(param1, param2, param3, param4, param5);
    }

    public update(param1: ExtraInfoItemData): void {
        this.data = param1;
    }
}
