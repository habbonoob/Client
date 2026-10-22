import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class PatternMatchData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::PatternMatchData'); }

    declare private _pattern: string;

    declare private _startIndex: number;
    static { (this.prototype as any)._startIndex = 0; }

    declare private _endIndex: number;
    static { (this.prototype as any)._endIndex = 0; }

    private _disposed: boolean = false;

    constructor(param1: IMessageDataWrapper) {
        this._pattern = param1.readString();
        this._startIndex = param1.readInteger();
        this._endIndex = param1.readInteger();
    }

    public dispose(): void {
        this._disposed = true;
        this._pattern = "";
        this._startIndex = -1;
        this._endIndex = -1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get pattern(): string {
        return this._pattern;
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public get endIndex(): number {
        return this._endIndex;
    }

    get [IDisposable](): true {
        return true;
    }
}
