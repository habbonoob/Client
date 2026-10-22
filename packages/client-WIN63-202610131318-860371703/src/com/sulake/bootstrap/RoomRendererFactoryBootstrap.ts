import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomRendererFactory } from '@/com/sulake/room/renderer/RoomRendererFactory';

export class RoomRendererFactoryBootstrap extends RoomRendererFactory {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomRendererFactoryBootstrap'); }

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }
}
