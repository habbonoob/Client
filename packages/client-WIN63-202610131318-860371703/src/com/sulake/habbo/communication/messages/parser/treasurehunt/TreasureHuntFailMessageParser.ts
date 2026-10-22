import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TreasureHuntFailMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.treasurehunt::TreasureHuntFailMessageParser'); }

    declare private _huntId: string;

    declare private _requiredLevel: number;
    static { (this.prototype as any)._requiredLevel = 0; }

    declare private _requiredLevelPaying: number;
    static { (this.prototype as any)._requiredLevelPaying = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._huntId = null;
        this._requiredLevel = 0;
        this._requiredLevelPaying = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._huntId = param1.readString();
        this._requiredLevel = param1.readInteger();
        this._requiredLevelPaying = param1.readInteger();
        return true;
    }

    public get huntId(): string {
        return this._huntId;
    }

    public get requiredLevel(): number {
        return this._requiredLevel;
    }

    public get requiredLevelPaying(): number {
        return this._requiredLevelPaying;
    }
}
