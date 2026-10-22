import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HallOfFameEntryData } from '@/com/sulake/habbo/communication/messages/incoming/quest/HallOfFameEntryData';

export class CommunityGoalHallOfFame implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::CommunityGoalHallOfFame'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._hof = [];
        this._goalCode = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._hof.push(new HallOfFameEntryData(param1));
            _loc3_++;
        }
    }

    declare private _hof: any[];

    declare private _goalCode: string;

    public get goalCode(): string {
        return this._goalCode;
    }

    public get disposed(): boolean {
        return this._hof == null;
    }

    public get hof(): any[] {
        return this._hof;
    }

    public dispose(): void {
        this._hof = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
