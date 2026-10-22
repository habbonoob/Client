import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PublishPhotoMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera::PublishPhotoMessageComposer'); }

    private _data: any[] = [];

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
