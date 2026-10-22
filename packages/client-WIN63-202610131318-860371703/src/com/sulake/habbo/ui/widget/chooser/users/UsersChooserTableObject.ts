import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChooserItem } from '@/com/sulake/habbo/ui/widget/chooser/ChooserItem';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { UsersView } from '@/com/sulake/habbo/ui/widget/chooser/users/UsersChooserTableObject.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class UsersChooserTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser.users::UsersChooserTableObject'); }

    declare private _chooserItem: ChooserItem;

    constructor(param1: ChooserItem) {
        this._chooserItem = param1;
    }

    public get chooserItem(): ChooserItem {
        return this._chooserItem;
    }

    public get identifier(): string {
        return this._chooserItem.type + "-" + this._chooserItem.id;
    }

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case UsersView.COLUMN_USER_NAME:
                return new TableCell(TableCell._SafeStr_2166, this._chooserItem.name, false, true);
            case UsersView.COLUMN_TYPE:
                return new TableCell(TableCell._SafeStr_2166, "${new_user_chooser.usertype." + this._chooserItem.type + "}");
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
