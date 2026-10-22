import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class Game2PlayerData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::Game2PlayerData'); }

    declare private _SafeStr_5535: number;
    static { (this.prototype as any)._SafeStr_5535 = 0; }

    declare private _userName: string;

    declare private _figureString: string;

    declare private _gender: string;

    declare private _teamId: number;
    static { (this.prototype as any)._teamId = 0; }

    private _disposed: boolean = false;

    constructor() {
    }

    public dispose(): void {
        this._userName = null;
        this._figureString = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public parse(param1: IMessageDataWrapper): void {
        this._SafeStr_5535 = param1.readInteger();
        this._userName = param1.readString();
        this._figureString = param1.readString();
        this._gender = param1.readString();
        this._teamId = param1.readInteger();
    }

    public toString(): string {
        return "[Game Player] " + this._SafeStr_5535 + ": " + this._userName;
    }

    public get referenceId(): number {
        return this._SafeStr_5535;
    }

    public get userName(): string {
        return this._userName;
    }

    public get figureString(): string {
        return this._figureString;
    }

    public get gender(): string {
        return this._gender;
    }

    public get teamId(): number {
        return this._teamId;
    }

    public get isDisposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
