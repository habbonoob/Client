import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FigureUpdateParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/FigureUpdateParser';

export class FigureUpdateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.avatar::FigureUpdateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FigureUpdateParser);
    }

    private getParser(): FigureUpdateParser {
        return this._parser instanceof FigureUpdateParser ? this._parser : null;
    }

    public get figure(): string {
        return (this._parser instanceof FigureUpdateParser ? this._parser : null).figure;
    }

    public get gender(): string {
        return (this._parser instanceof FigureUpdateParser ? this._parser : null).gender;
    }
}
