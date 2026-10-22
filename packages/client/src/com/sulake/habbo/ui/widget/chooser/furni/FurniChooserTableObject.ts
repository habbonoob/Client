import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChooserItem } from '@/com/sulake/habbo/ui/widget/chooser/ChooserItem';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { FurniView__com_sulake_habbo_ui_widget_chooser_furni as FurniView } from '@/com/sulake/habbo/ui/widget/chooser/furni/FurniChooserTableObject.group';
import { FurniId } from '@/com/sulake/habbo/utils/FurniId';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class FurniChooserTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser.furni::FurniChooserTableObject'); }

    constructor(param1: ChooserItem) {
        this._chooserItem = param1;
    }

    declare private _chooserItem: ChooserItem;

    public get chooserItem(): ChooserItem {
        return this._chooserItem;
    }

    public get identifier(): string {
        return this._chooserItem.category + "-" + this._chooserItem.id;
    }

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case FurniView.COLUMN_FURNI_NAME:
                return new TableCell(TableCell._SafeStr_2166, this._chooserItem.name, false, true);
            case FurniView.COLUMN_FURNI_OWNER:
                if (this._chooserItem.owner == null || FurniId.isBuilderClubId(this._chooserItem.id)) {
                    return new TableCell(TableCell._SafeStr_2166, "-");
                }
                return new TableCell(TableCell._SafeStr_2166, this._chooserItem.owner, false, true);
                break;
            case FurniView.COLUMN_ID:
                return new TableCell(TableCell._SafeStr_2166, this._chooserItem.id + "", false, true);
            default:
                return null;
        }
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        return false;
    }

    public isUpdated(param1: any): boolean {
        return false;
    }
}
