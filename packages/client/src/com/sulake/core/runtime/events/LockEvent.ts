import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class LockEvent extends Event {
    static { registerClassName(this, 'com.sulake.core.runtime.events::LockEvent'); }

    constructor(param1: string, param2: IUnknown) {
        super(param1);
        this.unknown = param2;
    }

    declare public unknown: IUnknown;
}
