import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomEngine } from '@/com/sulake/habbo/room/RoomEngine';

export class RoomEngineBootstrap extends RoomEngine {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomEngineBootstrap'); }

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }
}
