import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SaveWardrobeOutfitMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.avatar::SaveWardrobeOutfitMessageComposer'); }

    declare private _data: any[];

    constructor(wardrobeId: number, figure: string, gender: string) {
        this._data = [wardrobeId, figure, gender];
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
}
