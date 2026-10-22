import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PendingGuideTicket {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help.data::PendingGuideTicket'); }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _SafeStr_6467: number;
    static { (this.prototype as any)._SafeStr_6467 = 0; }

    declare private _SafeStr_6326: boolean;
    static { (this.prototype as any)._SafeStr_6326 = false; }

    declare private _otherPartyName: string;

    declare private _otherPartyFigure: string;

    declare private _description: string;

    declare private _roomName: string;

    constructor(param1: IMessageDataWrapper) {
        this._type = param1.readInteger();
        this._SafeStr_6467 = param1.readInteger();
        this._SafeStr_6326 = param1.readBoolean();
        switch (this._type) {
            case 0:
            case 2:
                this._otherPartyName = param1.readString();
                this._otherPartyFigure = param1.readString();
                return;
            case 1:
                this._otherPartyName = param1.readString();
                this._otherPartyFigure = param1.readString();
                this._description = param1.readString();
                return;
            case 3:
                if (!this.isGuide) {
                    this._otherPartyName = param1.readString();
                    this._otherPartyFigure = param1.readString();
                    this._roomName = param1.readString();
                }
                return;
            default:
                return;
        }
    }

    public get type(): number {
        return this._type;
    }

    public get secondsAgo(): number {
        return this._SafeStr_6467;
    }

    public get isGuide(): boolean {
        return this._SafeStr_6326;
    }

    public get otherPartyName(): string {
        return this._otherPartyName;
    }

    public get otherPartyFigure(): string {
        return this._otherPartyFigure;
    }

    public get description(): string {
        return this._description;
    }

    public get roomName(): string {
        return this._roomName;
    }
}
