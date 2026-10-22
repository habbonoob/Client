import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionStartedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionStartedMessageParser'); }

    constructor() {
    }

    declare private _requesterUserId: number;
    static { (this.prototype as any)._requesterUserId = 0; }

    declare private _requesterFigure: string;

    declare private _guideUserId: number;
    static { (this.prototype as any)._guideUserId = 0; }

    declare private _guideFigure: string;

    declare private _requesterName: string;

    public get requesterName(): string {
        return this._requesterName;
    }

    declare private _guideName: string;

    public get guideName(): string {
        return this._guideName;
    }

    public get requesterUserId(): number {
        return this._requesterUserId;
    }

    public get requesterFigure(): string {
        return this._requesterFigure;
    }

    public get guideUserId(): number {
        return this._guideUserId;
    }

    public get guideFigure(): string {
        return this._guideFigure;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._requesterUserId = param1.readInteger();
        this._requesterName = param1.readString();
        this._requesterFigure = param1.readString();
        this._guideUserId = param1.readInteger();
        this._guideName = param1.readString();
        this._guideFigure = param1.readString();
        return true;
    }
}
