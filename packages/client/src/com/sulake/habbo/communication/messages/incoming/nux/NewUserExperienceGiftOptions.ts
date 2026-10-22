import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { NewUserExperienceGift } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGift';

export class NewUserExperienceGiftOptions {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nux::NewUserExperienceGiftOptions'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._dayIndex = param1.readInteger();
        this._stepIndex = param1.readInteger();
        this._options = new Array<NewUserExperienceGift>(0).fill(null);
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._options.push(new NewUserExperienceGift(param1));
            _loc2_++;
        }
    }

    declare private _dayIndex: number;
    static { (this.prototype as any)._dayIndex = 0; }

    declare private _stepIndex: number;
    static { (this.prototype as any)._stepIndex = 0; }

    declare private _options: NewUserExperienceGift[];

    public get dayIndex(): number {
        return this._dayIndex;
    }

    public get stepIndex(): number {
        return this._stepIndex;
    }

    public get options(): NewUserExperienceGift[] {
        return this._options;
    }
}
