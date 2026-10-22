import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import { SelectorDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/SelectorDefinition';
import { _SafeCls_2024 } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/_SafeCls_2024';
import { FurniByType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/FurniByType';
import { FurniFromSignal } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/FurniFromSignal';
import { FurniInArea } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/FurniInArea';
import { FurniInNeighborhood } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/FurniInNeighborhood';
import { FurniOnFurni } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/FurniOnFurni';
import { FurniWithAltitude } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/FurniWithAltitude';
import { FurniWithVariable } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/FurniWithVariable';
import { RemoteSelector } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/RemoteSelector';
import { UsersByName } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersByName';
import { UsersByType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersByType';
import { UsersFromSignal } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersFromSignal';
import { UsersInArea } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersInArea';
import { UsersInGroup } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersInGroup';
import { UsersInNeighborhood } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersInNeighborhood';
import { UsersInTeam } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersInTeam';
import { UsersOnFurni } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersOnFurni';
import { UsersPerformingAction } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersPerformingAction';
import { UsersWithHanditem } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersWithHanditem';
import { UsersWithVariable } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/UsersWithVariable';

export class SelectorTypes implements ElementTypeHolder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::SelectorTypes'); }

    constructor() {
        this._types.push(new FurniByType());
        this._types.push(new _SafeCls_2024());
        this._types.push(new UsersByType());
        this._types.push(new UsersInTeam());
        this._types.push(new FurniOnFurni());
        this._types.push(new FurniFromSignal());
        this._types.push(new FurniInNeighborhood());
        this._types.push(new FurniInArea());
        this._types.push(new UsersOnFurni());
        this._types.push(new UsersPerformingAction());
        this._types.push(new UsersFromSignal());
        this._types.push(new UsersByName());
        this._types.push(new UsersInNeighborhood());
        this._types.push(new UsersInArea());
        this._types.push(new UsersWithHanditem());
        this._types.push(new UsersInGroup());
        this._types.push(new FurniWithAltitude());
        this._types.push(new FurniWithVariable());
        this._types.push(new UsersWithVariable());
        this._types.push(new RemoteSelector());
    }

    private _types: any[] = [];

    public getElementByCode(param1: number): Element {
        for (const _loc2_ of this._types ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getKey(): string {
        return "selector";
    }

    public acceptTriggerable(param1: Triggerable): boolean {
        return (param1 instanceof SelectorDefinition ? param1 : null) != null;
    }
}
