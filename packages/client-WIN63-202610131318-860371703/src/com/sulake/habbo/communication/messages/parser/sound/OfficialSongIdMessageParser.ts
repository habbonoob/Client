import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class OfficialSongIdMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.sound::OfficialSongIdMessageParser'); }

    declare private _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    declare private _officialSongId: string;

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_4873 = 0;
        this._officialSongId = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._officialSongId = param1.readString();
        this._SafeStr_4873 = param1.readInteger();
        return true;
    }

    public get songId(): number {
        return this._SafeStr_4873;
    }

    public get officialSongId(): string {
        return this._officialSongId;
    }
}
