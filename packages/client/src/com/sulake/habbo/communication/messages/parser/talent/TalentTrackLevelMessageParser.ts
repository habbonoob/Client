import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TalentTrackLevelMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentTrackLevelMessageParser'); }

    constructor() {
    }

    declare private _talentTrackName: string;

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _maxLevel: number;
    static { (this.prototype as any)._maxLevel = 0; }

    public get talentTrackName(): string {
        return this._talentTrackName;
    }

    public get level(): number {
        return this._level;
    }

    public get maxLevel(): number {
        return this._maxLevel;
    }

    public flush(): boolean {
        this._talentTrackName = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._talentTrackName = param1.readString();
        this._level = param1.readInteger();
        this._maxLevel = param1.readInteger();
        return true;
    }
}
