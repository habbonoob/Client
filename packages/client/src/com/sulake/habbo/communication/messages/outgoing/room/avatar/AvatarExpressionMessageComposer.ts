import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class AvatarExpressionMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.avatar::AvatarExpressionMessageComposer'); }

    constructor(param1: number) {
        this._typeCode = param1;
    }

    private _typeCode: number = 0;

    public dispose(): void {
        this._typeCode = 0;
    }

    public getMessageArray(): any[] {
        return [this._typeCode];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
