import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetSelectedNftWardrobeOutfitMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.nft::GetSelectedNftWardrobeOutfitMessageComposer'); }

    constructor() {
    }

    private _array: any[] = [];

    public get disposed(): boolean {
        return false;
    }

    public GetUserNftWardrobeMessageComposer(): any {
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
