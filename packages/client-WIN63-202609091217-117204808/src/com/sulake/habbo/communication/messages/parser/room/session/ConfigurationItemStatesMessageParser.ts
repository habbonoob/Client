import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ConfigurationItemStatesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::ConfigurationItemStatesMessageParser'); }

    private _isHanditemControlBlocked: boolean = false;
    private _chooserDisabled: boolean = false;
    private _freeFurniMovementsEnabled: boolean = false;
    private _invisibleFurni: boolean = false;

    constructor() {
    }

    public get isHanditemControlBlocked(): boolean {
        return this._isHanditemControlBlocked;
    }

    public get chooserDisabled(): boolean {
        return this._chooserDisabled;
    }

    public get freeFurniMovementsEnabled(): boolean {
        return this._freeFurniMovementsEnabled;
    }

    public get invisibleFurni(): boolean {
        return this._invisibleFurni;
    }

    public flush(): boolean {
        this._isHanditemControlBlocked = false;
        this._chooserDisabled = false;
        this._freeFurniMovementsEnabled = false;
        this._invisibleFurni = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isHanditemControlBlocked = param1.readBoolean();
        if (param1.bytesAvailable > 0) {
            this._chooserDisabled = param1.readBoolean();
        }
        if (param1.bytesAvailable > 0) {
            this._freeFurniMovementsEnabled = param1.readBoolean();
        }
        if (param1.bytesAvailable > 0) {
            this._invisibleFurni = param1.readBoolean();
        }
        return true;
    }
}
