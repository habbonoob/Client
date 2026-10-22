import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredRoomSettingsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredRoomSettingsMessageParser'); }

    declare private _modifyPermissionMask: number;
    static { (this.prototype as any)._modifyPermissionMask = 0; }

    declare private _readPermissionMask: number;
    static { (this.prototype as any)._readPermissionMask = 0; }

    declare private _timezone: string;

    constructor() {
    }

    public flush(): boolean {
        this._modifyPermissionMask = 0;
        this._readPermissionMask = 0;
        this._timezone = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._modifyPermissionMask = param1.readInteger();
        this._readPermissionMask = param1.readInteger();
        this._timezone = param1.readString();
        return true;
    }

    public get modifyPermissionMask(): number {
        return this._modifyPermissionMask;
    }

    public get readPermissionMask(): number {
        return this._readPermissionMask;
    }

    public get timezone(): string {
        return this._timezone;
    }
}
