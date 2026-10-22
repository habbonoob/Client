import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGuildData } from '@/com/sulake/habbo/communication/messages/incoming/users/IGuildData';

export class GuildSettingsData {
    static { registerClassName(this, 'com.sulake.habbo.groups::GuildSettingsData'); }

    constructor(param1: IGuildData = null) {
        if (param1 == null) {
            return;
        }
        this._guildType = param1.guildType;
        this._rightsLevel = param1.guildRightsLevel;
    }

    private _guildType: number = 0;
    private _rightsLevel: number = 0;
    private _isModified: boolean = false;

    public get guildType(): number {
        return this._guildType;
    }

    public set guildType(param1: number) {
        if (param1 != this._guildType) {
            this._isModified = true;
        }
        this._guildType = param1;
    }

    public get rightsLevel(): number {
        return this._rightsLevel;
    }

    public set rightsLevel(param1: number) {
        if (param1 != this._rightsLevel) {
            this._isModified = true;
        }
        this._rightsLevel = param1;
    }

    public get isModified(): boolean {
        return this._isModified;
    }

    public resetModified(): void {
        this._isModified = false;
    }
}
