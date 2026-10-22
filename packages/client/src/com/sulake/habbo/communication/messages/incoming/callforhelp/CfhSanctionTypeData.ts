import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { INamed } from '@/com/sulake/habbo/communication/messages/incoming/moderation/INamed';

export class CfhSanctionTypeData implements INamed {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.callforhelp::CfhSanctionTypeData'); }

    constructor(param1: IMessageDataWrapper) {
        this._name = param1.readString();
        this._sanctionLengthInHours = param1.readInteger();
        this._SafeStr_7357 = param1.readInteger();
        this._avatarOnly = param1.readBoolean();
        if (param1.bytesAvailable) {
            this._tradeLockInfo = param1.readString();
        }
        if (param1.bytesAvailable) {
            this._machineBanInfo = param1.readString();
        }
    }

    declare private _sanctionLengthInHours: number;
    static { (this.prototype as any)._sanctionLengthInHours = 0; }

    declare private _SafeStr_7357: number;
    static { (this.prototype as any)._SafeStr_7357 = 0; }

    declare private _avatarOnly: boolean;
    static { (this.prototype as any)._avatarOnly = false; }

    private _tradeLockInfo: string = "";
    private _machineBanInfo: string = "";

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get sanctionLengthInHours(): number {
        return this._sanctionLengthInHours;
    }

    public get avatarOnly(): boolean {
        return this._avatarOnly;
    }

    public get tradeLockInfo(): string {
        return this._tradeLockInfo;
    }

    public get machineBanInfo(): string {
        return this._machineBanInfo;
    }
}
