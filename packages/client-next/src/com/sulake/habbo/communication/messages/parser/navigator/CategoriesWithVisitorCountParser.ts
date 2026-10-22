import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CategoriesWithVisitorCountData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CategoriesWithVisitorCountData';

export class CategoriesWithVisitorCountParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::CategoriesWithVisitorCountParser'); }

    declare private _data: CategoriesWithVisitorCountData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new CategoriesWithVisitorCountData(param1);
        return true;
    }

    public get data(): CategoriesWithVisitorCountData {
        return this._data;
    }
}
