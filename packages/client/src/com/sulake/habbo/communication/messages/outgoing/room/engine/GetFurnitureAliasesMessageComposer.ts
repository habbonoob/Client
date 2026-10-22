import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetFurnitureAliasesMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::GetFurnitureAliasesMessageComposer'); }

    constructor() {
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
