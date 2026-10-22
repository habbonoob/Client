import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BuildersClubSubscriptionStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::BuildersClubSubscriptionStatusMessageParser'); }

    declare private _SafeStr_4808: number;
    static { (this.prototype as any)._SafeStr_4808 = 0; }

    declare private _furniLimit: number;
    static { (this.prototype as any)._furniLimit = 0; }

    declare private _maxFurniLimit: number;
    static { (this.prototype as any)._maxFurniLimit = 0; }

    declare private _secondsLeftWithGrace: number;
    static { (this.prototype as any)._secondsLeftWithGrace = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_4808 = param1.readInteger();
        this._furniLimit = param1.readInteger();
        this._maxFurniLimit = param1.readInteger();
        if (param1.bytesAvailable) {
            this._secondsLeftWithGrace = param1.readInteger();
        } else {
            this._secondsLeftWithGrace = this._SafeStr_4808;
        }
        return true;
    }

    public get secondsLeft(): number {
        return this._SafeStr_4808;
    }

    public get furniLimit(): number {
        return this._furniLimit;
    }

    public get maxFurniLimit(): number {
        return this._maxFurniLimit;
    }

    public get secondsLeftWithGrace(): number {
        return this._secondsLeftWithGrace;
    }
}
