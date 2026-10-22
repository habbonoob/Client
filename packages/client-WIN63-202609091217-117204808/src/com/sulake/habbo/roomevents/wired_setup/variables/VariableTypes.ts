import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import { VariableDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/VariableDefinition';
import { ContextVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/ContextVariable';
import { DailyTaskVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/DailyTaskVariable';
import { EchoVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/EchoVariable';
import { FurniVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/FurniVariable';
import { GlobalVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/GlobalVariable';
import { QuestChainVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/QuestChainVariable';
import { QuestVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/QuestVariable';
import { ReferenceVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/ReferenceVariable';
import { UserVariable } from '@/com/sulake/habbo/roomevents/wired_setup/variables/UserVariable';

export class VariableTypes implements ElementTypeHolder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::VariableTypes'); }

    private _types: any[] = [];

    constructor() {
        this._types.push(new FurniVariable());
        this._types.push(new UserVariable());
        this._types.push(new GlobalVariable());
        this._types.push(new ContextVariable());
        this._types.push(new ReferenceVariable());
        this._types.push(new QuestVariable());
        this._types.push(new QuestChainVariable());
        this._types.push(new EchoVariable());
        this._types.push(new DailyTaskVariable());
    }

    public getElementByCode(param1: number): Element {
        for (const _loc2_ of this._types ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getKey(): string {
        return "variable";
    }

    public acceptTriggerable(param1: Triggerable): boolean {
        return (param1 instanceof VariableDefinition ? param1 : null) != null;
    }
}
