import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredLinkConnection {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredlink::WiredLinkConnection'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _roomName: string;

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_14126: boolean;
    static { (this.prototype as any)._SafeStr_14126 = false; }

    declare private _SafeStr_14127: boolean;
    static { (this.prototype as any)._SafeStr_14127 = false; }

    constructor(param1: IMessageDataWrapper) {
        this._roomId = param1.readInteger();
        this._roomName = param1.readString();
        this._furniId = param1.readInteger();
        this._SafeStr_14126 = param1.readBoolean();
        this._SafeStr_14127 = param1.readBoolean();
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get isBuildersClub(): boolean {
        return this._SafeStr_14126;
    }

    public get receiveLocal(): boolean {
        return this._SafeStr_14127;
    }
}
