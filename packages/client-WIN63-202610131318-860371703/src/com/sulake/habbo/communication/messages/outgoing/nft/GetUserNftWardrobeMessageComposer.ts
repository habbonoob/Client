import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetUserNftWardrobeMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.nft::GetUserNftWardrobeMessageComposer'); }

    private _array: any[] = [];

    constructor() {
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
}
