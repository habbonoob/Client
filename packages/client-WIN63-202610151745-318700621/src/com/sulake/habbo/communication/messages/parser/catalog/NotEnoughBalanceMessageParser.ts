import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NotEnoughBalanceMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::NotEnoughBalanceMessageParser'); }

    private _notEnoughCredits: boolean = false;
    private _notEnoughActivityPoints: boolean = false;
    private _activityPointType: number = 0;

    constructor() {
    }

    public get notEnoughCredits(): boolean {
        return this._notEnoughCredits;
    }

    public get notEnoughActivityPoints(): boolean {
        return this._notEnoughActivityPoints;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public flush(): boolean {
        this._notEnoughCredits = false;
        this._notEnoughActivityPoints = false;
        this._activityPointType = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._notEnoughCredits = param1.readBoolean();
        this._notEnoughActivityPoints = param1.readBoolean();
        if (param1.bytesAvailable) {
            this._activityPointType = param1.readInteger();
        }
        return true;
    }
}
