import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomObjectFactory } from '@/com/sulake/habbo/room/RoomObjectFactory';

export class RoomObjectFactoryBootstrap extends RoomObjectFactory {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomObjectFactoryBootstrap'); }

    constructor(context: IContext, flags: number = 0) {
        super(context, flags);
    }
}
