import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class QuestsListEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.quest.events::QuestsListEvent'); }

    public static readonly QUESTS_SEASONAL: string = "qe_quests_seasonal";
    public static readonly QUESTS: string = "qu_quests";

    declare private _quests: any[];

    declare private _openWindow: boolean;
    static { (this.prototype as any)._openWindow = false; }

    constructor(param1: string, param2: any[], param3: boolean, param4: boolean = false, param5: boolean = false) {
        super(param1, param4, param5);
        this._quests = param2;
    }

    public get quests(): any[] {
        return this._quests;
    }

    public get openWindow(): boolean {
        return this._openWindow;
    }
}
