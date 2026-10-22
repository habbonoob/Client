import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredLogEntry {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.roomlogs::WiredLogEntry'); }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readLong();
        this._logLevel = param1.readByte();
        this._logSource = param1.readByte();
        this._logMessage = param1.readString();
        this._SafeStr_5424 = param1.readLong();
        this._timestampStr = param1.readString();
    }

    declare private _id: number;
    static { (this.prototype as any)._id = NaN; }

    declare private _logLevel: number;
    static { (this.prototype as any)._logLevel = 0; }

    declare private _logSource: number;
    static { (this.prototype as any)._logSource = 0; }

    declare private _logMessage: string;

    declare private _SafeStr_5424: number;
    static { (this.prototype as any)._SafeStr_5424 = NaN; }

    declare private _timestampStr: string;

    public get id(): number {
        return this._id;
    }

    public get logLevel(): number {
        return this._logLevel;
    }

    public get logSource(): number {
        return this._logSource;
    }

    public get logMessage(): string {
        return this._logMessage;
    }

    public get timestamp(): number {
        return this._SafeStr_5424;
    }

    public get timestampStr(): string {
        return this._timestampStr;
    }
}
