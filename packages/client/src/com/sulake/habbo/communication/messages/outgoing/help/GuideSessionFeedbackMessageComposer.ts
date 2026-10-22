import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GuideSessionFeedbackMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.help::GuideSessionFeedbackMessageComposer'); }

    constructor(param1: boolean) {
        this._data.push(param1);
    }

    private _data: any[] = [];
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = null;
        this._disposed = true;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
