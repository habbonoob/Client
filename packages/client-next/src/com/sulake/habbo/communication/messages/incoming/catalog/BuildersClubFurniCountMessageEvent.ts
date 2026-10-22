import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BuildersClubFurniCountMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/BuildersClubFurniCountMessageParser';

export class BuildersClubFurniCountMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::BuildersClubFurniCountMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BuildersClubFurniCountMessageParser);
    }

    public getParser(): BuildersClubFurniCountMessageParser {
        return this._parser instanceof BuildersClubFurniCountMessageParser ? this._parser : null;
    }
}
