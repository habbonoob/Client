import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AccountPreferencesParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.preferences::AccountPreferencesParser'); }

    constructor() {
    }

    declare private _freeFlowChatDisabled: boolean;
    static { (this.prototype as any)._freeFlowChatDisabled = false; }

    declare private _roomInvitesIgnored: boolean;
    static { (this.prototype as any)._roomInvitesIgnored = false; }

    declare private _roomCameraFollowDisabled: boolean;
    static { (this.prototype as any)._roomCameraFollowDisabled = false; }

    declare private _uiFlags: number;
    static { (this.prototype as any)._uiFlags = 0; }

    declare private _preferedChatStyle: number;
    static { (this.prototype as any)._preferedChatStyle = 0; }

    declare private _wiredMenuButton: boolean;
    static { (this.prototype as any)._wiredMenuButton = false; }

    declare private _wiredInspectButton: boolean;
    static { (this.prototype as any)._wiredInspectButton = false; }

    declare private _wiredWhisperDisabled: boolean;
    static { (this.prototype as any)._wiredWhisperDisabled = false; }

    declare private _showAllNotifications: boolean;
    static { (this.prototype as any)._showAllNotifications = false; }

    declare private _wiredUiStyle: string;

    declare private _traxVolume: number;
    static { (this.prototype as any)._traxVolume = 0; }

    public get traxVolume(): number {
        return this._traxVolume;
    }

    declare private _furniVolume: number;
    static { (this.prototype as any)._furniVolume = 0; }

    public get furniVolume(): number {
        return this._furniVolume;
    }

    declare private _uiVolume: number;
    static { (this.prototype as any)._uiVolume = 0; }

    public get uiVolume(): number {
        return this._uiVolume;
    }

    declare private _playTestMode: boolean;
    static { (this.prototype as any)._playTestMode = false; }

    public get playTestMode(): boolean {
        return this._playTestMode;
    }

    public get freeFlowChatDisabled(): boolean {
        return this._freeFlowChatDisabled;
    }

    public get roomInvitesIgnored(): boolean {
        return this._roomInvitesIgnored;
    }

    public get roomCameraFollowDisabled(): boolean {
        return this._roomCameraFollowDisabled;
    }

    public get uiFlags(): number {
        return this._uiFlags;
    }

    public get preferedChatStyle(): number {
        return this._preferedChatStyle;
    }

    public get wiredMenuButton(): boolean {
        return this._wiredMenuButton;
    }

    public get wiredInspectButton(): boolean {
        return this._wiredInspectButton;
    }

    public get wiredWhisperDisabled(): boolean {
        return this._wiredWhisperDisabled;
    }

    public get showAllNotifications(): boolean {
        return this._showAllNotifications;
    }

    public get wiredUiStyle(): string {
        return this._wiredUiStyle;
    }

    public flush(): boolean {
        this._freeFlowChatDisabled = false;
        this._roomCameraFollowDisabled = false;
        this._uiFlags = 0;
        this._preferedChatStyle = 0;
        this._wiredMenuButton = false;
        this._wiredInspectButton = false;
        this._playTestMode = false;
        this._wiredWhisperDisabled = false;
        this._showAllNotifications = false;
        this._wiredUiStyle = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._uiVolume = param1.readInteger();
        this._furniVolume = param1.readInteger();
        this._traxVolume = param1.readInteger();
        this._freeFlowChatDisabled = param1.readBoolean();
        this._roomInvitesIgnored = param1.readBoolean();
        this._roomCameraFollowDisabled = param1.readBoolean();
        this._uiFlags = param1.readInteger();
        this._preferedChatStyle = param1.readInteger();
        this._wiredMenuButton = param1.readBoolean();
        this._wiredInspectButton = param1.readBoolean();
        this._playTestMode = param1.readBoolean();
        param1.readInteger();
        this._wiredWhisperDisabled = param1.readBoolean();
        if (param1.bytesAvailable > 0) {
            this._showAllNotifications = param1.readBoolean();
        }
        if (param1.bytesAvailable > 0) {
            this._wiredUiStyle = param1.readString();
        } else {
            this._wiredUiStyle = "";
        }
        return true;
    }
}
