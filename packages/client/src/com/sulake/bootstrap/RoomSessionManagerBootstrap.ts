import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomSessionManager } from '@/com/sulake/habbo/session/RoomSessionManager';

export class RoomSessionManagerBootstrap extends RoomSessionManager {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomSessionManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0) {
        super(context, flags);
    }
}
