import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { NewUserExperienceGetGiftsSelection } from '@/com/sulake/habbo/communication/messages/outgoing/nux/NewUserExperienceGetGiftsSelection';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class NewUserExperienceGetGiftsMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.nux::NewUserExperienceGetGiftsMessageComposer'); }

    private _array: any[] = [];

    constructor(param1: NewUserExperienceGetGiftsSelection[]) {
        this._array.push(param1.length * 3);
        for (const _loc2_ of param1 ?? []) {
            this._array.push(_loc2_.dayIndex);
            this._array.push(_loc2_.stepIndex);
            this._array.push(_loc2_.giftIndex);
        }
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    public get disposed(): boolean {
        return false;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
