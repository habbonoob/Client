import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class AvatarUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.avatar.events::AvatarUpdateEvent'); }

    public static readonly AVATAR_FIGURE_UPDATED: string = "AVATAR_FIGURE_UPDATED";

    declare private _figure: string;

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("AVATAR_FIGURE_UPDATED", param2, param3);
        this._figure = param1;
    }

    public get figure(): string {
        return this._figure;
    }
}
