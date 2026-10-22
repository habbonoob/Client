import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableNode {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker.overview::VariableNode'); }

    constructor(param1: WiredVariable, param2: string) {
        this._variable = param1;
        this._name = param2;
        this._children = new UtilsMap();
    }

    declare private _variable: WiredVariable;

    declare private _children: UtilsMap;

    public get children(): VariableNode[] {
        return Array.from(this._children.getValues());
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get variable(): WiredVariable {
        return this._variable;
    }

    public get childrenCount(): number {
        return this._children.length | 0;
    }

    public getChildNodeByName(param1: string): VariableNode {
        return this._children.getValue(param1);
    }

    public addChildNode(param1: VariableNode): void {
        this._children.add(param1.name, param1);
    }

    public flatten(param1: boolean = false): boolean {
        let _loc3_: VariableNode = null;
        if (this._children.length == 1 && this._variable == null) {
            _loc3_ = this._children.getValues()[0];
            if (_loc3_.flatten()) {
                this._variable = _loc3_.variable;
                this._children = new UtilsMap();
            }
        }
        let _loc2_: boolean = this._variable != null && this._children.length == 0;
        if (param1 && _loc2_) {
            this._name = this._variable.variableName;
        }
        return _loc2_;
    }

    public canBeSelected(param1: NewVariablePicker): boolean {
        if (this._variable == null) {
            return false;
        }
        if (param1.variableFilter != null && !param1.variableFilter(this.variable)) {
            return false;
        }
        return true;
    }

    public isDisabled(param1: NewVariablePicker): boolean {
        if (this.canBeSelected(param1)) {
            return false;
        }
        if (this._children) {
            for (const _loc2_ of valuesOf(this._children)) {
                if (!_loc2_.isDisabled(param1)) {
                    return false;
                }
            }
        }
        return true;
    }
}
