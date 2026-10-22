import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CameraSnapshotMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/camera/CameraSnapshotMessageParser';

export class CameraSnapshotMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.camera::CameraSnapshotMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CameraSnapshotMessageParser);
    }

    public getParser(): CameraSnapshotMessageParser {
        return this._parser instanceof CameraSnapshotMessageParser ? this._parser : null;
    }
}
