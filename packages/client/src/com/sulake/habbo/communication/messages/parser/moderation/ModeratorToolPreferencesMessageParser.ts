import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ModeratorToolPreferencesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::ModeratorToolPreferencesMessageParser'); }

    constructor() {
    }

    declare private _windowX: number;
    static { (this.prototype as any)._windowX = 0; }

    declare private _windowY: number;
    static { (this.prototype as any)._windowY = 0; }

    declare private _windowHeight: number;
    static { (this.prototype as any)._windowHeight = 0; }

    declare private _windowWidth: number;
    static { (this.prototype as any)._windowWidth = 0; }

    public get windowWidth(): number {
        return this._windowWidth;
    }

    public get windowX(): number {
        return this._windowX;
    }

    public get windowY(): number {
        return this._windowY;
    }

    public get windowHeight(): number {
        return this._windowHeight;
    }

    public flush(): boolean {
        this._windowX = 0;
        this._windowY = 0;
        this._windowWidth = 0;
        this._windowHeight = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._windowX = param1.readInteger();
        this._windowY = param1.readInteger();
        this._windowWidth = param1.readInteger();
        this._windowHeight = param1.readInteger();
        return true;
    }
}
