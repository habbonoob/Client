import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GetTalentTrackMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.talent::GetTalentTrackMessageComposer'); }

    constructor(param1: string) {
        this._data.push(param1);
    }

    private _data: any[] = [];

    public get disposed(): boolean {
        return this._data == null;
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = null;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
