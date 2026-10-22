import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IRoomRenderer } from '@/com/sulake/room/renderer/IRoomRenderer';
import type { IRoomRendererFactory } from '@/com/sulake/room/renderer/IRoomRendererFactory';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { RoomRenderer } from '@/com/sulake/room/renderer/RoomRenderer';

export class RoomRendererFactory extends Component implements IRoomRendererFactory {
    static { registerClassName(this, 'com.sulake.room.renderer::RoomRendererFactory'); }

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }

    public createRenderer(): IRoomRenderer {
        return new RoomRenderer(this);
    }
}
