import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { PetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PetMessageComposer';

export class HarvestPetMessageComposer extends PetMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::HarvestPetMessageComposer'); }

    constructor(param1: number) {
        super(param1);
    }
}
