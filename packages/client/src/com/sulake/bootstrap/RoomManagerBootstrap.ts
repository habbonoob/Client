import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomManager } from '@/com/sulake/room/RoomManager';

export class RoomManagerBootstrap extends RoomManager {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0) {
        super(context, flags);
    }
}
