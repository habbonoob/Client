import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class WiredUserClickHandledEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.events::WiredUserClickHandledEvent'); }

    public static readonly WIRED_USER_CLICK_HANDLED: string = "WIRED_USER_CLICK_HANDLED";

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _openMenu: boolean;
    static { (this.prototype as any)._openMenu = false; }

    constructor(param1: string, param2: number, param3: boolean, param4: boolean = false, param5: boolean = false) {
        super(param1, param4, param5);
        this._index = param2;
        this._openMenu = param3;
    }

    public get index(): number {
        return this._index;
    }

    public get openMenu(): boolean {
        return this._openMenu;
    }
}
