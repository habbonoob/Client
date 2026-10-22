import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WardrobeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/WardrobeMessageParser';

export class WardrobeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.avatar::WardrobeMessageEvent'); }

    public static readonly _SafeStr_8671: number = 0;
    public static readonly _SafeStr_8593: number = 1;

    constructor(param1: (...args: any[]) => any) {
        super(param1, WardrobeMessageParser);
    }

    public get outfits(): any[] {
        return this.getParser().outfits;
    }

    public get state(): number {
        return this.getParser().state;
    }

    private getParser(): WardrobeMessageParser {
        return this._parser instanceof WardrobeMessageParser ? this._parser : null;
    }
}
