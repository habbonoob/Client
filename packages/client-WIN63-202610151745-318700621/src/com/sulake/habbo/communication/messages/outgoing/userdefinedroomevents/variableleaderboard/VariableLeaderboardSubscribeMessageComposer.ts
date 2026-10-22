import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class VariableLeaderboardSubscribeMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userdefinedroomevents.variableleaderboard::VariableLeaderboardSubscribeMessageComposer'); }

    private _array: any[] = [];

    constructor(param1: number, param2: number, param3: string, param4: number[]) {
        if (param4 == null || param4.length > 2) {
            throw new ArgumentError("Invalid Variable leaderboard chunk indices");
        }
        if (param4.length == 0 && (param1 != 0 || param2 != 0 || param3 != "0")) {
            throw new ArgumentError("Only the room-open request may omit chunk indices");
        }
        if (param4.length > 0 && (param4[0] < 0 || param4.length == 2 && (param4[1] < 0 || param4[0] == param4[1]))) {
            throw new ArgumentError("Variable leaderboard chunk indices must be distinct and nonnegative");
        }
        this._array.push(param1, param2, param3, param4.length);
        for (const _loc5_ of param4 ?? []) {
            this._array.push(_loc5_);
        }
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    public get disposed(): boolean {
        return this._array == null;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
