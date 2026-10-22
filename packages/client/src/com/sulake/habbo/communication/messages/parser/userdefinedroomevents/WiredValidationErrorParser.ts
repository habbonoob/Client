import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredValidationParameter } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredValidationParameter';

export class WiredValidationErrorParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredValidationErrorParser'); }

    constructor() {
    }

    declare private _localizationKey: string;

    public get localizationKey(): string {
        return this._localizationKey;
    }

    declare private _parameters: any[];

    public get parameters(): any[] {
        return this._parameters;
    }

    public flush(): boolean {
        this._localizationKey = null;
        this._parameters = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._localizationKey = param1.readString();
        this._parameters = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._parameters.push(new WiredValidationParameter(param1));
            _loc3_++;
        }
        return true;
    }
}
