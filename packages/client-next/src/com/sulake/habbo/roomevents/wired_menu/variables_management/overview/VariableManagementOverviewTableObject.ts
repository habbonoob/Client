import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredUserVariablesElement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesElement';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { VariableManagementOverviewController } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementOverviewController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { WiredGetUserPermanentVariablesComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/variables_management/WiredGetUserPermanentVariablesComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { VariableValueTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_inspection/VariableValueTableObject.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class VariableManagementOverviewTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.variables_management.overview::VariableManagementOverviewTableObject'); }

    declare private _controller: VariableManagementOverviewController;

    declare private _element: WiredUserVariablesElement;

    declare private _variable: WiredVariable;

    constructor(param1: VariableManagementOverviewController, param2: WiredUserVariablesElement, param3: WiredVariable) {
        this._controller = param1;
        this._element = param2;
        this._variable = param3;
    }

    public get identifier(): string {
        return this._element.entityType + "-" + this._element.entityId;
    }

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case "usertype":
                return new TableCell(TableCell._SafeStr_2166, this.localize("wiredfurni.params.usertype." + this._element.entityType));
            case "name":
                if (this._element.entityType == 1) {
                    return new TableCell(TableCell._SafeStr_3709, this._element.entityName, false, true, null, this.onClickUsername);
                }
                return new TableCell(TableCell._SafeStr_2166, this._element.entityName, false, true);
                break;
            case "creation_time":
                return new TableCell(TableCell._SafeStr_2166, this._element.storage.creationTimeStr, false, true);
            case "last_update_time":
                return new TableCell(TableCell._SafeStr_2166, this._element.storage.lastUpdateTimeStr, false, true);
            case "value":
                return VariableValueTableObject.createVariableValueCell(this._variable, this._element.storage.value, this._controller.roomEvents, false, false);
            case "manage":
                return new TableCell(TableCell._SafeStr_3709, this.localize("wiredmenu.variable_management.manage"), false, false, null, this.onClickManage);
            default:
                return null;
        }
    }

    private onClickUsername = (): void => {
        this._controller.send(new GetExtendedProfileMessageComposer(this._element.entityId, true));
    };

    private onClickManage = (): void => {
        this._controller.send(new WiredGetUserPermanentVariablesComposer(this._element.entityType, this._element.entityId));
    };

    private localize(param1: string): string {
        return this.localization.getLocalization(param1);
    }

    private get localization(): IHabboLocalizationManager {
        return this._controller.localizationManager;
    }

    public get element(): WiredUserVariablesElement {
        return this._element;
    }

    public get variable(): WiredVariable {
        return this._variable;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: VariableManagementOverviewTableObject = param2 instanceof VariableManagementOverviewTableObject ? param2 : null;
        if (param1 == "creation_time") {
            return this._element.storage.creationTime != _loc3_.element.storage.creationTime;
        }
        if (param1 == "last_update_time") {
            return this._element.storage.lastUpdateTime != _loc3_.element.storage.lastUpdateTime;
        }
        if (param1 == "value") {
            return this._element.storage.value != _loc3_.element.storage.value || this._variable.hasValue != _loc3_.variable.hasValue;
        }
        return false;
    }

    public isUpdated(param1: any): boolean {
        return this.isPropertyUpdated("creation_time", param1) || this.isPropertyUpdated("last_update_time", param1) || this.isPropertyUpdated("value", param1);
    }
}
