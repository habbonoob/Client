import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionStartedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionStartedMessageParser'); }

    declare private _SafeStr_6109: number;
    static { (this.prototype as any)._SafeStr_6109 = 0; }

    declare private _requesterName: string;

    declare private _requesterFigure: string;

    declare private _guideUserId: number;
    static { (this.prototype as any)._guideUserId = 0; }

    declare private _guideName: string;

    declare private _SafeStr_6436: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_6109 = param1.readInteger();
        this._requesterName = param1.readString();
        this._requesterFigure = param1.readString();
        this._guideUserId = param1.readInteger();
        this._guideName = param1.readString();
        this._SafeStr_6436 = param1.readString();
        return true;
    }

    public get requesterUserId(): number {
        return this._SafeStr_6109;
    }

    public get requesterName(): string {
        return this._requesterName;
    }

    public get requesterFigure(): string {
        return this._requesterFigure;
    }

    public get guideUserId(): number {
        return this._guideUserId;
    }

    public get guideName(): string {
        return this._guideName;
    }

    public get guideFigure(): string {
        return this._SafeStr_6436;
    }
}
