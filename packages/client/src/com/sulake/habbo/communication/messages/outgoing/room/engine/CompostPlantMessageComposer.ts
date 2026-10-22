import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { PetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PetMessageComposer';

export class CompostPlantMessageComposer extends PetMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::CompostPlantMessageComposer'); }

    constructor(param1: number) {
        super(param1);
    }
}
