import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TreasureHuntUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.treasurehunt::TreasureHuntUpdateMessageParser'); }

    declare private _huntId: string;

    declare private _stepsCompleted: number;
    static { (this.prototype as any)._stepsCompleted = 0; }

    declare private _totalSteps: number;
    static { (this.prototype as any)._totalSteps = 0; }

    declare private _isCompleted: boolean;
    static { (this.prototype as any)._isCompleted = false; }

    constructor() {
    }

    public flush(): boolean {
        this._huntId = null;
        this._stepsCompleted = 0;
        this._totalSteps = 0;
        this._isCompleted = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._huntId = param1.readString();
        this._stepsCompleted = param1.readInteger();
        this._totalSteps = param1.readInteger();
        this._isCompleted = param1.readBoolean();
        return true;
    }

    public get huntId(): string {
        return this._huntId;
    }

    public get stepsCompleted(): number {
        return this._stepsCompleted;
    }

    public get totalSteps(): number {
        return this._totalSteps;
    }

    public get isCompleted(): boolean {
        return this._isCompleted;
    }
}
