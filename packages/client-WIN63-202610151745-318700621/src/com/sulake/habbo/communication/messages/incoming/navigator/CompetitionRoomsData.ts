import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CompetitionRoomsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::CompetitionRoomsData'); }

    declare private _goalId: number;
    static { (this.prototype as any)._goalId = 0; }

    declare private _pageIndex: number;
    static { (this.prototype as any)._pageIndex = 0; }

    declare private _pageCount: number;
    static { (this.prototype as any)._pageCount = 0; }

    constructor(param1: IMessageDataWrapper, param2: number = 0, param3: number = 0) {
        this._goalId = param2;
        this._pageIndex = param3;
        if (param1 != null) {
            this._goalId = param1.readInteger();
            this._pageIndex = param1.readInteger();
            this._pageCount = param1.readInteger();
        }
    }

    public get goalId(): number {
        return this._goalId;
    }

    public get pageIndex(): number {
        return this._pageIndex;
    }

    public get pageCount(): number {
        return this._pageCount;
    }
}
