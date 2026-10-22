import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomSessionManager } from '@/com/sulake/habbo/session/RoomSessionManager';

export class RoomSessionManagerBootstrap extends RoomSessionManager {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomSessionManagerBootstrap'); }

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }
}
