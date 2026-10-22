import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NewNavigatorPreferencesParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.newnavigator::NewNavigatorPreferencesParser'); }

    declare private _windowX: number;
    static { (this.prototype as any)._windowX = 0; }

    declare private _windowY: number;
    static { (this.prototype as any)._windowY = 0; }

    declare private _windowWidth: number;
    static { (this.prototype as any)._windowWidth = 0; }

    declare private _windowHeight: number;
    static { (this.prototype as any)._windowHeight = 0; }

    declare private _leftPaneHidden: boolean;
    static { (this.prototype as any)._leftPaneHidden = false; }

    declare private _resultsMode: number;
    static { (this.prototype as any)._resultsMode = 0; }

    constructor() {
    }

    public get windowX(): number {
        return this._windowX;
    }

    public get windowY(): number {
        return this._windowY;
    }

    public get windowWidth(): number {
        return this._windowWidth;
    }

    public get windowHeight(): number {
        return this._windowHeight;
    }

    public get leftPaneHidden(): boolean {
        return this._leftPaneHidden;
    }

    public get resultsMode(): number {
        return this._resultsMode;
    }

    public flush(): boolean {
        this._windowX = 0;
        this._windowY = 0;
        this._windowWidth = 0;
        this._windowHeight = 0;
        this._leftPaneHidden = false;
        this._resultsMode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._windowX = param1.readInteger();
        this._windowY = param1.readInteger();
        this._windowWidth = param1.readInteger();
        this._windowHeight = param1.readInteger();
        this._leftPaneHidden = param1.readBoolean();
        this._resultsMode = param1.readInteger();
        return true;
    }
}
