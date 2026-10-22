import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CategoriesWithVisitorCountParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CategoriesWithVisitorCountParser';

export class CategoriesWithVisitorCountEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::CategoriesWithVisitorCountEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CategoriesWithVisitorCountParser);
    }

    public getParser(): CategoriesWithVisitorCountParser {
        return this._parser instanceof CategoriesWithVisitorCountParser ? this._parser : null;
    }
}
