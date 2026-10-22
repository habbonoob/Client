import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { SetRoomSessionTagsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/SetRoomSessionTagsMessageComposer';

export class RoomSessionTags {
    static { registerClassName(this, 'com.sulake.habbo.navigator.domain::RoomSessionTags'); }

    constructor(param1: string, param2: string) {
        this._tag1 = param1;
        this._tag2 = param2;
    }

    declare private _tag1: string;

    declare private _tag2: string;

    public getMsg(): SetRoomSessionTagsMessageComposer {
        return new SetRoomSessionTagsMessageComposer(this._tag1, this._tag2);
    }
}
