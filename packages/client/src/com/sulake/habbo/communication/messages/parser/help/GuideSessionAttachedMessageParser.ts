import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionAttachedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionAttachedMessageParser'); }

    constructor() {
    }

    declare private _asGuide: boolean;
    static { (this.prototype as any)._asGuide = false; }

    declare private _helpRequestType: number;
    static { (this.prototype as any)._helpRequestType = 0; }

    declare private _helpRequestDescription: string;

    declare private _roleSpecificWaitTime: number;
    static { (this.prototype as any)._roleSpecificWaitTime = 0; }

    public get asGuide(): boolean {
        return this._asGuide;
    }

    public get helpRequestType(): number {
        return this._helpRequestType;
    }

    public get helpRequestDescription(): string {
        return this._helpRequestDescription;
    }

    public get roleSpecificWaitTime(): number {
        return this._roleSpecificWaitTime;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._asGuide = param1.readBoolean();
        this._helpRequestType = param1.readInteger();
        this._helpRequestDescription = param1.readString();
        this._roleSpecificWaitTime = param1.readInteger();
        return true;
    }
}
