import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomObjectFactory } from '@/com/sulake/habbo/room/RoomObjectFactory';

export class RoomObjectFactoryBootstrap extends RoomObjectFactory {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomObjectFactoryBootstrap'); }

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }
}
