import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class LibraryLoadedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.avatar.events::LibraryLoadedEvent'); }

    declare private _libName: string;

    constructor(param1: string, param2: string) {
        super(param1);
        this._libName = param2;
    }

    public get library(): string {
        return this._libName;
    }
}
