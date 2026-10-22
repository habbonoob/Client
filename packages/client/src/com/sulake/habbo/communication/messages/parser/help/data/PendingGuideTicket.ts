import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PendingGuideTicket {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help.data::PendingGuideTicket'); }

    constructor(param1: IMessageDataWrapper) {
        this._type = param1.readInteger();
        this._secondsAgo = param1.readInteger();
        this._isGuide = param1.readBoolean();
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

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _secondsAgo: number;
    static { (this.prototype as any)._secondsAgo = 0; }

    declare private _isGuide: boolean;
    static { (this.prototype as any)._isGuide = false; }

    declare private _otherPartyName: string;

    declare private _otherPartyFigure: string;

    declare private _description: string;

    declare private _roomName: string;

    public get roomName(): string {
        return this._roomName;
    }

    public get type(): number {
        return this._type;
    }

    public get secondsAgo(): number {
        return this._secondsAgo;
    }

    public get isGuide(): boolean {
        return this._isGuide;
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
}
