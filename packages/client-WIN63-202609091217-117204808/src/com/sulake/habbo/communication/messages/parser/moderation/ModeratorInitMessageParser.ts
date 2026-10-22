import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ModeratorInitData } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorInitData';

export class ModeratorInitMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::ModeratorInitMessageParser'); }

    declare private _data: ModeratorInitData;

    constructor() {
    }

    public flush(): boolean {
        if (this._data != null) {
            this._data.dispose();
            this._data = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new ModeratorInitData(param1);
        return true;
    }

    public get data(): ModeratorInitData {
        return this._data;
    }
}
