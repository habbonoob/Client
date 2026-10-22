import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ConcurrentUsersGoalProgressMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::ConcurrentUsersGoalProgressMessageParser'); }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _userCount: number;
    static { (this.prototype as any)._userCount = 0; }

    declare private _userCountGoal: number;
    static { (this.prototype as any)._userCountGoal = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._state = -1;
        this._userCount = -1;
        this._userCountGoal = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._state = param1.readInteger();
        this._userCount = param1.readInteger();
        this._userCountGoal = param1.readInteger();
        return true;
    }

    public get state(): number {
        return this._state;
    }

    public get userCount(): number {
        return this._userCount;
    }

    public get userCountGoal(): number {
        return this._userCountGoal;
    }
}
