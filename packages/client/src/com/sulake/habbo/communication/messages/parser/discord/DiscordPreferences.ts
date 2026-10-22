import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class DiscordPreferences {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.discord::DiscordPreferences'); }

    public static readFromData(param1: IMessageDataWrapper): DiscordPreferences {
        let _loc5_: number = param1.readInteger();
        let _loc4_: boolean = param1.readBoolean();
        let _loc3_: boolean = param1.readBoolean();
        let _loc2_: boolean = param1.readBoolean();
        let _loc6_: boolean = param1.readBoolean();
        return new DiscordPreferences(_loc5_, _loc4_, _loc3_, _loc2_, _loc6_);
    }

    constructor(param1: number, param2: boolean, param3: boolean, param4: boolean, param5: boolean) {
        this._version = param1;
        this._showHabbo = param2;
        this._shareActivity = param3;
        this._hideInHiddenRooms = param4;
        this._allowJoining = param5;
    }

    declare private _version: number;
    static { (this.prototype as any)._version = 0; }

    declare private _showHabbo: boolean;
    static { (this.prototype as any)._showHabbo = false; }

    declare private _shareActivity: boolean;
    static { (this.prototype as any)._shareActivity = false; }

    declare private _hideInHiddenRooms: boolean;
    static { (this.prototype as any)._hideInHiddenRooms = false; }

    declare private _allowJoining: boolean;
    static { (this.prototype as any)._allowJoining = false; }

    public get version(): number {
        return this._version;
    }

    public get showHabbo(): boolean {
        return this._showHabbo;
    }

    public get shareActivity(): boolean {
        return this._shareActivity;
    }

    public get hideInHiddenRooms(): boolean {
        return this._hideInHiddenRooms;
    }

    public get allowJoining(): boolean {
        return this._allowJoining;
    }
}
