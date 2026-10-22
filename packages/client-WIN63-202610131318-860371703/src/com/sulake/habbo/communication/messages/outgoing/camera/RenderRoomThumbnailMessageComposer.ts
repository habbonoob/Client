import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RenderRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomMessageComposer';

export class RenderRoomThumbnailMessageComposer extends RenderRoomMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera::RenderRoomThumbnailMessageComposer'); }

    constructor(param1: any[], param2: string, param3: string, param4: number, param5: number) {
        super(param1, param2, param3, param4, param5);
        this.compressData();
    }
}
