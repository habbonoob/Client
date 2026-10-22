import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PopularTagData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::PopularTagData'); }

    constructor(param1: IMessageDataWrapper) {
        this._tagName = param1.readString();
        this._userCount = param1.readInteger();
    }

    declare private _tagName: string;

    declare private _userCount: number;
    static { (this.prototype as any)._userCount = 0; }

    public get tagName(): string {
        return this._tagName;
    }

    public get userCount(): number {
        return this._userCount;
    }
}
