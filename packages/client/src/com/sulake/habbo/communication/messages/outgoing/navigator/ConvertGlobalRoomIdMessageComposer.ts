import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ConvertGlobalRoomIdMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.navigator::ConvertGlobalRoomIdMessageComposer'); }

    constructor(param1: string) {
        this.flatId = param1;
    }

    declare private flatId: string;

    public get disposed(): boolean {
        return false;
    }

    public getMessageArray(): any[] {
        return [this.flatId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
