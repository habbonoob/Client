import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ForwardToACompetitionRoomMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.competition::ForwardToACompetitionRoomMessageComposer'); }

    constructor(param1: string, param2: number) {
        this._array.push(param1);
        this._array.push(param2);
    }

    private _array: any[] = [];

    public get disposed(): boolean {
        return false;
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
