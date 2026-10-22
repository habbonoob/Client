import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MaintenanceStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.availability::MaintenanceStatusMessageParser'); }

    constructor() {
    }

    declare private _isInMaintenance: boolean;
    static { (this.prototype as any)._isInMaintenance = false; }

    declare private _minutesUntilMaintenance: number;
    static { (this.prototype as any)._minutesUntilMaintenance = 0; }

    private _duration: number = 15;

    public get isInMaintenance(): boolean {
        return this._isInMaintenance;
    }

    public get minutesUntilMaintenance(): number {
        return this._minutesUntilMaintenance;
    }

    public get duration(): number {
        return this._duration;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isInMaintenance = param1.readBoolean();
        this._minutesUntilMaintenance = param1.readInteger();
        if (param1.bytesAvailable) {
            this._duration = param1.readInteger();
        }
        return true;
    }
}
