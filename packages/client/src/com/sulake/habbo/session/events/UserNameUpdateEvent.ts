import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class UserNameUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.session.events::UserNameUpdateEvent'); }

    public static readonly NAME_UPDATE: string = "unue_name_updated";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("unue_name_updated", param2, param3);
        this._name = param1;
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }
}
