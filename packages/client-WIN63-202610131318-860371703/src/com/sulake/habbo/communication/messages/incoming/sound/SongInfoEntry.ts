import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { PlayListEntry } from '@/com/sulake/habbo/communication/messages/incoming/sound/PlayListEntry';

export class SongInfoEntry extends PlayListEntry {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::SongInfoEntry'); }

    private _SafeStr_5208: string = "";

    constructor(param1: number, param2: number, param3: string, param4: string, param5: string) {
        super(param1, param2, param3, param4);
        this._SafeStr_5208 = param5;
    }

    public get data(): string {
        return this._SafeStr_5208;
    }
}
