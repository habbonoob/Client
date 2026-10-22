import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomEngine } from '@/com/sulake/habbo/room/RoomEngine';

export class RoomEngineBootstrap extends RoomEngine {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomEngineBootstrap'); }

    constructor(context: IContext, flags: number = 0) {
        super(context, flags);
    }
}
